import Night from "@/assets/Night";
import Sun from "@/assets/sun";
import React from "react";

export const DayNight = () => {
  return (
    <div className="flex gap-16 max-md:gap-8 items-center  mb-8 max-md:mb-4">
      <div className="flex gap-4 items-center max-md:gap-2">
        <Sun className="max-md:size-4" />
        <span className="text-white text-xl max-md:text-sm text-nowrap font-semibold">
          День: 8:00-16:00
        </span>
      </div>
      <div className="flex gap-4 items-center max-md:gap-2">
        <Night className="max-md:size-4" />
        <span className="text-white text-xl font-semibold max-md:text-sm text-nowrap">
          Ночь: 16:00-8:00
        </span>
      </div>
    </div>
  );
};
