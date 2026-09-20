/**
 * Rebuilds data/menu-items.json and public/menu-food/ from the venue's live
 * Wolt assortment.
 *
 *   node scripts/scrape-wolt-menu.mjs [--no-images] [--dry-run]
 *
 * Wolt is the source of truth for prices, sizes, photos and the Azerbaijani
 * copy the venue wrote itself. Turkish, the badges and the EN/RU corrections
 * come from scripts/wolt-menu.config.mjs — see the notes there.
 *
 * The assortment endpoint answers per language, so the script pulls az, en and
 * ru and joins them on the item id; the ids are stable within a fetch, which
 * is all the join needs. Site ids are positions in menu order instead, because
 * Wolt's hex ids change whenever the venue re-uploads an item and the JSON is
 * meant to read as a diff.
 *
 * Images are 960x640 JPEGs on Wolt's proxy. They go out as WebP at IMAGE_WIDTH
 * for the same reason the photo pipeline does it: next/image re-encodes per
 * request anyway, so the job here is to land a sane master.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { VENUE_SLUG, CATEGORY_BY_SLUG, ITEMS } from "./wolt-menu.config.mjs";

const API = "https://consumer-api.wolt.com/consumer-api/consumer-assortment/v1/venues/slug";
const LANGUAGES = ["az", "en", "ru"]; // tr is not published by the venue
const IMAGE_DIR = "public/menu-food";
const IMAGE_WIDTH = 720;
const IMAGE_QUALITY = 80;
const OUT = "data/menu-items.json";
const CURRENCY = "₼";

const noImages = process.argv.includes("--no-images");
const dryRun = process.argv.includes("--dry-run");

const collapse = (s) => (s ?? "").replace(/\s+/g, " ").trim();
const price = (minor) => `${(minor / 100).toFixed(2)} ${CURRENCY}`;

async function getJson(url) {
  const res = await fetch(url, { headers: { "user-agent": "omgcyberzone-menu-scraper" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

/**
 * Wolt models sizes as a "choice" option whose values carry a price delta on
 * top of the item price: pizzas get 25/30/35 cm, snacks get a piece count and
 * coffee gets a plain small/large pair. Everything else on an item (dough,
 * extras) is a modifier, not a size, so only these two groups are read.
 */
function sizesFrom(item, optionsById) {
  const group = item.options
    .map((o) => optionsById[o.option_id])
    .find((o) => o && /^(Ölçü Seçimi|Say Seçimi)$/.test(o.name));

  if (!group) return null;

  return group.values.map((value) => {
    const base = { price: price(item.price + value.price) };
    const cm = value.name.match(/(\d+)\s*sm/i);
    if (cm) return { amount: Number(cm[1]), unit: "cm", ...base };
    const pcs = value.name.match(/(\d+)\s*[əe]d[əe]d/i);
    if (pcs) return { amount: Number(pcs[1]), unit: "pcs", ...base };
    if (/^orta$/i.test(value.name)) return { label: "medium", ...base };
    if (/^böyük$/i.test(value.name)) return { label: "large", ...base };
    throw new Error(`unmapped size "${value.name}" on "${item.name}"`);
  });
}

/** Bottled drinks carry their volume in the name: "Fanta® 500 ml". */
const volumeFrom = (name) => {
  const ml = name.match(/(\d+)\s*ml\b/i);
  return ml ? { amount: Number(ml[1]), unit: "ml" } : null;
};

async function saveImage(url, slug) {
  const res = await fetch(`${url}?w=960`, {
    headers: { "user-agent": "omgcyberzone-menu-scraper" },
  });
  if (!res.ok) throw new Error(`${res.status} for image ${url}`);
  const out = path.join(IMAGE_DIR, `${slug}.webp`);
  const info = await sharp(Buffer.from(await res.arrayBuffer()))
    .resize({ width: IMAGE_WIDTH, withoutEnlargement: true })
    .webp({ quality: IMAGE_QUALITY, effort: 5 })
    .toFile(out);
  return info.size;
}

