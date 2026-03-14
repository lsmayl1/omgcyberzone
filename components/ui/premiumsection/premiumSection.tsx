import Night from "@/assets/Night";
import Sun from "@/assets/sun";
import React from "react";
import { BookButton } from "../buttons/bookButton";
import Image from "next/image";
import Collapse from "@/assets/Collapse";
import Cpu from "@/assets/pc/cpu";
import VideoCard from "@/assets/pc/video-card";
import Ram from "@/assets/pc/ram";
import Ssd from "@/assets/pc/ssd";
import Mouse from "@/assets/pc/mouse";
import Headset from "@/assets/pc/headset";
import Keyboard from "@/assets/pc/keyboard";
import Monitor from "@/assets/pc/monitor";

export const PremiumSection = () => {
  const data = {
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
  };

  const icon = [
    { key: "cpu", icon: <Cpu /> },
    { key: "videoCart", icon: <VideoCard /> },
    { key: "ram", icon: <Ram /> },
    { key: "ssd", icon: <Ssd /> },
    { key: "mouse", icon: <Mouse /> },
    { key: "headset", icon: <Headset /> },
    { key: "keyboard", icon: <Keyboard /> },
    { key: "monitor", icon: <Monitor /> },
  ];
  return (
    <div className="flex flex-col gap-8 px-12 py-8  border-b  border-b-mainRed">
      <div className="flex justify-center flex-col pt-4 items-center gap-8 ">
        <h1 className="text-white text-4xl font-bold ">Премиум </h1>
      </div>
      <div className="flex">
        <div className="flex-1 px-4  flex flex-col w-full gap-8 ">
          <h2 className="text-white text-3xl font-semibold">
            Отдельная комната с мощным железом для полноценной команды из 5
            человек
          </h2>
          <div className="flex gap-12 ">
            <div className="flex gap-4 items-center">
              <Image
                src={"/pc-case.png"}
                width={100}
                height={60}
                alt="pc-case"
              />
              <span className="text-white font-bold text-2xl">5 ПК</span>
            </div>
            <div className="flex gap-4 items-center">
              <Image src={"/ps5.png"} width={100} height={60} alt="pc-case" />
              <span className="text-white font-bold text-2xl">PS5</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-boxColor items-center text-white rounded-lg text-xl font-semibold p-4 flex justify-between">
              <h1 className="text-lg">Характеристики</h1>
              <Collapse />
            </div>
            <div className="bg-background rounded-lg flex flex-col gap-6 p-4">
              {data?.specs?.map((spec, i) => (
                <div className="flex flex-col gap-4" key={i}>
                  <div className="flex gap-4 text-white text-md items-center ">
                    <div className="w-14">
                      {icon.find((item) => item.key === spec.key)?.icon}
                    </div>
                    <span className="font-semibold">{spec.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <BookButton title="Забронировать PS5" />
          </div>
        </div>
        <Image
          src={"/premium.png"}
          alt="ps5"
          width={600}
          height={1200}
          className="flex-1 max-md:hidden"
        />
      </div>
    </div>
  );
};
