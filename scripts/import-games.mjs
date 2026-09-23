// Turns the club's installed-games export into data/games.ts, with a cover
// for every title.
//
// The CSV is a raw folder listing off a gaming PC, so it carries launchers,
// duplicate installs and folder names rather than titles. EXCLUDE drops what
// is not a game; TITLES renames the rest to what people actually call them,
// and doubles as the de-duplicator — two rows mapping to the same title
// collapse into one.
//
// Covers come from Steam's own CDN at 460x215, which is where the sixteen
// already in public/games came from. Titles Steam does not carry (Riot,
// Blizzard and EA App exclusives) are listed at the end for a manual drop-in.
//
//   node scripts/import-games.mjs          resolve, download, write data/games.ts
//   node scripts/import-games.mjs --dry    resolve and report, write nothing
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const IMAGE_DIR = join(root, "public", "games");
const OUT = join(root, "data", "games.ts");
const dryRun = process.argv.includes("--dry");

/** Launchers, storefronts and platform folders — not games. */
const EXCLUDE = new Set([
  "EA",
  "Electronic Arts",
  "4Game",
  "Innova",
  "BlueStacks X",
  "Wemade",
  "Zenimax Online",
  "ABInfinite",
  "Call of Duty", // the launcher folder; the individual titles are listed too
  "Prime World Nova Playtest",
  "GTA5RP", // a third-party roleplay server for GTA V
]);

/**
 * Folder name -> the title as players know it. Anything not listed here is
 * used as-is. Several rows deliberately share a target: the same game is
 * installed through more than one launcher.
 */
const TITLES = {
  GTAV: "Grand Theft Auto V",
  "Grand Theft Auto V": "Grand Theft Auto V",
  Korabli: "World of Warships",
  Tanki: "World of Tanks",
  World_of_Tanks_EU: "World of Tanks",
  Tanks_Blitz: "World of Tanks Blitz",
  "World of Tanks Blitz": "World of Tanks Blitz",
  LoR: "Legends of Runeterra",
  "dota 2 beta": "Dota 2",
  rocketleague: "Rocket League",
  "left 4 dead": "Left 4 Dead",
  sandstorm: "Insurgency: Sandstorm",
  HellLetLooseG0WU4: "Hell Let Loose",
  TheCallistoProtocol: "The Callisto Protocol",
  KingdomComeDeliverance: "Kingdom Come: Deliverance",
  KingdomComeDeliverance2: "Kingdom Come: Deliverance II",
  MarvelRivals: "Marvel Rivals",
  FarCry5: "Far Cry 5",
  "FC 26": "EA SPORTS FC 26",
  "EA Sports FC 24": "EA SPORTS FC 24",
  "Counter-Strike Global Offensive": "Counter-Strike 2",
  WarThunder: "War Thunder",
  "War Thunder": "War Thunder",
  "Tom Clancy's Rainbow Six Siege RUS": "Tom Clancy's Rainbow Six Siege",
  "Half-Life 2 Complete Edition": "Half-Life 2",
  "Call of Duty - Modern Warfare 3": "Call of Duty: Modern Warfare III",
  "Call of Duty Modern Warfare II": "Call of Duty: Modern Warfare II",
  "Call of Duty WWII": "Call of Duty: WWII",
  "Call of Duty 2": "Call of Duty 2",
  "Call of Duty HQ": "Call of Duty HQ",
  REPO: "R.E.P.O.",
  "S.T.A.L.K.E.R. 2 Heart of Chornobyl": "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
  "Sniper Elite 4": "Sniper Elite 4",
  "The Sims 4": "The Sims 4",
  "The Witcher 3": "The Witcher 3: Wild Hunt",
  "Skyrim Special Edition": "The Elder Scrolls V: Skyrim Special Edition",
  "Need for Speed Heat": "Need for Speed Heat",
  "Hunt Showdown": "Hunt: Showdown 1896",
  "Space Marine 2": "Warhammer 40,000: Space Marine 2",
  "Baldurs Gate 3": "Baldur's Gate 3",
  "Dead by Daylight": "Dead by Daylight",
  "Age of Empires IV": "Age of Empires IV",
  Bloodhunt: "Vampire: The Masquerade - Bloodhunt",
  Deadlock: "Deadlock",
  "Arc Raiders": "ARC Raiders",
  "Battlefield 6": "Battlefield 6",
  "The Finals": "THE FINALS",
  Rematch: "Rematch",
  "Ready Or Not": "Ready or Not",
  "Counter-Strike Source": "Counter-Strike: Source",
  "Counter-Strike 1.6": "Counter-Strike 1.6",
  "Heroes of the Storm": "Heroes of the Storm",
  "StarCraft II": "StarCraft II",
  "WarCraft III": "Warcraft III: Reforged",
  "World of Warcraft": "World of Warcraft",
  "Teamfight Tactics": "Teamfight Tactics",
  "Euro Truck Simulator 2": "Euro Truck Simulator 2",
};

