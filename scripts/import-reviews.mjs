// Pulls the club's Google reviews into data/reviews.json and their avatars
// into public/reviews.
//
// Why a build-time script rather than a widget: this site loads no
// third-party JavaScript on purpose (see the CSP notes in next.config.ts),
// and every page is prerendered. Fetching here keeps both — the reviews ship
// as static HTML from our own origin, and script-src/connect-src/img-src stay
// exactly as tight as they are.
//
// Avatars are downloaded rather than hot-linked for the same reason:
// img-src is 'self' data:, and next/image refuses remote URLs
// (images.remotePatterns is deliberately empty).
//
// CACHING: Google Maps Platform terms allow caching Places content for at
// most 30 days (place IDs are exempt). data/reviews.json records fetchedAt,
// and this script warns when the file is older than that. Re-run it on each
// deploy; do not let a committed copy go stale.
//
// The Places API returns at most five reviews and cannot be paged.
//
//   node --env-file=.env.local scripts/import-reviews.mjs
//   node --env-file=.env.local scripts/import-reviews.mjs --dry
//
// Environment:
//   GOOGLE_MAPS_API_KEY   required — Places API (New) enabled, billing on
//   GOOGLE_PLACE_ID       optional — skips the lookup if you already have it
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const OUT = join(root, "data", "reviews.json");
const IMAGE_DIR = join(root, "public", "reviews");
const PUBLIC_PREFIX = "/reviews/";

const dryRun = process.argv.includes("--dry");
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/** Must match the footer's map query so both point at the same listing. */
const BUSINESS = "OMG Cyber Zone, Azadlıq prospekti 103E, Baku";

const AVATAR_PX = 128;
const MAX_CACHE_DAYS = 30;

const findPlaceId = async () => {
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
      },
      body: JSON.stringify({ textQuery: BUSINESS }),
    },
  );
  if (!response.ok)
    throw new Error(`place lookup HTTP ${response.status}: ${await response.text()}`);

  const { places } = await response.json();
  if (!places?.length) throw new Error(`no place found for "${BUSINESS}"`);

  const place = places[0];
  console.log(
    `matched: ${place.displayName?.text} — ${place.formattedAddress} (${place.id})`,
  );
  return place.id;
};

const fetchPlace = async (placeId) => {
  const fields = [
    "id",
    "displayName",
    "rating",
    "userRatingCount",
    "googleMapsUri",
    "reviews",
  ].join(",");

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: { "X-Goog-Api-Key": API_KEY, "X-Goog-FieldMask": fields },
    },
  );
  if (!response.ok)
    throw new Error(`details HTTP ${response.status}: ${await response.text()}`);
  return response.json();
};

/**
 * Google's attribution rules require the reviewer's name and photo to be
 * shown with their review, so the avatar is part of the payload, not a nicety.
 */
const saveAvatar = async (url, name) => {
  const target = join(IMAGE_DIR, `${name}.webp`);
  if (existsSync(target)) return PUBLIC_PREFIX + `${name}.webp`;

  const response = await fetch(url);
  if (!response.ok) return null;

  const webp = await sharp(Buffer.from(await response.arrayBuffer()))
    .resize(AVATAR_PX, AVATAR_PX, { fit: "cover" })
    .webp({ quality: 82, effort: 5 })
    .toBuffer();

  if (!dryRun) writeFileSync(target, webp);
  return PUBLIC_PREFIX + `${name}.webp`;
};

const warnIfStale = () => {
  if (!existsSync(OUT)) return;
  try {
    const { fetchedAt } = JSON.parse(readFileSync(OUT, "utf8"));
    if (!fetchedAt) return;
    const days = (Date.now() - Date.parse(fetchedAt)) / 86_400_000;
    if (days > MAX_CACHE_DAYS)
      console.warn(
        `existing data/reviews.json is ${Math.floor(days)} days old — over Google's ${MAX_CACHE_DAYS}-day caching limit`,
      );
  } catch {
    // an unreadable cache is not a reason to refuse to refresh it
  }
};

const main = async () => {
  if (!API_KEY) {
    console.error(
      "GOOGLE_MAPS_API_KEY is not set.\n" +
        "Create a Google Maps Platform key with the Places API (New) enabled\n" +
        "and billing on, put it in .env.local, then run:\n" +
        "  node --env-file=.env.local scripts/import-reviews.mjs",
    );
    process.exit(1);
  }

  warnIfStale();

  const placeId = process.env.GOOGLE_PLACE_ID || (await findPlaceId());
  const place = await fetchPlace(placeId);

  if (!dryRun) await mkdir(IMAGE_DIR, { recursive: true });

  const reviews = [];
  for (const [index, review] of (place.reviews ?? []).entries()) {
    const author = review.authorAttribution ?? {};
    const name = `author-${index + 1}`;
    const avatar = author.photoUri
      ? await saveAvatar(author.photoUri, name)
      : null;

    reviews.push({
      // originalText is what the reviewer actually wrote; text may be a
      // machine translation into the request language.
      text: (review.originalText?.text ?? review.text?.text ?? "").trim(),
      language: review.originalText?.languageCode ?? review.text?.languageCode ?? null,
      rating: review.rating ?? null,
      publishedAt: review.publishTime ?? null,
      relative: review.relativePublishTimeDescription ?? null,
      author: {
        name: author.displayName ?? "",
        avatar,
        // Required attribution: the reviewer's Google profile.
        url: author.uri ?? null,
      },
    });
  }

  const payload = {
    placeId,
    name: place.displayName?.text ?? null,
    rating: place.rating ?? null,
    total: place.userRatingCount ?? 0,
    mapsUrl: place.googleMapsUri ?? null,
    fetchedAt: new Date().toISOString(),
    reviews,
  };

  console.log(
    `rating ${payload.rating} from ${payload.total} ratings, ${reviews.length} reviews`,
  );

  if (dryRun) {
    console.log("[dry run] nothing written");
    return;
  }
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`wrote ${OUT}`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
