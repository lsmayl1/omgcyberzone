"use client";
import Night from "@/assets/Night";
import Sun from "@/assets/sun";
import React from "react";
import { useI18n } from "@/i18n/I18nProvider";

export const DayNight = () => {
  const { t } = useI18n();

  return (
    <div className="flex gap-8 max-md:gap-8 items-center  mb-4 max-md:mb-4">
      <div className="flex gap-4 items-center max-md:gap-2">
        <Sun className="max-md:size-4 size-6" />
        <span className="text-white text-md max-md:text-sm text-nowrap font-semibold tracking-wider">
          {t.dayNight.day}
        </span>
      </div>
      <div className="flex gap-4 items-center max-md:gap-2">
        <Night className="max-md:size-4 size-6" />
        <span className="text-white text-md font-semibold max-md:text-sm text-nowrap tracking-wider">
          {t.dayNight.night}
        </span>
      </div>
    </div>
  );
};
