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
      className="flex overflow-x-auto gap-2 pb-4  no-scrollbar-buttons scrollbar-hide cursor-grab active:cursor-grabbing select-none"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {CATEGORY_TAB_KEYS.map((key) => {
        const Icon = CATEGORY_ICONS[key];
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-pressed={active === key}
            className={`flex-shrink-0 flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 min-w-[110px] ${
              active === key
                ? "bg-mainRed text-white shadow-lg shadow-mainRed/30"
                : "bg-boxColor text-white hover:bg-mainRed/80"
            }`}
          >
            <Icon aria-hidden="true" size={30} strokeWidth={1.8} />
            <span className="text-xs font-semibold whitespace-nowrap">
              {t.menu.categories[key as keyof typeof t.menu.categories]}
            </span>
          </button>
        );
      })}
    </div>
  );
};