/**
 * The PlayStation shelf. There is no export for it — the consoles are not
 * inventoried the way the PCs are — so it is kept by hand here.
 *
 * Covers still come from Steam where a title has a page there; it is the same
 * key art. Black Ops 4 (Battle.net) and the UFC series (console only) have
 * none, and are reported for a manual drop-in.
 */
const PS_TITLES = [
  "EA SPORTS FC 26",
  "EA SPORTS UFC 6",
  "Call of Duty: Black Ops 4",
  "Call of Duty: Black Ops Cold War",
  "Mortal Kombat 1",
  "Mortal Kombat 11",
  "Need for Speed Unbound",
];

/** A stable file/key name: "Counter-Strike 2" -> "counter-strike-2". */
const slug = (title) =>
  title
    .toLowerCase()
    .replace(/[''`.,:!]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const readCsv = () => {
  const file = readdirSync(join(root, "data")).find((f) => f.endsWith(".csv"));
  if (!file) throw new Error("no CSV in data/");
  const text = readFileSync(join(root, "data", file), "utf8").replace(/^﻿/, "");
  return text
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.split(";")[0]?.trim())
    .filter(Boolean);
};

/**
 * Steam app IDs pinned by hand, for titles its autocomplete will not return —
 * an older entry in a yearly series gets crowded out by the newer ones.
 * Verified against the store before being listed here.
 */
const APPIDS = {
  "EA SPORTS FC 24": 2195250,
};

/** Steam's own autocomplete. Small responses, one per title. */
const resolveOnSteam = async (title) => {
  if (APPIDS[title]) return { appid: APPIDS[title], matched: title };

  const url = `https://steamcommunity.com/actions/SearchApps/${encodeURIComponent(title)}`;
  const response = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (omgcyberzone games sync)" },
  });
  if (!response.ok) return null;
  const results = await response.json();
  if (!Array.isArray(results) || results.length === 0) return null;

  // Exact first. Steam's autocomplete happily returns a DLC or an unrelated
  // title for a near miss, and a wrong cover is worse than none.
  const key = (value) => String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const want = key(title);

  const exact = results.find((r) => key(r.name) === want);
  if (exact) return { appid: exact.appid, matched: exact.name };

  // Then a suffix-tolerant match, for the trademark and edition wording
  // Steam adds: "Rocket League®", "Grand Theft Auto V Enhanced", "The Witcher
  // 3: Wild Hunt - Complete Edition".
  //
  // Only in this direction, and only where the extra text starts on a word
  // boundary. Matching the other way round — our title being longer than
  // Steam's — turned "Call of Duty 2" into "Call of Duty®", and without the
  // boundary check "StarCraft" matched "Star Crafter".
  const lower = title.toLowerCase();
  const near = results.find((r) => {
    const name = String(r.name ?? "").toLowerCase();
    if (!name.startsWith(lower)) return false;
    const rest = name.slice(lower.length);
    return rest === "" || /^[^a-z0-9]/.test(rest);
  });
  return near ? { appid: near.appid, matched: near.name } : null;
};

const key0 = (value) => String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Newer apps keep their art under a hashed path, so the predictable
 * /steam/apps/<id>/header.jpg 404s for them — EA SPORTS FC 26 among others.
 * The store API hands back the real URL, so ask it first and only fall back
 * to the old layout if that fails.
 */
const coverUrl = async (appid) => {
  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&filters=basic`,
    );
    if (response.ok) {
      const body = await response.json();
      const header = body?.[appid]?.data?.header_image;
      if (header) return header;
    }
  } catch {
    // fall through to the legacy path
  }
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;
};

const fetchCover = async (appid) => {
  const response = await fetch(await coverUrl(appid));
  if (!response.ok) throw new Error(`cover HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
};

