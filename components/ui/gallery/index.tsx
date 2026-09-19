import Image from "next/image";
import React from "react";
import { GALLERY_TILES } from "@/data/rooms";
import type { Dictionary } from "@/i18n/types";

export const Gallery = ({ t }: { t: Dictionary }) => {
  return (
    <div
      id="gallery"
      className="py-16 scroll-mt-28 max-md:scroll-mt-20 flex flex-col gap-8 container-custom border-b border-white/10"
    >
      <h2 className="text-white text-4xl font-bold max-md:text-xl mb-4 max-md:mb-2 uppercase border-l-4 border-mainRed pl-4  ">
        {t.gallery.heading}
      </h2>
      <div className="max-w-full">
        {/* grid-flow-dense: the tiles mix 1x1, 2x1, 1x2 and 2x2 spans, and
            without dense packing the portrait tiles leave gaps behind them. */}
        <div className="grid grid-flow-dense grid-cols-4 max-md:grid-cols-2 gap-2 auto-rows-[200px]">
          {GALLERY_TILES.map((tile) => (
            <div
              key={tile.key}
              className={`relative overflow-hidden rounded-xl ${tile.span}`}
            >
              <Image
                src={tile.src}
                alt={t.gallery.alts[tile.key as keyof typeof t.gallery.alts]}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 hover:scale-120"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
