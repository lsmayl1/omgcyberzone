// Verifies every locale dictionary has exactly the same key paths as ru.json
// (the source of truth), and that no value is left empty.
// Plural groups are exempt: languages legitimately use different CLDR
// categories (ru has one/few/many, tr only other).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, "..", "i18n", "dictionaries");
const LOCALES = ["ru", "en", "az", "tr"];
const PLURAL_CATEGORIES = new Set([
  "zero",
  "one",
  "two",
  "few",
  "many",
  "other",
]);

const load = (l) => JSON.parse(readFileSync(join(dir, `${l}.json`), "utf8"));

const isPluralGroup = (v) =>
  v &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  Object.keys(v).length > 0 &&
  Object.keys(v).every((k) => PLURAL_CATEGORIES.has(k));

const paths = (obj, prefix = "", out = []) => {
  if (isPluralGroup(obj)) {
    out.push(`${prefix}[plural]`);
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => paths(v, `${prefix}[${i}]`, out));
    return out;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj))
      paths(v, prefix ? `${prefix}.${k}` : k, out);
    return out;
  }
  out.push(prefix);
  return out;
};

const empties = (obj, prefix = "", out = []) => {
  if (typeof obj === "string") {
    if (!obj.trim()) out.push(prefix);
    return out;
  }
  if (obj && typeof obj === "object")
    for (const [k, v] of Object.entries(obj))
      empties(v, prefix ? `${prefix}.${k}` : k, out);
  return out;
};

const base = load("ru");
const basePaths = paths(base).sort();
let failed = false;

for (const locale of LOCALES) {
  const dict = load(locale);
  const own = paths(dict).sort();
  const missing = basePaths.filter((p) => !own.includes(p));
  const extra = own.filter((p) => !basePaths.includes(p));
  // hero.titlePrefix/titleSuffix are intentionally empty in some locales.
  const blank = empties(dict).filter((p) => !p.startsWith("hero.title"));

  if (missing.length || extra.length || blank.length) {
    failed = true;
    console.error(`\n${locale}.json`);
    if (missing.length) console.error(`  missing: ${missing.join(", ")}`);
    if (extra.length) console.error(`  extra:   ${extra.join(", ")}`);
    if (blank.length) console.error(`  empty:   ${blank.join(", ")}`);
  } else {
    console.log(`${locale}.json  ok  (${own.length} keys)`);
  }
}

if (failed) {
  console.error("\ni18n check failed");
  process.exit(1);
}
console.log("\nall dictionaries match ru.json");
