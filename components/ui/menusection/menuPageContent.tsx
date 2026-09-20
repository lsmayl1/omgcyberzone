"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MenuCard } from "./menuCard";
import { MenuCategory } from "./menuCategory";
import menuData from "@/data/menu-items.json";
import { filterMenuItems, type MenuItem } from "@/data/menu";
import { useI18n } from "@/i18n/I18nProvider";

const menuItems = menuData as MenuItem[];

export const MenuPageContent = () => {
  const { locale, t, plural } = useI18n();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = filterMenuItems(
    menuItems,
    locale,
    activeCategory,
    searchQuery,
  );

  return (
    <div className="flex flex-col container-custom pt-26 pb-8 min-h-screen">
      {/* Hero Section - Modern Split Layout */}
      <div className="relative bg-boxColor rounded-3xl overflow-hidden mb-8 max-md:hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="relative p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-mainRed/20 border border-mainRed/30 rounded-full px-4 py-2 mb-4 w-fit">
              <span className="w-2 h-2 bg-mainRed rounded-full animate-pulse" />
              <span className="text-mainRed text-sm font-semibold">
                {t.menuPage.badge}
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {t.menuPage.titleLine1}
              <br />
              <span className="text-mainRed">{t.menuPage.titleLine2}</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              {t.menuPage.lead}
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {t.menuPage.stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && <div className="w-px bg-gray-700 h-12" />}
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="relative min-h-[400px] lg:min-h-full">
            <div className="absolute inset-0">
              <Image
                src="/menu-food/pizza-pepperoni.webp"
                alt={t.menuPage.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-boxColor via-boxColor/50 to-transparent lg:bg-gradient-to-r" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-white text-3xl font-bold border-l-4 border-mainRed pl-4 uppercase">
          {t.menu.heading}
        </h2>

        <div className="relative">
          <label htmlFor="menu-search" className="sr-only">
            {t.menuPage.searchLabel}
          </label>
          <input
            id="menu-search"
            type="text"
            placeholder={t.menuPage.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-boxColor text-white px-4 py-3 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-mainRed transition-all"
          />
          <svg
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              type="button"
              aria-label={t.menuPage.clearSearch}
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <MenuCategory active={activeCategory} onChange={setActiveCategory} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm">
          {t.menuPage.found}{" "}
          <span className="text-white font-semibold">
            {filteredItems.length}
          </span>{" "}
          {plural(t.menuPage.dishes, filteredItems.length)}
        </p>
      </div>

      <MenuCard items={filteredItems} />

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            aria-hidden="true"
            className="w-24 h-24 text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-400 text-lg">{t.menuPage.emptyTitle}</p>
          <p className="text-gray-500 text-sm mt-1">{t.menuPage.emptyHint}</p>
        </div>
      )}
    </div>
  );
};
