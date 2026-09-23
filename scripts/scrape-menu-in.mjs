// Dumps the live menu from menu-in.com/omg into the project: every category,
// item, description, price and variant, plus the images.
//
// The page is server-rendered and every item carries its own data-* attributes
// (data-name, data-desc, data-price, data-image, data-options-b64), so this
// reads those rather than scraping the visible text.
//
//   node scripts/scrape-menu-in.mjs          write data/menu-in.json + images
//   node scripts/scrape-menu-in.mjs --dry    parse and report, write nothing
//
// Output:
//   data/menu-in.json      the whole menu as structured data
//   public/menu-in/*       the item images, named after their source file
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE = "https://menu-in.com/omg";
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const IMAGE_DIR = join(root, "public", "menu-in");
const OUT_FILE = join(root, "data", "menu-in.json");
const PUBLIC_PREFIX = "/menu-in/";

// Everything under public/ is committed and deployed, and git keeps every
// blob forever, so the source PNGs (16 MB across 59 files) are never written
// to disk as-is — they are re-encoded to WebP on the way in, the same rule
// scripts/optimize-photos.mjs applies to the club's own photography. These
// render at 460px at the very most, so 1280 is already generous.
const MAX_EDGE = 1280;
const QUALITY = 82;

/** Source name minus its extension, so re-runs land on the same file. */
const webpName = (url) =>
  url.split("/").pop().replace(/\.[^.]+$/, "") + ".webp";

const dryRun = process.argv.includes("--dry");

/**
 * The handful of entities this page actually emits, plus numeric escapes.
 *
 * Applied until the string stops changing: some attributes are escaped twice
 * ("M&amp;amp;M&amp;#039;s"), so a single pass leaves entities in the output.
 */
const decodeOnce = (value) =>
  String(value ?? "")
    .replace(/&amp;quot;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&");

const decode = (value) => {
  let current = String(value ?? "");
  for (let pass = 0; pass < 3; pass++) {
    const next = decodeOnce(current);
    if (next === current) break;
    current = next;
  }
  return current.trim();
};

const attr = (tag, name) => {
  // Attribute values here are single- or double-quoted; both appear.
  const match =
    tag.match(new RegExp(`${name}="([^"]*)"`)) ??
    tag.match(new RegExp(`${name}='([^']*)'`));
  return match ? decode(match[1]) : "";
};

/**
 * data-options-b64 is base64 JSON holding the variant price lines — the
 * "25 / 30 / 35" columns a pizza is sold in. data-price has the same numbers
 * as display text, but this gives them separately and with their labels.
 */
const variantsFrom = (tag) => {
  const raw = attr(tag, "data-options-b64");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
    return (parsed.variant_price_lines ?? []).map((line) => ({
      label: line.label,
      price: line.price,
    }));
  } catch {
    return []; // a malformed blob must not lose us the rest of the item
  }
};

const fetchText = async (url) => {
  const response = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (omgcyberzone menu sync)" },
  });
  if (!response.ok) throw new Error(`${url} -> HTTP ${response.status}`);
  return response.text();
};

const parse = (html) => {
  const categories = [];
  // Split rather than regex the whole document: the sections are siblings and
  // a lazy match across them would merge neighbouring categories.
  const blocks = html.split('<section class="menu-category-section"').slice(1);

  for (const block of blocks) {
    const id = (block.match(/data-category-id="([^"]*)"/) ?? [])[1] ?? "";
    const title = decode(
      (block.match(
        /<h2 class="menu-category-main-title">([\s\S]*?)<\/h2>/,
      ) ?? [])[1] ?? "",
    );

    const items = [];
    for (const tag of block.match(/<article[\s\S]*?>/g) ?? []) {
      if (!tag.includes("menu-item-row")) continue;
      const name = attr(tag, "data-name");
      if (!name) continue;

      let images = [];
      try {
        images = JSON.parse(attr(tag, "data-images") || "[]");
      } catch {
        images = [];
      }
      const primary = attr(tag, "data-image");
      if (primary && !images.includes(primary)) images.unshift(primary);

      items.push({
        sourceId: attr(tag, "data-menu-id"),
        name,
        description: attr(tag, "data-desc"),
        priceText: attr(tag, "data-price"),
        basePrice: Number(attr(tag, "data-base-price")) || null,
        currency: attr(tag, "data-currency") || "AZN",
        variants: variantsFrom(tag),
        images,
      });
    }

    if (items.length > 0) categories.push({ sourceId: id, title, items });
  }

  return categories;
};

const download = async (url, target) => {
  const response = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (omgcyberzone menu sync)" },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());

  const webp = await sharp(source)
    .rotate() // bake in EXIF orientation before metadata is dropped
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer();

  await writeFile(target, webp);
  return { before: source.length, after: webp.length };
};

const main = async () => {
  console.log(`fetching ${SOURCE}`);
  const categories = parse(await fetchText(SOURCE));

  const itemCount = categories.reduce((n, c) => n + c.items.length, 0);
  console.log(`parsed ${categories.length} categories, ${itemCount} items`);
  if (itemCount === 0) throw new Error("no items parsed — page markup changed");

  // One entry per distinct remote file; several items can share an image.
  const remote = [...new Set(categories.flatMap((c) => c.items.flatMap((i) => i.images)))];
  const localFor = new Map(
    remote.map((url) => [url, PUBLIC_PREFIX + webpName(url)]),
  );

  for (const category of categories) {
    for (const item of category.items) {
      item.localImages = item.images.map((url) => localFor.get(url));
    }
  }

  const dump = {
    source: SOURCE,
    fetchedAt: new Date().toISOString().slice(0, 10),
    categoryCount: categories.length,
    itemCount,
    categories,
  };

  if (dryRun) {
    console.log(`[dry run] would write ${OUT_FILE}`);
    console.log(`[dry run] would download ${remote.length} images`);
    for (const category of categories)
      console.log(`  ${category.title} — ${category.items.length}`);
    return;
  }

  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(dump, null, 2) + "\n", "utf8");
  console.log(`wrote ${OUT_FILE}`);

  await mkdir(IMAGE_DIR, { recursive: true });
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  let bytes = 0;

  let sourceBytes = 0;
  for (const url of remote) {
    const file = webpName(url);
    const target = join(IMAGE_DIR, file);
    if (existsSync(target)) {
      skipped++;
      continue;
    }
    try {
      const { before, after } = await download(url, target);
      sourceBytes += before;
      bytes += after;
      downloaded++;
    } catch (error) {
      failed++;
      console.warn(`  failed ${file}: ${error.message}`);
    }
  }

  const mb = (n) => (n / 1024 / 1024).toFixed(1);
  console.log(
    `images: ${downloaded} downloaded, ${skipped} already present, ${failed} failed`,
  );
  if (downloaded > 0)
    console.log(`        ${mb(sourceBytes)} MB source -> ${mb(bytes)} MB WebP`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
