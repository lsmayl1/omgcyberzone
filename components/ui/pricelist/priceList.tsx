import Collapse from "@/assets/Collapse";
import Night from "@/assets/Night";
import Cpu from "@/assets/pc/cpu";
import Headset from "@/assets/pc/headset";
import Keyboard from "@/assets/pc/keyboard";
import Monitor from "@/assets/pc/monitor";
import Mouse from "@/assets/pc/mouse";
import Ram from "@/assets/pc/ram";
import Ssd from "@/assets/pc/ssd";
import VideoCard from "@/assets/pc/video-card";
import Sun from "@/assets/sun";
import React from "react";

type Spec = {
  key: string;
  name: string;
};

type Price = {
  hour: string;
  dayPrice: string;
  nightPrice: string;
};

type Data = {
  price: Price[];
  specs: Spec[];
};

export const PriceList = ({
  title,
  count,
  data,
}: {
  title: string;
  count: string;
  data: Data;
}) => {
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
    <div className="bg-boxColor w-full rounded-xl p-8 flex flex-col gap-4 max-md:p-4 max-md:gap-2">
      <div className="flex justify-between items-center">
        <span className="bg-mainRed px-4 py-2 rounded-xl text-white font-bold max-md:px-2 max-md:py-1 max-md:text-md ">
          {title}
        </span>
        <span className="text-white font-bold text-xl ">{count}</span>
      </div>
      {data?.price?.map((dt, i) => (
        <div
          key={i}
          className="text-white flex bg-background rounded-xl p-4 font-bold text-xl flex-col gap-4 max-md:p-3 max-md:gap-2"
        >
          <h1 className="text-md"> {dt.hour}</h1>
          <div className="flex gap-2 text-nowrap">
            <div className="bg-boxColor items-center p-2 rounded-lg flex gap-2 w-full justify-between">
              <Sun className="max-md:size-6" />
              <span className="text-lg max-md:text-md">{dt.dayPrice}</span>
            </div>
            <div className="bg-boxColor p-2 rounded-lg items-center flex gap-2 w-full justify-between">
              <Night className="max-md:size-6" />
              <span className="text-lg max-md:text-md">{dt.nightPrice}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-4">
        <div className="bg-background items-center text-white rounded-lg text-xl font-semibold p-4 flex justify-between">
          <h1 className="text-lg">Характеристики</h1>
          <Collapse />
        </div>
        <div className="bg-background rounded-lg flex flex-col gap-6 p-4">
          {data?.specs?.map((spec, i) => (
            <div className="flex flex-col gap-4" key={i}>
              <div className="flex gap-4 text-white text-md items-center ">
                <div className="w-14 ">
                  {icon.find((item) => item.key === spec.key)?.icon}
                </div>
                <span className="font-semibold">{spec.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
