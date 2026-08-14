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
      className="flex scroll-mt-28 max-md:scroll-mt-20 flex-col container-custom py-16 gap-4 border-b border-b-white/10 max-md:gap-2"
    >
      <h2 className="text-white text-4xl font-bold max-md:text-xl mb-4 max-md:mb-2 border-l-4 border-mainRed pl-4 uppercase">
        {t.menu.heading}
      </h2>
      <MenuCategory active={activeCategory} onChange={setActiveCategory} />

      {filteredItems.length > 0 ? (
        <MenuCard items={filteredItems} limit={PREVIEW_LIMIT} />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-boxColor rounded-xl">
          <p className="text-gray-400 text-lg max-md:text-base">
            {t.menu.empty}
          </p>
        </div>
      )}

      <div className="flex items-center justify-center">
        <Link
          href={`/${locale}/menu`}
          className="rounded-xl text-white bg-mainRed font-bold w-fit px-4 py-2 text-md mt-4 max-md:text-flg"
        >
          {t.menu.more}
        </Link>
      </div>
    </div>
  );
};
