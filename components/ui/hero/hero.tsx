import React from "react";
import Image from "next/image";
import MainRoom from "@/public/pro_room_photo.png";
import { BookButton } from "../buttons/bookButton";
import { Carousel } from "../carousel/carousel";

export const Hero = () => {
  return (
    <div className="w-full relative flex justify-center overflow-hidden ">
      <Image src={MainRoom} alt="proRoom" className="opacity-60 w-full" />
      <div className="absolute w-full flex flex-col gap-44">
        <div className="flex justify-center items-center  flex-col gap-12 text-white pt-24 ">
          <h1 className="text-7xl font-black">One More Game</h1>
          <BookButton />
        </div>
        <Carousel />
      </div>
    </div>
  );
};
