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
    <div className="container-custom flex min-h-screen flex-col pb-8 pt-20 sm:pt-26">
      {/*
        One full-bleed photo with the title over it, rather than a text panel
        beside a picture. The photo is the lounge — the room everything on
        this page is served in — and it is used nowhere else on the site.
      */}
      <section className="relative mb-6 overflow-hidden rounded-2xl sm:mb-8 sm:rounded-3xl">
        <div className="relative min-h-[26rem] sm:min-h-[30rem] lg:min-h-[34rem]">
          <Image
            src="/omg/IMG_2717.webp"
            alt={t.menuPage.heroImageAlt}
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          {/* Grounds the text: near-opaque at the foot where the copy and
              stats sit, clearing towards the top so the counter reads. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25"
          />

          <div className="relative flex min-h-[26rem] flex-col justify-end gap-3 p-5 sm:min-h-[30rem] sm:gap-4 sm:p-8 lg:min-h-[34rem] lg:p-12">
            <span className="w-fit rounded-full border border-mainRed/40 bg-mainRed/15 px-3 py-1.5 text-xs font-semibold text-mainRed sm:text-sm">
              {t.menuPage.badge}
            </span>

            <h1 className="max-w-2xl text-3xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {t.menuPage.titleLine1}
              <br />
              <span className="text-mainRed">{t.menuPage.titleLine2}</span>
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
              {t.menuPage.lead}
            </p>

            {/* Three-up at every width — a divided row needs more room than a
                phone has, and these are short enough to sit side by side. */}
            <dl className="mt-2 grid grid-cols-3 gap-3 border-t border-white/15 pt-4 sm:mt-4 sm:max-w-lg sm:gap-6 sm:pt-5">
              {t.menuPage.stats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </dd>
                  <p className="text-xs leading-snug text-gray-400 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:gap-4">
        <h2 className="border-l-4 border-mainRed pl-4 text-2xl font-bold uppercase text-white sm:text-3xl">
          {t.menu.heading}
        </h2>

        <div className="relative">
          <label htmlFor="menu-search" className="sr-only">
            {t.menuPage.searchLabel}
          </label>
          <input
            id="menu-search"
            type="search"
            placeholder={t.menuPage.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // 16px on mobile: anything smaller makes iOS Safari zoom the page
            // in when the field takes focus.
            className="w-full rounded-xl bg-boxColor py-3 pl-11 pr-10 text-base text-white transition-all focus:outline-none focus:ring-2 focus:ring-mainRed sm:text-sm"
          />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="size-5"
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

      {/*
        Parked under the header so a category is always one tap away, however
        far down the list you are. The offsets are the header's own heights
        (h-14 on mobile, h-24 from md), and z-30 keeps it under the header's
        z-40 rather than over it.
      */}
      <div className="sticky top-14 z-30 -mx-4 mb-5 border-b border-white/10 bg-background/95 px-4 pt-2 backdrop-blur-md sm:mb-6 md:top-24">
        <MenuCategory
          active={activeCategory}
          onChange={setActiveCategory}
          bleed={false}
        />
      </div>

      <p className="mb-3 text-xs text-gray-400 sm:mb-4 sm:text-sm">
        {t.menuPage.found}{" "}
        <span className="font-semibold text-white">{filteredItems.length}</span>{" "}
        {plural(t.menuPage.dishes, filteredItems.length)}
      </p>

      <MenuCard items={filteredItems} />

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center sm:py-20">
          <svg
            aria-hidden="true"
            className="mb-4 size-16 text-gray-600 sm:size-24"
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
          <p className="text-base text-gray-400 sm:text-lg">
            {t.menuPage.emptyTitle}
          </p>
          <p className="mt-1 text-sm text-gray-500">{t.menuPage.emptyHint}</p>
        </div>
      )}
    </div>
  );
};
