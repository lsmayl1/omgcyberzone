"use client";
import React, { useCallback, useState } from "react";
import { RoomCard } from "./roomCard";
import { ROOMS } from "@/data/rooms";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Every zone is on screen at once so rates can be compared without clicking
 * through tabs. The main hall takes a double-width card — it holds six times
 * the stations of any other zone, so the span carries real information.
 */
const WIDE_FROM_SEATS = 20;

export const Rooms = () => {
  const { t } = useI18n();
  // Held here rather than per card: the tariff panels float over their
  // neighbours, so two open at once would overlap.
  const [openKey, setOpenKey] = useState<string | null>(null);

  const handleOpenChange = useCallback(
    (key: string, open: boolean) => setOpenKey(open ? key : null),
    [],
  );

  return (
    <div
      id="plans"
      // No overflow-auto here: it made this its own scroll container, which
      // swallowed scroll-margin-top so #plans landed under the fixed header.
      className="flex scroll-mt-28 max-md:scroll-mt-20 flex-col gap-8 py-16 container-custom max-md:gap-6 max-md:py-12 border-b border-b-white/10"
    >
      <h2 className="border-l-4 border-mainRed pl-4 text-4xl font-bold uppercase text-white max-md:text-xl">
        {t.rooms.heading}
      </h2>

      {/* Cards stretch to their row's height — the tariff panel floats, so
          nothing here grows when one opens. Each card hands the slack to its
          photo, which keeps every row's card bottoms flush. */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-md:gap-4">
        {ROOMS.map((room) => (
          <RoomCard
            key={room.key}
            room={room}
            wide={room.seats >= WIDE_FROM_SEATS}
            open={openKey === room.key}
            onOpenChange={(open) => handleOpenChange(room.key, open)}
          />
        ))}
      </div>
    </div>
  );
};
