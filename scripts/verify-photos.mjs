// Confirms the converted masters are sane: readable, right orientation, and
// carrying no leftover EXIF/GPS.
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";

const SRC = process.argv[2];
const DEST = process.argv[3];

const dest = readdirSync(DEST);
let withMeta = 0;
let tooBig = 0;
let broken = 0;
let portrait = 0;
let landscape = 0;
let bytes = 0;
const orientationMismatch = [];

for (const f of dest) {
  const p = path.join(DEST, f);
  bytes += statSync(p).size;
  try {
    const m = await sharp(p).metadata();
    if (m.exif || m.icc || m.xmp) withMeta++;
    if (Math.max(m.width, m.height) > 2560) tooBig++;
    if (m.height > m.width) portrait++;
    else landscape++;

    // The source's own aspect, read from the original, must survive.
    const stem = path.basename(f, ".webp");
    const orig = readdirSync(SRC).find((o) => path.basename(o, path.extname(o)) === stem);
    if (orig) {
      const om = await sharp(path.join(SRC, orig), { failOn: "none" })
        .metadata()
        .catch(() => null);
      if (om && om.width && om.height) {
        // EXIF orientation 5-8 means the stored pixels are rotated 90°.
        const swapped = (om.orientation ?? 1) >= 5;
        const srcPortrait = swapped ? om.width > om.height : om.height > om.width;
        const outPortrait = m.height > m.width;
        if (srcPortrait !== outPortrait) orientationMismatch.push(f);
      }
    }
  } catch {
    broken++;
  }
}

console.log(`files:            ${dest.length}`);
console.log(`total size:       ${(bytes / 1048576).toFixed(1)} MB  (avg ${(bytes / dest.length / 1024).toFixed(0)} KB)`);
console.log(`unreadable:       ${broken}`);
console.log(`over ${2560}px:      ${tooBig}`);
console.log(`still carry EXIF/ICC/XMP: ${withMeta}`);
console.log(`orientation:      ${portrait} portrait, ${landscape} landscape`);
console.log(
  `orientation mismatch vs source: ${orientationMismatch.length}` +
    (orientationMismatch.length ? "  " + orientationMismatch.slice(0, 5).join(", ") : ""),
);
