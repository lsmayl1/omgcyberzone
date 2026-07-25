"use client";
import React, { useState } from "react";
import { RoomLayout } from "./roomLayout";
import { ROOMS } from "@/data/rooms";
import { useI18n } from "@/i18n/I18nProvider";

export const Rooms = () => {
  const { t } = useI18n();
  const [selectedKey, setSelectedKey] = useState(ROOMS[0].key);
  const selectedRoom = ROOMS.find((r) => r.key === selectedKey) ?? ROOMS[0];

  return (
    <div
      id="plans"
      // No overflow-auto here: it made this its own scroll container, which
      // swallowed scroll-margin-top so #plans landed under the fixed header.
      // The tab strip below scrolls itself.
      className="flex scroll-mt-28 max-md:scroll-mt-20 flex-col  gap-8 py-16 container-custom max-md:gap-4 border-b  border-b-mainRed"
    >
      <div className="flex gap-24 items-center  justify-between max-md:flex-col max-md:gap-8 max-md:items-start">
        <h2 className="text-white text-4xl font-bold max-md:text-xl  max-md:mb-2 border-l-4 border-mainRed pl-4 text-nowrap uppercase">
          {t.rooms.heading}
        </h2>
        <div className="flex justify-between w-full overflow-x-auto scrollbar-hide bg-boxColor p-1.5 rounded-xl gap-1">
          {ROOMS.map((m) => (
            <button
              key={m.key}
              onClick={() => setSelectedKey(m.key)}
              aria-pressed={selectedKey === m.key}
              className={`text-sm font-semibold text-nowrap max-sm:text-xs px-3 py-2 rounded-lg w-full transition-colors ${
                selectedKey === m.key
                  ? "bg-mainRed text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        <RoomLayout room={selectedRoom} />
      </div>
    </div>
  );
};
