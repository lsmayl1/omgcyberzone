"use client";
import Image from "next/image";
import React from "react";
import { useI18n } from "@/i18n/I18nProvider";

export const Kpi = () => {
  const { t } = useI18n();

  const kpi = [
    { key: "pc", value: "50", title: t.kpi.pc, img: "/icons/cpu.png" },
    { key: "ps", value: "6", title: t.kpi.ps, img: "/icons/gamepad.png" },
    { key: "games", value: "40 +", title: t.kpi.games, img: "/icons/csgo.webp" },
    { key: "open", value: "24/7", title: t.kpi.open, img: "/icons/calendar.png" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2  pt-8 max-md:grid-cols-2 w-full">
      {kpi.map((kp) => (
        <div
          key={kp.key}
          className="w-full backdrop-blur-md bg-white/5   p-4 rounded-xl text-white relative"
        >
          <Image
            src={kp.img}
            alt=""
            width={50}
            height={50}
            className="absolute bottom-14 z-40 right-0 max-md:size-8 rounded-lg"
          />
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl max-md:text-xl">{kp.value}</h2>
            <h4 className="font-bold text-[#C6D1E0] max-md:text-sm text-nowrap">
              {kp.title}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};
