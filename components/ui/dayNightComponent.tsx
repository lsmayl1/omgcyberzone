import Night from "@/assets/Night";
import Sun from "@/assets/sun";
import React from "react";

export const DayNight = () => {
  return (
    <div className="flex gap-8 max-md:gap-8 items-center  mb-4 max-md:mb-4">
      <div className="flex gap-4 items-center max-md:gap-2">
        <Sun className="max-md:size-4 size-6" />
        <span className="text-white text-md max-md:text-sm text-nowrap font-semibold tracking-wider">
          8:00 - 16:00
        </span>
      </div>
      <div className="flex gap-4 items-center max-md:gap-2">
        <Night className="max-md:size-4 size-6" />
        <span className="text-white text-md font-semibold max-md:text-sm text-nowrap tracking-wider">
          16:00 - 8:00
        </span>
      </div>
    </div>
  );
};
