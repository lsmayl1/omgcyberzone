import React from "react";
import Image from "next/image";
import MainRoom from "@/public/pro_room_photo.png";
import { BookButton } from "../buttons/bookButton";

export const Hero = () => {
  return (
    <div className="w-full relative flex justify-center ">
      <Image src={MainRoom} alt="proRoom" className="opacity-60 w-full" />
      <div className="flex justify-center items-center absolute flex-col gap-12 pt-24 ">
        <h1 className="text-7xl font-black">One More Game</h1>
        <BookButton />
      </div>
    </div>
  );
};
