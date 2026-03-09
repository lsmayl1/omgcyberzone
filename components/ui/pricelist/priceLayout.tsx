import Night from "@/assets/Night";
import Sun from "@/assets/sun";
import React from "react";
import { PriceList } from "./priceList";

export const PriceLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 py-4 px-8">
      <h1 className="text-white text-4xl font-bold ">Игровые ПК</h1>
      <div className="flex gap-16">
        <div className="flex gap-4">
          <Sun />
          <span className="text-white text-xl font-semibold">
            День: 8:00-16:00
          </span>
        </div>
        <div className="flex gap-4">
          <Night />
          <span className="text-white text-xl font-semibold">
            День: 8:00-16:00
          </span>
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <PriceList
          title={"STANDART"}
          count={"50 ПК"}
          data={{
            price: [
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
            ],
            specs: [
              { key: "cpu", name: "INTEL I5 12400" },
              { key: "videoCart", name: "RTX 3060 TI 8 GB" },
              { key: "ssd", name: "NVME 512GB" },
              { key: "ram", name: "DDR5 32 GB 3600Mhz" },
              { key: "monitor", name: "DELL 25 240Hz" },
              { key: "mouse", name: "HyperX Pulsefire Haste" },
              { key: "keyboard", name: "HyperX Alloy Core TKL" },
              { key: "headset", name: "HyperX Cloud II" },
            ],
          }}
        />
        <PriceList
          title={"STANDART"}
          count={"50 ПК"}
          data={{
            price: [
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
            ],
            specs: [
              { key: "cpu", name: "INTEL I5 12400" },
              { key: "videoCart", name: "RTX 3060 TI 8 GB" },
              { key: "ssd", name: "NVME 512GB" },
              { key: "ram", name: "DDR5 32 GB 3600Mhz" },
              { key: "monitor", name: "DELL 25 240Hz" },
              { key: "mouse", name: "HyperX Pulsefire Haste" },
              { key: "keyboard", name: "HyperX Alloy Core TKL" },
              { key: "headset", name: "HyperX Cloud II" },
            ],
          }}
        />{" "}
        <PriceList
          title={"STANDART"}
          count={"50 ПК"}
          data={{
            price: [
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
              { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
            ],
            specs: [
              { key: "cpu", name: "INTEL I5 12400" },
              { key: "videoCart", name: "RTX 3060 TI 8 GB" },
              { key: "ssd", name: "NVME 512GB" },
              { key: "ram", name: "DDR5 32 GB 3600Mhz" },
              { key: "monitor", name: "DELL 25 240Hz" },
              { key: "mouse", name: "HyperX Pulsefire Haste" },
              { key: "keyboard", name: "HyperX Alloy Core TKL" },
              { key: "headset", name: "HyperX Cloud II" },
            ],
          }}
        />
      </div>
    </div>
  );
};
