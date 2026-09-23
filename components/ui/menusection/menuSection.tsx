"use client";
import Link from "next/link";
import { useState } from "react";
import { MenuCard } from "./menuCard";
import { MenuCategory } from "./menuCategory";
import menuData from "@/data/menu-items.json";
import { filterMenuItems, type MenuItem } from "@/data/menu";
import { useI18n } from "@/i18n/I18nProvider";

const PREVIEW_LIMIT = 8;

const menuItems = menuData as MenuItem[];

export const MenuSection = () => {
  const { locale, t } = useI18n();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = filterMenuItems(menuItems, locale, activeCategory);

  return (
    <div
      id="menu"
      className="container-custom flex scroll-mt-20 flex-col gap-3 border-b border-b-white/10 py-12 sm:gap-4 sm:py-16 md:scroll-mt-28"
    >
      <h2 className="mb-2 border-l-4 border-mainRed pl-4 text-xl font-bold uppercase text-white sm:mb-4 sm:text-4xl">
        {t.menu.heading}
      </h2>
      <MenuCategory active={activeCategory} onChange={setActiveCategory} />

      {filteredItems.length > 0 ? (
        <MenuCard items={filteredItems} limit={PREVIEW_LIMIT} />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-boxColor rounded-xl">
          <p className="text-base text-gray-400 sm:text-lg">
            {t.menu.empty}
          </p>
        </div>
      )}

      <div className="flex items-center justify-center">
        <Link
          href={`/${locale}/menu`}
          className="mt-4 w-fit rounded-xl bg-mainRed px-5 py-2.5 text-sm font-bold text-white sm:text-md"
        >
          {t.menu.more}
        </Link>
      </div>
    </div>
  );
};
