import React from "react";
import { PriceList } from "./priceList";
import { DayNight } from "../dayNightComponent";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

// Placeholder content — see app/[locale]/plans/page.tsx
const PLACEHOLDER_SPECS = [
  { key: "cpu", name: "INTEL I5 12400" },
  { key: "videoCart", name: "RTX 3060 TI 8 GB" },
  { key: "ssd", name: "NVME 512GB" },
  { key: "ram", name: "DDR5 32 GB 3600Mhz" },
  { key: "monitor", name: "DELL 25 240Hz" },
  { key: "mouse", name: "HyperX Pulsefire Haste" },
  { key: "keyboard", name: "HyperX Alloy Core TKL" },
  { key: "headset", name: "HyperX Cloud II" },
];

const PLACEHOLDER_PRICES = Array.from({ length: 4 }, () => ({
  hours: 1,
  dayPrice: "1.80 ₼",
  nightPrice: "2.00 ₼",
}));

export const PriceLayout = ({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 py-8 container-custom max-md:px-8 max-md:gap-4 border-b  border-b-mainRed">
      <h1 className="text-white text-4xl font-bold max-md:text-xl ">
        {t.plansPage.heading}
      </h1>
      <DayNight />
      <div className="grid grid-cols-3 max-md:grid-cols-1 max-md:w-full gap-2 w-full">
        {[0, 1, 2].map((i) => (
          <PriceList
            key={i}
            title="STANDART"
            count={t.plansPage.pcCount}
            t={t}
            locale={locale}
            data={{ price: PLACEHOLDER_PRICES, specs: PLACEHOLDER_SPECS }}
          />
        ))}
      </div>
    </div>
  );
};
