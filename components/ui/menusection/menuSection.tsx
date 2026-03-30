"use client";
import Link from "next/link";
import { MenuCard } from "./menuCard";
import { MenuCategory } from "./menuCategory";
import menuData from "@/data/menu-items.json";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  sizes: { key: string; price: string }[];
  selectedSizeIndex: number;
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
}

export const MenuSection = () => {
  const menuItems = menuData as MenuItem[];

  return (
    <div
      id="menu"
      className="flex scroll-mt-20 flex-col container-custom py-16 gap-4 border-b border-b-mainRed max-md:gap-2"
    >
      <h1 className="text-white text-4xl font-bold max-md:text-xl mb-4 max-md:mb-2 border-l-4 border-mainRed pl-4 uppercase">
        Меню
      </h1>
      <MenuCategory />

      <MenuCard items={menuItems} limit={8} />
      <div className="flex items-center justify-center">
        <Link
          href={"/menu"}
          className="rounded-xl text-white bg-mainRed font-bold w-fit px-4 py-2 text-md mt-4 max-md:text-flg"
        >
          Смотреть ещё
        </Link>
      </div>
    </div>
  );
};
