import Collapse from "@/assets/Collapse";
import Night from "@/assets/Night";
import Armchair from "@/assets/pc/armchair";
import Cpu from "@/assets/pc/cpu";
import Headset from "@/assets/pc/headset";
import Keyboard from "@/assets/pc/keyboard";
import Monitor from "@/assets/pc/monitor";
import Mouse from "@/assets/pc/mouse";
import MousePad from "@/assets/pc/mouse-pad";
import Ram from "@/assets/pc/ram";
import Ssd from "@/assets/pc/ssd";
import VideoCard from "@/assets/pc/video-card";
import Sun from "@/assets/sun";
import Image from "next/image";
import React from "react";
import { DayNight } from "../dayNightComponent";
import { Carousel } from "../carousel/carousel";

type Spec = {
  key: string;
  name: string;
};

type Image = {
  src: string;
  alt: string;
};

type Price = {
  hour: string;
  dayPrice?: string;
  nightPrice?: string;
};

type Data = {
  price?: { midweek: Price[]; weekend: Price[] };
  specs?: Spec[];
  image: Image[];
};

export const RoomLayout = ({ data }: { data: Data }) => {
  const icon = [
    { key: "cpu", icon: <Cpu /> },
    { key: "videoCart", icon: <VideoCard /> },
    { key: "ram", icon: <Ram /> },
    { key: "ssd", icon: <Ssd /> },
    { key: "mouse", icon: <Mouse /> },
    { key: "headset", icon: <Headset /> },
    { key: "keyboard", icon: <Keyboard /> },
    { key: "monitor", icon: <Monitor /> },
    // { key: "mousepad", icon: <MousePad /> },
    { key: "armchair", icon: <Armchair /> },
  ];
  return (
    <div className="bg-boxColor w-full h-full rounded-xl p-4 flex-col  gap-4 max-md:p-2 max-md:gap-2 ">
      <div className="flex flex-col w-fullh-fit  ">
        <div className="flex flex-col flex-4">
          <h1 className="text-white text-2xl font-bold max-md:text-xl mb-4 max-md:mb-2  border-l-4 border-mainRed pl-4  ">
            Интерьер
          </h1>
          <div className="h-full overflow-hidden rounded-2xl max-h-128 w-full">
            {/* {data.image?.map((im, i) => (
              <img
                key={i}
                src={im.src || "/standart_room.webp"}
                alt="standart"
                className="w-full  object-bottom"
              />
            ))} */}
            <Carousel slides={data.image} />
          </div>
        </div>
        {data?.price && data.price?.midweek?.length > 0 && (
          <div className="mt-4">
            {" "}
            <div className="flex justify-between items-center ">
              <h1 className="text-white text-2xl font-bold max-md:text-xl mb-4 max-md:mb-2  border-l-4 border-mainRed pl-4  ">
                Тарифы
              </h1>
              <DayNight />
            </div>
            <div className="flex  w-full h-full gap-2 ">
              <div className="flex w-full flex-col bg-background rounded-xl p-4 gap-2">
                <span className="text-white text-xl mb-4">Будни </span>
                {data?.price?.midweek.map((dt, i) => (
                  <div
                    key={i}
                    className="text-white flex bg-background rounded-xl  font-bold text-xl  items-center gap-4 max-md:p-3 max-md:gap-2"
                  >
                    <h1 className="text-md text-nowrap"> {dt.hour}</h1>

                    <div className="flex gap-2 text-nowrap w-full">
                      {dt.dayPrice && (
                        <div className="bg-boxColor items-center p-2 rounded-lg flex gap-2 w-full justify-between">
                          <Sun className="max-md:size-6" />
                          <span className="text-xl max-md:text-md">
                            {dt.dayPrice}
                          </span>
                        </div>
                      )}

                      <div className="bg-boxColor p-2 rounded-lg items-center flex gap-2 w-full justify-between">
                        <Night className="max-md:size-6" />
                        <span className="text-xl max-md:text-md">
                          {dt.nightPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-col bg-background rounded-xl p-4 gap-2">
                <span className="text-white text-xl mb-4">Выходные</span>
                {data?.price?.weekend.map((dt, i) => (
                  <div
                    key={i}
                    className="text-white flex bg-background rounded-xl  font-bold text-xl  items-center gap-4 max-md:p-3 max-md:gap-2"
                  >
                    <h1 className="text-md text-nowrap"> {dt.hour}</h1>

                    <div className="flex gap-2 text-nowrap w-full">
                      {dt.dayPrice && (
                        <div className="bg-boxColor items-center p-2 rounded-lg flex gap-2 w-full justify-between">
                          <Sun className="max-md:size-6" />
                          <span className="text-xl max-md:text-md">
                            {dt.dayPrice}
                          </span>
                        </div>
                      )}

                      <div className="bg-boxColor p-2 rounded-lg items-center flex gap-2 w-full justify-between">
                        <div className="flex items-center gap-4">
                          <Sun />
                          -
                          <Night />
                        </div>
                        <span className="text-xl max-md:text-md">
                          {dt.nightPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {data.specs && data.specs?.length > 0 && (
          <div className="bg-background  bottom-0 rounded-lg flex  justify-between p-4 max-md:p-2 w-full overflow-auto gap-4 mt-1 items-center	">
            {data?.specs?.map((spec, i) => (
              <div className="flex flex-col gap-2 border-r " key={i}>
                <div className="flex flex-col  text-white text-md items-center justify-center ">
                  <div className="size-12 max-md:size-14 flex items-center justify-center ">
                    {icon.find((item) => item.key === spec.key)?.icon}
                  </div>
                  <span className="font-semibold text-nowrap text-sm max-md:text-fsm">
                    {spec.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
