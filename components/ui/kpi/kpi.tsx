"use client";
import Image from "next/image";
import React from "react";
import Area from "@/assets/Area";
import Speed from "@/assets/Speed";
import { useI18n } from "@/i18n/I18nProvider";

type Tile = {
  key: string;
  value: string;
  title: string;
  /** Either a bitmap in /public/icons or an inline SVG component. */
  img?: string;
  icon?: React.ReactNode;
};

export const Kpi = () => {
  const { t } = useI18n();

  const kpi: Tile[] = [
    { key: "pc", value: "50", title: t.kpi.pc, img: "/icons/cpu.png" },
    { key: "ps", value: "6", title: t.kpi.ps, img: "/icons/gamepad.png" },
    { key: "area", value: "500 m²", title: t.kpi.area, icon: <Area /> },
    // The unit is translated (Гбит/с, Gbit/sn), so the value lives in the
    // dictionary rather than here.
    {
      key: "internet",
      value: t.kpi.internetValue,
      title: t.kpi.internet,
      icon: <Speed />,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2  pt-8 max-md:grid-cols-2 w-full">
      {kpi.map((kp) => (
        <div
          key={kp.key}
          className="w-full backdrop-blur-md bg-white/5   p-4 rounded-xl text-white relative"
        >
          {kp.icon ? (
            <span
              aria-hidden="true"
              className="absolute bottom-14 z-40 right-0 [&>svg]:size-[50px] max-md:[&>svg]:size-8"
            >
              {kp.icon}
            </span>
          ) : (
            <Image
              src={kp.img!}
              alt=""
              width={50}
              height={50}
              className="absolute bottom-14 z-40 right-0 max-md:size-8 rounded-lg"
            />
          )}
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
