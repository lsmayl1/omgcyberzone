"use client";
import Night from "@/assets/Night";
import Armchair from "@/assets/pc/armchair";
import Cpu from "@/assets/pc/cpu";
import Headset from "@/assets/pc/headset";
import Keyboard from "@/assets/pc/keyboard";
import Monitor from "@/assets/pc/monitor";
import Mouse from "@/assets/pc/mouse";
import Ram from "@/assets/pc/ram";
import Ssd from "@/assets/pc/ssd";
import VideoCard from "@/assets/pc/video-card";
import Sun from "@/assets/sun";
import React, { useState } from "react";
import { Carousel } from "../carousel/carousel";
import { minHourlyPrice, type Price, type Room } from "@/data/rooms";
import { useI18n } from "@/i18n/I18nProvider";

const ICONS: Record<string, React.ReactNode> = {
  cpu: <Cpu />,
  videoCart: <VideoCard />,
  ram: <Ram />,
  ssd: <Ssd />,
  mouse: <Mouse />,
  headset: <Headset />,
  keyboard: <Keyboard />,
  monitor: <Monitor />,
  armchair: <Armchair />,
};

type Period = "midweek" | "weekend";

export const RoomLayout = ({ room }: { room: Room }) => {
  const { t, plural } = useI18n();
  const [period, setPeriod] = useState<Period>("midweek");

  const alt = t.roomAlts[room.key as keyof typeof t.roomAlts] ?? "";
  const from = minHourlyPrice(room);
  const rows: Price[] = room.price?.[period] ?? [];

  const periods: { key: Period; label: string; days: string }[] = [
    { key: "midweek", label: t.rooms.midweek, days: t.rooms.midweekDays },
    { key: "weekend", label: t.rooms.weekend, days: t.rooms.weekendDays },
  ];

  return (
    <div className="bg-boxColor rounded-2xl overflow-hidden grid lg:grid-cols-2">
      {/* Photos. On lg the cell stretches to the details column's height and
          the carousel is absolutely positioned to fill it. */}
      <div className="relative h-72 sm:h-96 lg:h-auto lg:min-h-96">
        <div className="absolute inset-0">
          <Carousel slides={room.images.map((src) => ({ src, alt }))} />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-5 p-6 max-md:p-4 max-md:gap-4">
        <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-white text-2xl font-bold uppercase tracking-wide max-md:text-xl">
              {room.title}
            </h3>
            <p className="text-gray-400 text-xs mt-1">{alt}</p>
          </div>
          {from && (
            <div className="text-right shrink-0">
              <p className="text-gray-400 text-[0.7rem] uppercase tracking-wider">
                {t.rooms.priceFrom}
              </p>
              <p className="text-mainRed text-2xl font-bold leading-tight max-md:text-xl">
                {from}
                <span className="text-gray-400 text-xs font-medium ml-1">
                  {t.rooms.perHour}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Specs as compact chips instead of a wide scrolling icon strip */}
        {room.specs && room.specs.length > 0 && (
          <section className="flex flex-col gap-2">
            <h4 className="text-gray-400 text-[0.7rem] font-semibold uppercase tracking-wider">
              {t.rooms.specs}
            </h4>
            {/* Two columns at every size — one column made this nine rows
                tall on phones, which was most of the section's height. */}
            <ul className="grid grid-cols-2 gap-1.5">
              {room.specs.map((spec) => (
                <li
                  key={spec.key}
                  className="flex items-center gap-2 bg-background rounded-lg px-2.5 py-2 max-md:px-2 max-md:py-1.5"
                >
                  <span className="size-4 shrink-0 flex items-center justify-center [&>svg]:size-4">
                    {ICONS[spec.key]}
                  </span>
                  <span className="text-gray-200 text-xs max-md:text-[0.7rem] truncate">
                    {spec.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pricing: one period at a time rather than two stacked tables */}
        {room.price && rows.length > 0 && (
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-gray-400 text-[0.7rem] font-semibold uppercase tracking-wider">
                {t.rooms.tariffs}
              </h4>
              <div className="flex bg-background rounded-lg p-1 gap-1">
                {periods.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPeriod(p.key)}
                    aria-pressed={period === p.key}
                    title={p.days}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      period === p.key
                        ? "bg-mainRed text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-gray-500 text-[0.7rem] -mt-1">
              {periods.find((p) => p.key === period)?.days}
            </p>

            <ul className="flex flex-col">
              {rows.map((row) => {
                /*
                 * On weekdays the multi-hour packages (3/5/7/9) only run at
                 * night, 16:00–08:00 — they carry a nightPrice and no
                 * dayPrice. At weekends and on holidays every package runs
                 * round the clock, so the same single price covers day and
                 * night. Keying purely off dayPrice would have mislabelled
                 * the weekday packages as all-day.
                 */
                const allDay = period === "weekend";
                const label = allDay ? t.rooms.allDay : t.rooms.night;

                return (
                  <li
                    key={row.hours}
                    className="flex items-center justify-between gap-3 py-2 max-md:py-1.5 border-b border-white/5 last:border-0"
                  >
                    <span className="text-gray-300 text-sm font-medium">
                      {plural(t.rooms.hours, row.hours)}
                    </span>
                    <div className="flex items-center gap-2">
                      {row.dayPrice && (
                        <span
                          title={t.rooms.day}
                          className="flex items-center gap-1.5 bg-background rounded-md px-2.5 py-1"
                        >
                          <Sun className="size-4 shrink-0" aria-hidden="true" />
                          <span className="sr-only">{t.rooms.day}</span>
                          <span className="text-white text-sm font-semibold tabular-nums">
                            {row.dayPrice}
                          </span>
                        </span>
                      )}
                      <span
                        title={label}
                        className="flex items-center gap-1.5 bg-background rounded-md px-2.5 py-1"
                      >
                        {allDay ? (
                          <span
                            className="flex items-center gap-0.5"
                            aria-hidden="true"
                          >
                            <Sun className="size-4 shrink-0" />
                            <Night className="size-4 shrink-0" />
                          </span>
                        ) : (
                          <Night
                            className="size-4 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <span className="sr-only">{label}</span>
                        <span className="text-white text-sm font-semibold tabular-nums">
                          {row.nightPrice}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="text-gray-400 text-[0.7rem] leading-relaxed">
              {period === "weekend" ? t.rooms.weekendNote : t.rooms.midweekNote}
            </p>

            {/* The day/night split only means something on weekdays. */}
            <p
              className={`text-gray-500 text-[0.7rem] items-center gap-3 pt-1 ${
                period === "midweek" ? "flex" : "hidden"
              }`}
            >
              <span className="flex items-center gap-1">
                <Sun className="size-3.5" aria-hidden="true" /> {t.dayNight.day}
              </span>
              <span className="flex items-center gap-1">
                <Night className="size-3.5" aria-hidden="true" />{" "}
                {t.dayNight.night}
              </span>
            </p>
          </section>
        )}
      </div>
    </div>
  );
};
