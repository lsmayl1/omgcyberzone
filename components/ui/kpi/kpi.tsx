"use client";
import React from "react";
import { useI18n } from "@/i18n/I18nProvider";

type Tile = { key: string; value: string; title: string };

/**
 * The four numbers, as quietly as they can be stated: no cards, no icons, no
 * dividers. The hairline above them belongs to the hero's meta row, so this
 * renders nothing but the values themselves.
 */
export const Kpi = () => {
  const { t } = useI18n();

  const kpi: Tile[] = [
    { key: "pc", value: "50", title: t.kpi.pc },
    { key: "ps", value: "6", title: t.kpi.ps },
    { key: "area", value: "500 m²", title: t.kpi.area },
    // The unit is translated (Гбит/с, Gbit/sn), so the value lives in the
    // dictionary rather than here.
    { key: "internet", value: t.kpi.internetValue, title: t.kpi.internet },
  ];

  return (
    <dl className="flex flex-wrap items-start gap-x-11 gap-y-5 max-md:gap-x-8">
      {kpi.map((kp) => (
        <div key={kp.key}>
          <dt className="sr-only">{kp.title}</dt>
          <dd className="m-0">
            <span className="block text-xl font-medium text-white max-md:text-lg">
              {kp.value}
            </span>
            <span className="block text-[0.7rem] uppercase tracking-[0.1em] text-gray-500">
              {kp.title}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
};