const [az, en, ru] = await Promise.all(
  LANGUAGES.map((l) => getJson(`${API}/${VENUE_SLUG}/assortment?language=${l}`)),
);
console.log(`fetched ${az.items.length} items in ${LANGUAGES.join(", ")}`);

const byId = {
  az: Object.fromEntries(az.items.map((i) => [i.id, i])),
  en: Object.fromEntries(en.items.map((i) => [i.id, i])),
  ru: Object.fromEntries(ru.items.map((i) => [i.id, i])),
};
const optionsById = Object.fromEntries(az.options.map((o) => [o.id, o]));

const unknownCategories = [];
const missing = [];
const used = new Set();
const items = [];
let imageBytes = 0;

if (!dryRun && !noImages) await mkdir(IMAGE_DIR, { recursive: true });

// Category slugs are localised ("pizzals-2" vs "pizzalar-2"), so the walk goes
// over the English ones to match CATEGORY_BY_SLUG; only slug and item_ids are
// read from it, the copy still comes from the AZ payload.
for (const category of en.categories) {
  const key = CATEGORY_BY_SLUG[category.slug];
  if (!key) {
    unknownCategories.push(`${category.name} (${category.slug})`);
    continue;
  }

  for (const id of category.item_ids) {
    const source = byId.az[id];
    const woltName = collapse(source.name);
    const override = ITEMS[woltName];
    if (!override) {
      missing.push(`${category.name}: "${woltName}"`);
      continue;
    }
    used.add(woltName);

    const name = {};
    const description = {};
    for (const locale of ["az", "en", "ru"]) {
      name[locale] = override.name?.[locale] ?? collapse(byId[locale][id].name);
      description[locale] =
        override.description?.[locale] ?? collapse(byId[locale][id].description);
    }
    name.tr = override.name.tr;
    description.tr = override.description.tr;

    const volume = volumeFrom(woltName);
    const sizes = sizesFrom(source, optionsById) ??
      (volume ? [{ ...volume, price: price(source.price) }] : [{ price: price(source.price) }]);

    const image = `/menu-food/${override.slug}.webp`;
    if (!dryRun && !noImages) {
      if (!source.images[0]) throw new Error(`no image for "${woltName}"`);
      imageBytes += await saveImage(source.images[0].url, override.slug);
      process.stdout.write(`  ${override.slug}\n`);
    }

    items.push({
      id: items.length + 1,
      category: key,
      image,
      ...(override.popular ? { isPopular: true } : {}),
      ...(override.spicy ? { isSpicy: true } : {}),
      selectedSizeIndex: 0,
      name: { ru: name.ru, en: name.en, az: name.az, tr: name.tr },
      description: { ru: description.ru, en: description.en, az: description.az, tr: description.tr },
      sizes,
    });
  }
}

const stale = Object.keys(ITEMS).filter((k) => !used.has(k));

if (!dryRun) {
  await writeFile(OUT, JSON.stringify(items, null, 2) + "\n", "utf8");
}

const perCategory = items.reduce((acc, i) => ({ ...acc, [i.category]: (acc[i.category] ?? 0) + 1 }), {});
console.log(`\n${items.length} items -> ${dryRun ? "(dry run)" : OUT}`);
console.log(
  Object.entries(perCategory)
    .map(([k, n]) => `  ${k}: ${n}`)
    .join("\n"),
);
if (!dryRun && !noImages) {
  console.log(`${items.length} images -> ${IMAGE_DIR} (${(imageBytes / 1048576).toFixed(1)} MB)`);
}

if (unknownCategories.length) {
  console.warn("\nunmapped Wolt categories (add them to CATEGORY_BY_SLUG):");
  unknownCategories.forEach((c) => console.warn("  " + c));
}
if (stale.length) {
  console.warn("\nconfig entries the venue no longer lists (renamed or removed?):");
  stale.forEach((k) => console.warn("  " + k));
}
if (missing.length) {
  console.error("\nnew Wolt items with no config entry — add them, then re-run:");
  missing.forEach((m) => console.error("  " + m));
  process.exit(1);
}
