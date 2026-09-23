"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import Night from "@/assets/Night";
import Sun from "@/assets/sun";
import Armchair from "@/assets/pc/armchair";
import Cpu from "@/assets/pc/cpu";
import Headset from "@/assets/pc/headset";
import Keyboard from "@/assets/pc/keyboard";
import Monitor from "@/assets/pc/monitor";
import Mouse from "@/assets/pc/mouse";
import Ram from "@/assets/pc/ram";
import Ssd from "@/assets/pc/ssd";
import VideoCard from "@/assets/pc/video-card";
import { minHourlyPrice, type Price, type Room } from "@/data/rooms";
import { useI18n } from "@/i18n/I18nProvider";
import { PhotoLightbox } from "../lightbox/photoLightbox";
import { useSwipe } from "../lightbox/useSwipe";

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

/**
 * Splits "1.80 ₼" so the digits can be set large and the manat sign small.
 * Anything that does not match that shape is rendered untouched.
 */
const splitPrice = (price: string): [string, string] => {
  const match = price.match(/^([\d.,\s]+)(.*)$/);
  if (!match) return [price, ""];
  return [match[1].trim(), match[2].trim()];
};

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden="true"
    className={`size-4 shrink-0 transition-transform duration-300 ${
      open ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 7.5 10 12.5 15 7.5" />
  </svg>
);

/** The headline rate, or the "ask us" tag for zones with no published rate. */
const HeadlinePrice = ({ room }: { room: Room }) => {
  const { t } = useI18n();
  const from = minHourlyPrice(room);

  if (!from) {
    return (
      <span className="price-tag-muted px-4 py-2.5 text-sm font-medium text-gray-200">
        {t.rooms.priceOnRequest}
      </span>
    );
  }

  const [amount, currency] = splitPrice(from);

  return (
    <span className="price-tag flex items-baseline gap-1.5 px-4 py-2">
      <span className="text-[0.65rem] font-medium text-gray-400">
        {t.rooms.priceFrom}
      </span>
      <span className="text-2xl font-bold leading-none tabular-nums text-white max-md:text-xl">
        {amount}
      </span>
      <span className="text-base font-semibold leading-none text-mainRed">
        {currency}
      </span>
      <span className="text-[0.7rem] font-medium text-gray-400">
        {t.rooms.perHour}
      </span>
    </span>
  );
};

/**
 * One package rate. The icon is the day / night marker, so it is only passed
 * where the two differ — an all-day rate has nothing to distinguish and the
 * label carries it for screen readers instead.
 */
const RatePill = ({
  price,
  label,
  icon,
}: {
  price: string;
  label: string;
  icon?: React.ReactNode;
}) => {
  const [amount, currency] = splitPrice(price);

  return (
    <span
      title={label}
      // Fixed width, icon hard left, price hard right. Every pill in a list
      // is then the same size, so the markers line up in one column and the
      // figures in another instead of drifting with the length of the price.
      className="price-pill flex w-24 items-center gap-1.5 px-2.5 py-1"
    >
      {icon}
      <span className="sr-only">{label}</span>
      <span className="ml-auto flex items-baseline gap-0.5">
        <span className="text-sm font-semibold tabular-nums text-white">
          {amount}
        </span>
        <span className="text-xs font-semibold text-mainRed">{currency}</span>
      </span>
    </span>
  );
};

export const RoomCard = ({
  room,
  wide,
  open,
  onOpenChange,
}: {
  room: Room;
  wide: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { t, plural } = useI18n();
  const [period, setPeriod] = useState<Period>("midweek");
  const [photo, setPhoto] = useState(0);
  const [viewing, setViewing] = useState(false);
  const panelId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const alt = t.roomAlts[room.key as keyof typeof t.roomAlts] ?? room.title;
  const description =
    t.rooms.descriptions[room.key as keyof typeof t.rooms.descriptions] ?? "";
  const swipe = useSwipe((direction) =>
    setPhoto(
      (current) =>
        (current + direction + room.images.length) % room.images.length,
    ),
  );
  const rows: Price[] = room.price?.[period] ?? [];
  const hasPackages = rows.some((row) => row.hours > 1);
  const hasDayNightSplit = rows.some(
    (row) => !row.dayPrice || row.dayPrice !== row.nightPrice,
  );

  // A floating panel has to close the way every other dropdown does, or it
  // sits over the cards below until the same button is found again.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  // The wide card really is twice as wide on lg, so it must ask for a bigger
  // source image than its neighbours or it renders soft on large screens.
  const sizes = wide
    ? "(max-width: 1024px) 100vw, 900px"
    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 460px";

  const periods: { key: Period; label: string; days: string }[] = [
    { key: "midweek", label: t.rooms.midweek, days: t.rooms.midweekDays },
    { key: "weekend", label: t.rooms.weekend, days: t.rooms.weekendDays },
  ];

  return (
    <article
      // z-30 while open so the dropdown covers the cards below it rather than
      // sliding under the next row.
      className={`relative flex flex-col rounded-2xl border border-white/8 bg-boxColor ${
        wide ? "sm:col-span-2" : ""
      } ${open ? "z-30" : ""}`}
    >
      {/* `grow` plus an aspect ratio: the ratio sets the photo's natural
          height, and the grow lets it swallow whatever height this card is
          short of its row. The clipper is nested and absolute so the price
          tag can hang over the bottom edge uncut. */}
      <div
        // min-h is a floor, not a size: the aspect ratio is well below it on
        // every real column width, so it only matters if a browser declines
        // to size a flex item from its ratio. The photo can then never
        // collapse to nothing.
        className={`relative grow min-h-[180px] ${
          wide ? "aspect-[16/9]" : "aspect-[4/3] sm:aspect-[16/10]"
        }`}
      >
        <button
          type="button"
          aria-label={t.photo.viewPhoto}
          {...swipe.handlers}
          onClick={() => {
            // A swipe ends in a click too, and that must not open the photo.
            if (swipe.swiped.current) return;
            setViewing(true);
          }}
          className="absolute inset-0 block touch-pan-y select-none overflow-hidden rounded-t-2xl"
        >
          <Image
            key={room.images[photo]}
            src={room.images[photo]}
            alt={alt}
            fill
            sizes={sizes}
            quality={90}
            className="object-cover"
          />
          {/* Grounds the seat chip and the tag; the photos are bright. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 block bg-gradient-to-t from-black/75 via-black/10 to-black/25"
          />
          {/* Quiet affordance: a photo does not look clickable on its own. */}
          <span
            aria-hidden="true"
            className="photo-chip absolute right-3 top-3 flex items-center p-1.5 text-white/80"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 3H3v6M15 21h6v-6M21 9V3h-6M3 15v6h6" />
            </svg>
          </span>
        </button>

        <span className="photo-chip absolute left-3 top-3 px-2.5 py-1 text-[0.7rem] font-semibold text-gray-100">
          {plural(t.rooms.seats, room.seats)}
        </span>

        {room.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {room.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setPhoto(i)}
                // Sits over the swipe surface; without this a tap on a dot
                // also starts a drag on the photo behind it.
                onPointerDown={(event) => event.stopPropagation()}
                aria-label={`${alt} — ${i + 1}`}
                aria-current={photo === i}
                className={`h-1.5 rounded-full transition-all ${
                  photo === i
                    ? "w-6 bg-mainRed"
                    : "w-1.5 bg-white/45 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute -bottom-5 right-4">
          <HeadlinePrice room={room} />
        </div>
      </div>

      {viewing && (
        <PhotoLightbox
          images={room.images}
          index={photo}
          alt={alt}
          onIndexChange={setPhoto}
          onClose={() => setViewing(false)}
        />
      )}

      <div className="flex shrink-0 flex-col gap-4 p-5 pt-8 max-md:p-4 max-md:pt-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold uppercase tracking-wide text-white">
            {room.title}
          </h3>
          {description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">
              {description}
            </p>
          )}
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {room.highlight.map((item) => (
            <li
              key={item}
              className="rounded-md bg-background px-2 py-1 text-[0.7rem] font-medium text-gray-300"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Button and panel share one relative wrapper: the panel anchors to
            the button, and because the panel leaves the flow when closed the
            card ends flush at the button instead of keeping a dead gap. */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => onOpenChange(!open)}
            aria-expanded={open}
            aria-controls={open ? panelId : undefined}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
              open
                ? "bg-mainRed text-white"
                : "bg-background text-gray-200 hover:text-white"
            }`}
          >
            <span>
              {open
                ? t.rooms.hideTariffs
                : room.price
                  ? t.rooms.showTariffs
                  : t.rooms.specs}
            </span>
            <Chevron open={open} />
          </button>

          {open && (
            <div
              id={panelId}
              // Capped so a long panel opened near the foot of the viewport
              // scrolls itself instead of running off the page.
              className="dropdown-panel absolute left-0 right-0 top-full z-30 mt-2 flex max-h-[26rem] flex-col gap-4 overflow-y-auto rounded-xl border border-white/12 bg-boxColor p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.75)]"
            >
              {room.price && rows.length > 0 && (
                <section className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-gray-500">
                      {periods.find((p) => p.key === period)?.days}
                    </p>
                    <div className="flex gap-1 rounded-lg bg-background p-1">
                      {periods.map((p) => (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => setPeriod(p.key)}
                          aria-pressed={period === p.key}
                          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
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

                  <ul className="flex flex-col">
                    {rows.map((row) => {
                      /*
                       * On weekdays the multi-hour packages (3/5/7/9) run at
                       * night only, 16:00–08:00 — they carry a nightPrice and
                       * no dayPrice. At weekends and on holidays every package
                       * runs round the clock, so one price covers both. A rate
                       * that is the same by day and by night (PREMIUM's flat
                       * room rate) is also round the clock, and shows as a
                       * single tag rather than the same number twice.
                       */
                      const flat = row.dayPrice === row.nightPrice;
                      const allDay = period === "weekend" || flat;
                      const label = allDay ? t.rooms.allDay : t.rooms.night;

                      return (
                        <li
                          key={row.hours}
                          className="flex items-center justify-between gap-3 border-b border-white/5 py-2 last:border-0"
                        >
                          <span className="text-sm font-medium text-gray-300">
                            {plural(t.rooms.hours, row.hours)}
                          </span>
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            {row.dayPrice && !flat && (
                              <RatePill
                                price={row.dayPrice}
                                label={t.rooms.day}
                                icon={
                                  <Sun
                                    className="size-4 shrink-0"
                                    aria-hidden="true"
                                  />
                                }
                              />
                            )}
                            {row.nightPrice && (
                              <RatePill
                                price={row.nightPrice}
                                label={label}
                                icon={
                                  allDay ? undefined : (
                                    <Night
                                      className="size-4 shrink-0"
                                      aria-hidden="true"
                                    />
                                  )
                                }
                              />
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Both notes describe the multi-hour packages. A zone that
                      only sells by the hour has nothing to explain. */}
                  {hasPackages && (
                    <p className="text-xs leading-relaxed text-gray-500">
                      {period === "weekend"
                        ? t.rooms.weekendNote
                        : t.rooms.midweekNote}
                    </p>
                  )}

                  {/* The day / night split only means anything on weekdays,
                      and only where the two rates actually differ. */}
                  {period === "midweek" && hasDayNightSplit && (
                    <p className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Sun className="size-3.5" aria-hidden="true" />
                        {t.dayNight.day}
                      </span>
                      <span className="flex items-center gap-1">
                        <Night className="size-3.5" aria-hidden="true" />
                        {t.dayNight.night}
                      </span>
                    </p>
                  )}
                </section>
              )}

              {room.specs && room.specs.length > 0 && (
                <section className="flex flex-col gap-2">
                  <h4 className="text-sm font-semibold text-gray-300">
                    {t.rooms.specs}
                  </h4>
                  <ul className="grid grid-cols-2 gap-1.5 max-md:grid-cols-1">
                    {room.specs.map((spec) => (
                      <li
                        key={spec.key}
                        className="flex items-center gap-2 rounded-lg bg-background px-2.5 py-2"
                      >
                        <span className="flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                          {ICONS[spec.key]}
                        </span>
                        <span className="truncate text-xs text-gray-200">
                          {spec.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
