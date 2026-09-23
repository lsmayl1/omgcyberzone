"use client";
import Image from "next/image";
import React, { useState } from "react";
import { formatSize, hasSizeChoice, type MenuItem } from "@/data/menu";
import { useI18n } from "@/i18n/I18nProvider";

interface MenuCardProps {
  items: MenuItem[];
  limit?: number;
}

/**
 * One card, one markup tree.
 *
 * This used to be two complete copies of every card — a stacked desktop one
 * hidden below md and a row-shaped mobile one hidden above it — so each dish
 * shipped twice, images included. The shape is now a plain flex direction
 * change: a row on phones, a stacked card from sm up.
 *
 * Widths are declared mobile-first, so `sizes` has to be too or the phone
 * layout downloads a desktop-sized image for a 7rem thumbnail.
 */
const IMAGE_SIZES = "(max-width: 639px) 7rem, (max-width: 1023px) 50vw, 25vw";

export const MenuCard = ({ items, limit }: MenuCardProps) => {
  const { locale, t } = useI18n();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<
    Record<number, number>
  >({});

  const handleSizeChange = (itemId: number, newSizeIndex: number) => {
    setSelectedSizeIndex((prev) => ({ ...prev, [itemId]: newSizeIndex }));
  };

  const displayItems = limit ? items.slice(0, limit) : items;

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      {displayItems.map((item) => {
        const rawIndex =
          selectedSizeIndex[item.id] ?? item.selectedSizeIndex ?? 0;
        // Clamp so a bad selectedSizeIndex in the JSON can't crash the grid.
        const currentIndex = Math.min(
          Math.max(rawIndex, 0),
          Math.max(item.sizes.length - 1, 0),
        );
        const currentPrice = item.sizes[currentIndex]?.price ?? "—";
        // A sauce or a bottled drink has one price and nothing to pick.
        const showSizes = hasSizeChoice(item.sizes);
        const name = item.name[locale];
        const description = item.description[locale];

        return (
          <li
            key={item.id}
            className="group flex flex-row overflow-hidden rounded-xl bg-boxColor transition-colors sm:flex-col sm:rounded-2xl"
          >
            <div className="relative w-28 shrink-0 self-stretch sm:h-48 sm:w-full">
              <Image
                src={item.image}
                alt={name}
                fill
                sizes={IMAGE_SIZES}
                className="object-cover transition-transform duration-500 sm:group-hover:scale-105"
              />
              {(item.isPopular || item.isSpicy) && (
                <div className="absolute left-2 top-2 flex flex-wrap gap-1 sm:left-3 sm:top-3 sm:gap-2">
                  {item.isPopular && (
                    <span className="rounded-full bg-mainRed px-2 py-0.5 text-[0.65rem] font-bold text-white sm:py-1 sm:text-xs">
                      {t.menu.badges.popular}
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[0.65rem] font-bold text-white sm:py-1 sm:text-xs">
                      {t.menu.badges.spicy}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white sm:text-lg sm:transition-colors sm:group-hover:text-mainRed">
                  {name}
                </h3>
                {description && (
                  <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-gray-400 sm:mt-1 sm:text-sm">
                    {description}
                  </p>
                )}
              </div>

              {showSizes && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSizeChange(item.id, idx)}
                      aria-pressed={currentIndex === idx}
                      className={`rounded-lg px-2 py-1 text-xs font-semibold transition-colors sm:px-3 sm:py-1.5 sm:text-sm ${
                        currentIndex === idx
                          ? "bg-mainRed text-white"
                          : "bg-background text-gray-400 hover:bg-mainRed/50 hover:text-white"
                      }`}
                    >
                      {formatSize(size, t)}
                    </button>
                  ))}
                </div>
              )}

              {/* mt-auto: on the stacked card the price sits on the bottom
                  edge whatever the description's length. */}
              <div className="mt-auto flex items-baseline justify-end gap-2 pt-1">
                <span className="hidden text-xs text-gray-400 sm:inline">
                  {t.menu.price}
                </span>
                <span className="text-base font-bold text-white sm:text-xl">
                  {currentPrice}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
