"use client";
import React from "react";
import {
  Beef,
  Coffee,
  CupSoda,
  Droplet,
  IceCreamBowl,
  Pizza,
  Salad,
  Sandwich,
  Soup,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { CATEGORY_TAB_KEYS } from "@/data/menu";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useI18n } from "@/i18n/I18nProvider";

type MenuCategoryProps = {
  active: string;
  onChange: (key: string) => void;
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  all: Utensils,
  pizza: Pizza,
  sandwich: Sandwich,
  burger: Beef,
  roll: Sandwich,
  pasta: Utensils,
  salads: Salad,
  soups: Soup,
  snacks: Utensils,
  milkshake: IceCreamBowl,
  drinks: CupSoda,
  coffee: Coffee,
  sauces: Droplet,
};

export const MenuCategory = ({ active, onChange }: MenuCategoryProps) => {
  const { t } = useI18n();
  const { ref, onMouseDown, onClickCapture } = useDragScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onClickCapture={onClickCapture}
      // Bleeds to the screen edges on mobile so a half-cut tab shows there
      // is more to scroll to.
      className="-mx-4 flex cursor-grab select-none gap-2 overflow-x-auto px-4 pb-3 no-scrollbar-buttons scrollbar-hide active:cursor-grabbing sm:mx-0 sm:px-0 sm:pb-4"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {CATEGORY_TAB_KEYS.map((key) => {
        const Icon = CATEGORY_ICONS[key];
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-pressed={active === key}
            className={`flex min-w-[5rem] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 transition-colors sm:min-w-[110px] sm:gap-2 sm:px-4 sm:py-3 ${
              active === key
                ? "bg-mainRed text-white shadow-lg shadow-mainRed/30"
                : "bg-boxColor text-white hover:bg-mainRed/80"
            }`}
          >
            <Icon
              aria-hidden="true"
              className="size-6 sm:size-[30px]"
              strokeWidth={1.8}
            />
            <span className="whitespace-nowrap text-[0.7rem] font-semibold sm:text-xs">
              {t.menu.categories[key as keyof typeof t.menu.categories]}
            </span>
          </button>
        );
      })}
    </div>
  );
};
