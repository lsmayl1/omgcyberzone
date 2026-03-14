"use client";
import React, { useState } from "react";
import { PriceList } from "../pricelist/priceList";
import { DayNight } from "../dayNightComponent";
import { RoomLayout } from "./roomLayout";

export const Rooms = () => {
  const menu = [
    {
      title: "STANDART",
      key: "standart",
      images: [{ src: "/standart_room.webp", alt: "standart" }],
      price: [
        { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
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
        { key: "mousepad", name: "HyperX Cloud II" },
        { key: "armchair", name: "HyperX Cloud II" },
      ],
    },
    {
      title: "VIP",
      key: "vip",
      images: [{ src: "/standart_2.webp", alt: "vip" }],

      price: [
        { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
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
        { key: "mousepad", name: "HyperX Cloud II" },
        { key: "armchair", name: "HyperX Cloud II" },
      ],
    },
    {
      title: "PRO",
      key: "pro",
      images: [{ src: "/gamerparking.webp", alt: "pro" }],
      price: [
        { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
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
        { key: "mousepad", name: "HyperX Cloud II" },
        { key: "armchair", name: "HyperX Cloud II" },
      ],
    },
    {
      title: "PlayStation Zone",
      key: "ps",
      images: [{ src: "/pszone2.webp", alt: "pro" }],
      price: [
        { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
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
        { key: "mousepad", name: "HyperX Cloud II" },
        { key: "armchair", name: "HyperX Cloud II" },
      ],
    },
    {
      title: "Premium Zone",
      key: "premium",
      images: [{ src: "/pszone2.webp", alt: "pro" }],

      price: [
        { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
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
        { key: "mousepad", name: "HyperX Cloud II" },
        { key: "armchair", name: "HyperX Cloud II" },
      ],
    },
  ];
  const [selectedRoom, setSelectedRoom] = useState(menu[0]);

  return (
    <div className="flex flex-col justify-center items-center gap-2 py-8 container-custom max-md:gap-4 border-b  border-b-mainRed overflow-auto">
      <h1 className="text-white text-4xl font-bold max-md:text-xl mb-8 max-md:mb-2 ">
        Выберите игровую зону
      </h1>
      <DayNight />
      <div className="flex gap-2 justify-between w-full overflow-auto pb-2 ">
        {menu.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedRoom(m)}
            className={`text-white text-xl font-semibold text-nowrap max-xl:text-sm py-2 px-4 rounded-lg w-full ${selectedRoom.key === m.key ? "bg-mainRed" : "bg-boxColor"}`}
          >
            {m.title}
          </button>
        ))}
      </div>
      <div className="w-full">
        <RoomLayout
          data={{
            price: selectedRoom?.price,
            specs: selectedRoom?.specs,
            image: selectedRoom?.images,
          }}
        />
      </div>
    </div>
  );
};
