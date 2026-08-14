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

  return (
    <div
      id="main"
      // No top margin: the hero runs under the fixed header so the
      // transparent-at-top header has the hero image behind it.
      // Also: no transform/animation on this element — BookModal is a
      // position:fixed descendant and would get trapped by a containing block.
      className="w-full relative   overflow-hidden flex flex-col"
    >
      <BookModal open={bookModal} handleClose={() => setBookModal(false)} />

      {/*
        The copy sets the height and the photo fills behind it. It used to be
        the other way round — a fixed h-196/h-128 image box with the text
        absolutely positioned on top — which clipped the lower half of the
        content on phones as soon as the copy grew. min-h keeps the tall
        cinematic crop on desktop without capping anything.
      */}
      <div className="relative w-full flex items-center min-h-196 max-md:min-h-[34rem] py-28 max-md:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={MainRoom}
            alt={t.gallery.alts.gamerparking}
            loading="eager"
            priority
            fill
            sizes="100vw"
            className="opacity-40 object-cover object-center animate-slow-zoom"
          />
        </div>

        {/* Scrim, not a flat opacity drop: the room stays visible up top while
            the copy and the glass KPI tiles get solid ground underneath. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background pointer-events-none"
        />

        {/* Soft red glow anchored behind the headline */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-1/3 z-0 size-[38rem] max-md:size-72 rounded-full bg-mainRed/20 blur-[120px] max-md:blur-3xl animate-pulse-glow pointer-events-none"
        />

        <div className="relative z-10 w-full">
          <div className="flex  container-custom   flex-col  text-white gap-14  max-md:gap-6 ">
            <h4
              className="uppercase font-bold tracking-widest text-2xl text-[#EE332D] max-md:text-xl border-l-4 pl-4 border-[#EE332D] animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              {t.hero.badge}
            </h4>

            {/* Headline and subtitle share one slot so the container's gap-14
                doesn't push them apart. */}
            <div className="flex flex-col gap-5 max-md:gap-3">
              <h1
                className="uppercase font-bold  leading-18 max-md:leading-8 text-6xl text-white max-md:text-2xl border-l-4 pl-4 border-[#EE332D] animate-fade-up"
                style={{ animationDelay: "220ms" }}
              >
                {t.hero.titlePrefix && (
                  <>
                    {t.hero.titlePrefix}
                    <br />
                  </>
                )}
                <span className="text-[#EE332D]">{t.meta.siteName}</span>
                {t.hero.titleSuffix}
              </h1>

              {/* Transparent border keeps the text aligned with the headline. */}
              <p
                className="max-w-2xl text-lg text-gray-300 leading-relaxed max-md:text-sm border-l-4 pl-4 border-transparent animate-fade-up"
                style={{ animationDelay: "300ms" }}
              >
                {t.hero.subtitle}
              </p>
            </div>

            <div
              className="flex gap-4 items-center  max-md:items-start animate-fade-up"
              style={{ animationDelay: "380ms" }}
            >
              <BookButton
                title={t.hero.bookSeat}
                showModal={() => setBookModal(true)}
              />
              {/* A real anchor: html has scroll-behavior:smooth so the jump
                  animates natively, the URL becomes shareable, and it still
                  works with JS disabled. */}
              <a
                href={`/${locale}#games`}
                className="inline-flex items-center justify-center uppercase px-6 py-3 border border-white/70 rounded-lg text-base font-semibold text-nowrap max-md:text-sm max-md:px-4 max-md:py-2 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white"
              >
                {t.hero.viewGames}
              </a>
            </div>

            <div
              className="animate-fade-up"
              style={{ animationDelay: "540ms" }}
            >
              <Kpi />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
