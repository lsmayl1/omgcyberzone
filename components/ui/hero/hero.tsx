import React from "react";
import Image from "next/image";
import MainRoom from "@/public/gamerparking.webp";
import { BookButton } from "../buttons/bookButton";
import { Carousel } from "../carousel/carousel";

export const Hero = () => {
  return (
    <div className="w-full relative flex justify-center overflow-hidden ">
      <div className="h-200 max-md:h-50 w-full overflow-hidden">
        <Image
          src={MainRoom}
          alt="proRoom"
          className="opacity-50 w-full h-full object-cover object-bottom"
        />
      </div>
      <div className="absolute w-full flex flex-col h-full">
        <div className="flex justify-center h-full items-center  flex-col  text-white gap-12 max-md:gap-6 ">
          <h1 className="text-4xl  max-md:text-lg font-black text-center w-9/12 capitalize">
            ONE MORE GAME
          </h1>
          <BookButton />
        </div>
        <Carousel />
      </div>
    </div>
  );
};
