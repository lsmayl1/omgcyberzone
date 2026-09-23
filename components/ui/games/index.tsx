"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { PC_GAMES, PS_GAMES, type Game } from "@/data/games";

type Device = "pc" | "ps";

// Generated from the club's installed-games export — see
// scripts/import-games.mjs. Titles are proper nouns and are not translated.
const GAMES: Record<Device, Game[]> = { pc: PC_GAMES, ps: PS_GAMES };

// First screenful. The rest is one click away rather than a wall of covers.
const PREVIEW_LIMIT = 8;

export const Games = () => {
  const { t } = useI18n();
  const [selectedDevice, setSelectedDevice] = useState<Device>("pc");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const library = GAMES[selectedDevice];
  const needle = query.trim().toLowerCase();
  const games = library.filter((g) => g.title.toLowerCase().includes(needle));
  const visible = expanded ? games : games.slice(0, PREVIEW_LIMIT);

  /* Two different empty states: the device has no titles at all (PS), or the
     search cleared them out. They need different copy. */
  const noLibrary = library.length === 0;

  const devices: { key: Device; label: string }[] = [
    { key: "pc", label: t.games.pc },
    { key: "ps", label: t.games.ps },
  ];

  return (
    <div
      id="games"
      className="flex scroll-mt-28 max-md:scroll-mt-20 flex-col py-16 border-b border-white/10 container-custom gap-8 "
    >
      <div className="flex justify-between items-center gap-6 max-md:flex-col max-md:gap-4 max-md:items-stretch">
        <h2 className="text-white text-4xl font-bold max-md:text-xl border-l-4 border-mainRed pl-4 uppercase text-nowrap">
          {t.games.heading}
        </h2>

        <div className="flex items-center gap-3 w-full max-w-lg max-md:max-w-none">
          <div className="relative flex-1">
            <label htmlFor="games-search" className="sr-only">
              {t.games.searchLabel}
            </label>
            <input
              id="games-search"
              type="search"
              placeholder={t.games.searchPlaceholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setExpanded(false);
              }}
              className="w-full bg-boxColor text-white text-sm px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainRed transition-all placeholder:text-gray-500 [&::-webkit-search-cancel-button]:hidden"
            />
            <svg
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
            {query && (
              <button
                type="button"
                aria-label={t.games.clearSearch}
                onClick={() => {
                  setQuery("");
                  setExpanded(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
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

          <div className="flex shrink-0 gap-1 p-1 rounded-lg bg-boxColor">
            {devices.map((device) => (
              <button
                key={device.key}
                onClick={() => {
                  setSelectedDevice(device.key);
                  setExpanded(false);
                }}
                aria-pressed={selectedDevice === device.key}
                className={`text-xs font-semibold text-nowrap px-3 py-1.5 rounded-md transition-colors ${
                  selectedDevice === device.key
                    ? "bg-mainRed text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {device.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {games.length > 0 ? (
        <div className="grid grid-cols-4 gap-2 max-md:gap-1 max-md:grid-cols-2">
          {visible.map((gm) => (
            <div
              key={gm.name}
              className="group relative overflow-hidden rounded-lg max-md:rounded cursor-pointer"
            >
              {gm.img ? (
                <Image
                  src={gm.img}
                  alt={gm.title}
                  width={460}
                  height={215}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                /* Console and launcher exclusives have no cover to fetch. The
                   tile keeps the shelf's 460x215 rhythm and states the title
                   itself, rather than dropping the game from the list. */
                <div className="flex aspect-[460/215] w-full items-center justify-center bg-gradient-to-br from-boxColor to-background p-3 text-center">
                  <span className="line-clamp-3 text-sm font-semibold leading-tight text-gray-300 max-md:text-xs">
                    {gm.title}
                  </span>
                </div>
              )}
              {/* Titles exist in the data but were never shown. Touch devices
                  have no hover, so below md they stay on permanently. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 p-3 max-md:p-2 text-white text-sm max-md:text-[0.7rem] font-semibold leading-tight opacity-0 translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0 max-md:opacity-100 max-md:translate-y-0">
                {gm.title}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-boxColor rounded-xl">
          <p className="text-gray-400 text-lg max-md:text-base text-center px-4">
            {noLibrary ? t.games.emptyTitle : t.games.notFound}
          </p>
          <p className="text-gray-500 text-sm mt-1 max-md:text-xs text-center px-4">
            {noLibrary ? t.games.emptyHint : t.games.notFoundHint}
          </p>
        </div>
      )}

      {!expanded && games.length > PREVIEW_LIMIT && (
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-xl text-white bg-mainRed font-bold w-fit px-4 py-2 text-md mt-4 max-md:text-flg"
          >
            {t.games.more}
          </button>
        </div>
      )}

      {/* What the grid cannot say: the library is not a closed list, and the
          free Steam catalogue is open to everyone. Both answer a question
          people otherwise have to come to the desk to ask. */}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {[
          {
            key: "request",
            heading: t.games.requestHeading,
            text: t.games.requestText,
            icon: (
              <path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            ),
          },
          {
            key: "steam",
            heading: t.games.steamHeading,
            text: t.games.steamText,
            icon: (
              <>
                <circle cx="12" cy="12" r="9" />
                <circle cx="15" cy="9.5" r="2.5" />
                <path d="m3.5 15 6-2.5" />
              </>
            ),
          },
        ].map((note) => (
          <div
            key={note.key}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-boxColor p-4"
          >
            <span className="mt-0.5 shrink-0 text-mainRed">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {note.icon}
              </svg>
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white">
                {note.heading}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-400 max-md:text-xs">
                {note.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
