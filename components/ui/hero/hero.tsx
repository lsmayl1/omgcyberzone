"use client";
import React, { useState } from "react";
import Image from "next/image";
import MainRoom from "@/public/gamerparking.webp";
import { BookButton } from "../buttons/bookButton";
import { BookModal } from "../bookModal";
import { Kpi } from "../kpi/kpi";
import { useI18n } from "@/i18n/I18nProvider";

export const Hero = () => {
  const { locale, t } = useI18n();
  const [bookModal, setBookModal] = useState(false);

  /** The four things the venue offers, as plain links rather than tiles. */
  const destinations = [
    { key: "zones", label: t.hero.tiles.zones, href: `/${locale}#plans` },
    // A product name, so it is not translated — same rule as the game titles.
    { key: "ps", label: "PlayStation 5", href: `/${locale}#plans` },
    { key: "lounge", label: t.hero.tiles.lounge, href: `/${locale}/menu` },
    { key: "kitchen", label: t.hero.tiles.kitchen, href: `/${locale}/menu` },
  ];

  return (
    <div
      id="main"
      // No top margin: the hero runs under the fixed header, and the padding
      // below clears it.
      // Also: no transform/animation on this element — BookModal is a
      // position:fixed descendant and would get trapped by a containing block.
      className="w-full relative overflow-hidden flex flex-col"
    >
      <BookModal open={bookModal} handleClose={() => setBookModal(false)} />

      {/*
        The room as texture, not as a picture. At this opacity it gives the
        panel depth without asking to be looked at — the headline is the only
        thing above the fold with any weight.
      */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={MainRoom}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.09]"
        />
      </div>

      {/* min-w-0 / flex-wrap throughout: the CTAs and the meta row are
          text-nowrap, and without these they set a min-content width wider
          than a phone, which this element would then silently clip. */}
      <div className="relative z-10 container-custom flex min-h-[46rem] flex-col pt-40 pb-12 max-md:min-h-[38rem] max-md:pt-28 max-md:pb-8">
        <div className="min-w-0 flex flex-grow flex-col justify-center gap-10 max-md:gap-7">
          <p
            className="text-xs font-medium uppercase tracking-[0.32em] text-mainRed animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            {t.hero.badge}
          </p>

          <h1
            className="max-w-5xl text-[5.5rem] font-light leading-[1.02] tracking-[-0.035em] text-white max-lg:text-6xl max-md:text-[2.25rem] max-md:leading-[1.08] animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            {t.hero.titlePrefix && <>{t.hero.titlePrefix} </>}
            <span className="font-bold">{t.meta.siteName}</span>
            {t.hero.titleSuffix}
          </h1>

          <p
            className="max-w-lg text-base font-light leading-[1.7] text-gray-400 max-md:text-sm animate-fade-up"
            style={{ animationDelay: "290ms" }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="flex flex-wrap items-center gap-7 max-md:gap-5 animate-fade-up"
            style={{ animationDelay: "380ms" }}
          >
            <BookButton
              title={t.hero.bookSeat}
              showModal={() => setBookModal(true)}
            />
            {/* Padding on the anchor, border on the span: the link needs a
                44px touch target without the underline drifting off the
                text. */}
            <a
              href={`/${locale}#games`}
              className="group inline-flex items-center py-3 text-sm font-normal text-gray-400 transition-colors hover:text-white"
            >
              <span className="border-b border-gray-500/40 pb-1 transition-colors group-hover:border-white">
                {t.hero.viewGames}
              </span>
            </a>
          </div>
        </div>

        {/* One hairline carries everything else: the numbers on the left, what
            the place actually offers on the right. */}
        <div
          className="mt-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-t border-white/10 pt-6 max-md:mt-10"
          style={{ animationDelay: "470ms" }}
        >
          <Kpi />
          <nav className="flex flex-wrap items-center gap-x-5 text-sm max-md:text-xs">
            {destinations.map((d, i) => (
              <React.Fragment key={d.key}>
                {i > 0 && (
                  <span aria-hidden="true" className="text-gray-700">
                    ·
                  </span>
                )}
                <a
                  href={d.href}
                  // py-3.5 takes a 16px line to a 44px target; it is invisible
                  // on the dark ground but makes the row tappable.
                  className="inline-flex items-center py-3.5 text-gray-300 transition-colors hover:text-white max-md:py-3.5"
                >
                  {d.label}
                </a>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
