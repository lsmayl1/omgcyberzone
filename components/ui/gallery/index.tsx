"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";
import { GALLERY_TILES } from "@/data/rooms";
import type { Dictionary } from "@/i18n/types";

const getTileLayout = (index: number) => {
  if (index === 0) return "col-span-7 row-span-2 max-md:col-span-2";
  if (index === 1 || index === 2)
    return "col-span-5 row-span-1 max-md:col-span-2";
  return "col-span-4 row-span-1 max-md:col-span-2";
};

/**
 * Must track getTileLayout. The tiles are 7, 5 and 4 columns of twelve, so a
 * single `sizes` for all of them left the biggest tile asking for about a
 * third of the pixels it actually renders at, which is what made it look
 * soft. Below md every tile spans the full width of a two-column grid.
 */
const getTileSizes = (index: number) => {
  if (index === 0) return "(max-width: 767px) 100vw, 58vw";
  if (index === 1 || index === 2) return "(max-width: 767px) 100vw, 42vw";
  return "(max-width: 767px) 100vw, 34vw";
};

export const Gallery = ({ t }: { t: Dictionary }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedTile, setSelectedTile] = useState<
    (typeof GALLERY_TILES)[number] | null
  >(null);
  const galleryTiles = GALLERY_TILES.slice(0, 20);
  const visibleTiles = showAll ? galleryTiles : galleryTiles.slice(0, 6);

  return (
    <div
      id="gallery"
      className="py-16 scroll-mt-28 max-md:scroll-mt-20 flex flex-col gap-8 container-custom border-b border-white/10"
    >
      <h2 className="text-white text-4xl font-bold max-md:text-xl mb-4 max-md:mb-2 uppercase border-l-4 border-mainRed pl-4  ">
        {t.gallery.heading}
      </h2>
      <div className="max-w-full">
        <div className="grid grid-flow-dense grid-cols-12 max-md:grid-cols-2 gap-3 auto-rows-[220px] max-md:auto-rows-[180px]">
          {visibleTiles.map((tile, index) => (
            <button
              type="button"
              key={tile.key}
              onClick={() => setSelectedTile(tile)}
              className={`relative h-full min-h-0 overflow-hidden rounded-2xl bg-black/30 text-left ${getTileLayout(index)}`}
              aria-label={
                t.gallery.alts[tile.key as keyof typeof t.gallery.alts]
              }
            >
              <Image
                src={tile.src}
                alt={t.gallery.alts[tile.key as keyof typeof t.gallery.alts]}
                fill
                sizes={getTileSizes(index)}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-120"
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowAll((isShowingAll) => !isShowingAll)}
          className="mt-6 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-mainRed hover:bg-mainRed"
        >
          {showAll ? t.gallery.showLess : t.gallery.showAll}
        </button>
      </div>
      {selectedTile && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            t.gallery.alts[selectedTile.key as keyof typeof t.gallery.alts]
          }
          onClick={() => setSelectedTile(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setSelectedTile(null);
          }}
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          <div
            className="relative h-[90vh] w-[min(1100px,92vw)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedTile.src}
              alt={
                t.gallery.alts[selectedTile.key as keyof typeof t.gallery.alts]
              }
              fill
              // The box is min(1100px, 92vw) — declaring a flat 92vw asked
              // for the wrong width on any screen wider than ~1196px.
              sizes="(max-width: 1196px) 92vw, 1100px"
              quality={90}
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => setSelectedTile(null)}
              aria-label="Close image"
              className="absolute right-2 top-2 z-10 rounded-full bg-black/70 px-3 py-1 text-2xl leading-none text-white hover:bg-mainRed"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
