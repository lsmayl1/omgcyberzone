import Image from "next/image";
import React from "react";
import reviewsData from "@/data/reviews.json";
import { plural } from "@/i18n/format";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type Review = {
  text: string;
  rating: number | null;
  relative: string | null;
  author: { name: string; avatar: string | null; url: string | null };
};

const data = reviewsData as {
  rating: number | null;
  total: number;
  mapsUrl: string | null;
  reviews: Review[];
};

/** Long reviews are clamped; this is roughly where the clamp bites. */
const Stars = ({ rating }: { rating: number }) => (
  <span className="flex gap-0.5" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((n) => (
      <svg
        key={n}
        viewBox="0 0 20 20"
        className={`size-4 ${n <= Math.round(rating) ? "text-[#FF9E0B]" : "text-white/15"}`}
        fill="currentColor"
      >
        <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
      </svg>
    ))}
  </span>
);

/**
 * Google reviews, fetched at build time by scripts/import-reviews.mjs.
 *
 * A server component with no client JS: the reviews are static HTML from our
 * own origin, which is the whole reason for not using a review widget.
 *
 * Renders nothing until the importer has run — an empty section with a
 * heading and no reviews is worse than no section at all.
 */
export const Reviews = ({ t, locale }: { t: Dictionary; locale: Locale }) => {
  if (data.reviews.length === 0) return null;

  return (
    <section
      id="reviews"
      className="container-custom flex scroll-mt-20 flex-col gap-6 border-b border-white/10 py-12 sm:gap-8 sm:py-16 md:scroll-mt-28"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="border-l-4 border-mainRed pl-4 text-xl font-bold uppercase text-white sm:text-4xl">
            {t.reviews.heading}
          </h2>
          <p className="pl-4 text-sm text-gray-400 sm:text-base">
            {t.reviews.lead}
          </p>
        </div>

        {data.rating !== null && (
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-boxColor px-4 py-3">
            <span className="text-3xl font-bold tabular-nums text-white">
              {data.rating.toFixed(1)}
            </span>
            <span className="flex flex-col gap-1">
              <Stars rating={data.rating} />
              <span className="text-xs text-gray-400">
                {plural(locale, t.reviews.count, data.total)}
              </span>
            </span>
          </div>
        )}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.reviews.map((review, i) => (
          <li
            key={i}
            className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-boxColor p-5"
          >
            <div className="flex items-center gap-3">
              {/* Google's terms require the reviewer's name and photo to be
                  shown with the review, and a link back to their profile. */}
              {review.author.avatar ? (
                <Image
                  src={review.author.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold text-gray-400"
                >
                  {review.author.name.slice(0, 1)}
                </span>
              )}
              <span className="flex min-w-0 flex-col">
                {review.author.url ? (
                  <a
                    href={review.author.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="truncate text-sm font-semibold text-white hover:text-mainRed"
                  >
                    {review.author.name}
                  </a>
                ) : (
                  <span className="truncate text-sm font-semibold text-white">
                    {review.author.name}
                  </span>
                )}
                {review.relative && (
                  <span className="text-xs text-gray-500">
                    {review.relative}
                  </span>
                )}
              </span>
            </div>

            {review.rating !== null && <Stars rating={review.rating} />}

            <p className="line-clamp-6 text-sm leading-relaxed text-gray-300">
              {review.text}
            </p>
          </li>
        ))}
      </ul>

      {data.mapsUrl && (
        <a
          href={data.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 self-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-mainRed hover:bg-mainRed"
        >
          {t.reviews.readAll}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H8m9 0v9"
            />
          </svg>
        </a>
      )}
    </section>
  );
};
