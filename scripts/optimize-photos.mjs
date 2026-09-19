/**
 * Turns a drop of camera originals (HEIC / large JPEG) into web masters.
 *
 *   node scripts/optimize-photos.mjs <source-dir> [dest-dir]
 *
 * Output is WebP at MAX_EDGE on the longest side. It is deliberately a
 * *master*, not a final asset: next/image re-encodes these per request into
 * AVIF or WebP at the exact width each layout asks for, so the job here is
 * only to get the source down to sane dimensions and strip what should not
 * ship.
 *
 * Why WebP and not AVIF for the master: next/image emits AVIF to browsers
 * that accept it either way, and AVIF-encoding 30MP originals is an order of
 * magnitude slower for no gain once Next re-encodes anyway.
 *
 * Three things happen on the way through:
 *  - EXIF orientation is baked in, so portrait phone shots do not come out
 *    sideways once metadata is dropped.
 *  - metadata is dropped (sharp's default), which removes the GPS tags the
 *    camera wrote. Those should not be on a public web server.
 *  - withoutEnlargement means a small original is never upscaled.
 *
 * HEIC does not go through sharp. The libheif bundled with sharp here fails
 * on these iPhone files with "bad seek to <n>", where n is consistently 32
 * bytes past EOF — it reads a box header describing data the file does not
 * contain. heic-convert ships its own libheif built to WASM and decodes them
 * without complaint, so HEIC is decoded there first and handed to sharp as
 * JPEG for the resize and encode. Slower, but it works on every file.
 */
import sharp from "sharp";
import heicConvert from "heic-convert";
import { readdirSync, mkdirSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const SRC = process.argv[2];
const DEST = process.argv[3] ?? "photos-master";
const MAX_EDGE = 2560;
const QUALITY = 82;

if (!SRC) {
  console.error("usage: node scripts/optimize-photos.mjs <source-dir> [dest-dir]");
  process.exit(1);
}

const HEIC_EXT = new Set([".heic", ".heif"]);
const DIRECT_EXT = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"]);

mkdirSync(DEST, { recursive: true });

const files = readdirSync(SRC).filter((f) => {
  const e = path.extname(f).toLowerCase();
  return HEIC_EXT.has(e) || DIRECT_EXT.has(e);
});
if (files.length === 0) {
  console.log("nothing to convert");
  process.exit(0);
}

let inBytes = 0;
let outBytes = 0;
const failures = [];

async function convert(file) {
  const src = path.join(SRC, file);
  const ext = path.extname(file).toLowerCase();
  const out = path.join(DEST, path.basename(file, path.extname(file)) + ".webp");

  try {
    const before = statSync(src).size;

    // HEIC is decoded to a JPEG buffer first; everything else goes straight in.
    let input = src;
    if (HEIC_EXT.has(ext)) {
      input = await heicConvert({
        buffer: await readFile(src),
        format: "JPEG",
        quality: 1, // lossless-ish handoff; the real quality step is the WebP below
      });
    }

    const info = await sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);

    inBytes += before;
    outBytes += info.size;
    process.stdout.write(
      `  ${file.padEnd(18)} ${(before / 1048576).toFixed(1).padStart(5)} MB -> ` +
        `${(info.size / 1024).toFixed(0).padStart(4)} KB  ${info.width}x${info.height}\n`,
    );
  } catch (e) {
    failures.push(`${file}: ${String(e.message).split("\n")[0]}`);
  }
}

console.log(`converting ${files.length} file(s) from ${SRC} -> ${DEST}\n`);
// Serial on purpose: a 30MP decode holds a large raw buffer, and the WASM
// HEIC decoder is not worth running concurrently on a memory-tight machine.
for (const f of files) await convert(f);

console.log(
  `\n${files.length - failures.length}/${files.length} converted  ` +
    `${(inBytes / 1048576).toFixed(0)} MB -> ${(outBytes / 1048576).toFixed(1)} MB ` +
    `(${(100 - (outBytes / inBytes) * 100).toFixed(1)}% smaller)`,
);
if (failures.length) {
  console.error("\nfailed:");
  failures.forEach((f) => console.error("  " + f));
  process.exit(1);
}
