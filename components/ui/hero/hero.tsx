"use client";
import React, { useState } from "react";
import Image from "next/image";
import MainRoom from "@/public/gamerparking.webp";
import { BookButton } from "../buttons/bookButton";
import { Carousel } from "../carousel/carousel";
import { BookModal } from "../bookModal";
import Logo from "@/assets/Logo";

export const Hero = () => {
  const [bookModal, setBookModal] = useState(false);

  return (
    <div className="w-full relative  justify-center overflow-hidden flex flex-col ">
      <BookModal open={bookModal} handleClose={() => setBookModal(false)} />
      <div className="relative w-full flex justify-center">
        <div className="h-128 max-md:h-64 w-full overflow-hidden">
          <Image
            src={MainRoom}
            alt="proRoom"
            loading="eager"
            className="opacity-20 w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute w-full flex flex-col h-full">
          <div className="flex justify-center h-full items-center  flex-col  text-white gap-8 max-md:gap-6 ">
            <h4 className="uppercase font-bold tracking-widest text-2xl text-mainRed">
              Лучшее игровое место в Баку
            </h4>
    
            <h1 className="text-xl tracking-wider  max-md:text-lg font-semibold text-center w-1/2 text-white uppercase">
              Эпичный геймплей, вкусная еда и непревзойдённый комфорт
            </h1>
            <BookButton
              title="Забронировать"
              showModal={() => setBookModal(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