const main = async () => {
  const rows = readCsv();

  // Ordered de-duplication: first row wins, later duplicates collapse into it.
  const titles = [];
  for (const row of rows) {
    if (EXCLUDE.has(row)) continue;
    const title = TITLES[row] ?? row;
    if (!titles.includes(title)) titles.push(title);
  }
  titles.sort((a, b) => a.localeCompare(b));

  console.log(`${rows.length} rows -> ${titles.length} distinct games`);

  // A cover already in public/games counts as resolved, whatever its source.
  const onDisk = new Map(
    readdirSync(IMAGE_DIR).map((f) => [f.replace(/\.[^.]+$/, "").toLowerCase(), f]),
  );

  if (!dryRun) await mkdir(IMAGE_DIR, { recursive: true });

  const games = [];
  const psGames = [];
  const noCover = [];
  const inexact = [];
  let fetched = 0;
  let reused = 0;

  // One pass over both shelves so the PlayStation titles get the same cover
  // lookup as the PCs. Each entry carries its own shelf rather than deciding
  // by membership: EA SPORTS FC 26 is on both, and testing PS_TITLES would
  // have sent the PC copy to the console list too.
  const queue = [
    ...titles.map((title) => ({ title, shelf: games })),
    ...PS_TITLES.map((title) => ({ title, shelf: psGames })),
  ];

  for (const { title, shelf } of queue) {
    const name = slug(title);
    const target = join(IMAGE_DIR, `${name}.webp`);

    if (existsSync(target)) {
      shelf.push({ name, title, img: `/games/${name}.webp` });
      reused++;
      continue;
    }
    if (onDisk.has(name)) {
      shelf.push({ name, title, img: `/games/${onDisk.get(name)}` });
      reused++;
      continue;
    }
    try {
      const hit = await resolveOnSteam(title);
      if (!hit) {
        noCover.push(title);
        shelf.push({ name, title, img: null });
        continue;
      }
      // Printed so a loose match can be eyeballed rather than trusted blind.
      if (key0(hit.matched) !== key0(title))
        inexact.push(`${title}  ->  ${hit.matched}`);
      const jpg = await fetchCover(hit.appid);
      if (!dryRun) {
        const webp = await sharp(jpg).webp({ quality: 82, effort: 5 }).toBuffer();
        writeFileSync(target, webp);
      }
      shelf.push({ name, title, img: `/games/${name}.webp` });
      fetched++;
    } catch {
      noCover.push(title);
      shelf.push({ name, title, img: null });
    }
  }

  console.log(`covers: ${fetched} fetched from Steam, ${reused} already present`);
  console.log(
    `PC: ${games.length} games, ${games.filter((g) => g.img).length} with a cover`,
  );
  console.log(
    `PlayStation: ${psGames.length} games, ${psGames.filter((g) => g.img).length} with a cover`,
  );

  if (inexact.length) {
    console.log(
      `\nMATCHED LOOSELY (${inexact.length}) — check these are the right games:`,
    );
    inexact.forEach((x) => console.log(`  ${x}`));
  }

  if (noCover.length) {
    console.log(`\nNO COVER (${noCover.length}) — not on Steam, drop a file in public/games:`);
    noCover.forEach((t) => console.log(`  ${slug(t)}.webp   ${t}`));
  }

  const render = (list) =>
    list
      .map(
        (g) =>
          `  { name: ${JSON.stringify(g.name)}, title: ${JSON.stringify(g.title)}, img: ${JSON.stringify(g.img)} },`,
      )
      .join("\n");
  const body = render(games);

  const file = `export type Game = { name: string; title: string; img: string | null };

/**
 * The club's PC library, generated by scripts/import-games.mjs from the
 * installed-games export in data/. Titles are proper nouns and are not
 * translated. Covers are Steam header art at 460x215.
 */
export const PC_GAMES: Game[] = [
${body}
];

/** The PlayStation shelf, kept by hand in scripts/import-games.mjs. */
export const PS_GAMES: Game[] = [
${render(psGames)}
];
`;

  if (dryRun) {
    console.log("\n[dry run] nothing written");
    return;
  }
  writeFileSync(OUT, file, "utf8");
  console.log(`\nwrote ${OUT}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
