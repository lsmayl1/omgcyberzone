"use client";
import React, { useState } from "react";
import Image from "next/image";
import MainRoom from "@/public/gamerparking.webp";
import { BookButton } from "../buttons/bookButton";
import { BookModal } from "../bookModal";
import { Kpi } from "../kpi/kpi";

export const Hero = () => {
  const [bookModal, setBookModal] = useState(false);

  return (
    <div
      id="main"
      className="w-full relative   overflow-hidden flex flex-col mt-24 max-md:mt-16 "
    >
      <BookModal open={bookModal} handleClose={() => setBookModal(false)} />

      <div className="relative w-full flex">
        <div className="h-196 max-md:h-128 w-full overflow-hidden">
          <Image
            src={MainRoom}
            alt="proRoom"
            loading="eager"
            className="opacity-15 w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute items-center justify-center w-full flex flex-col h-full  ">
          <div className="flex  container-custom   flex-col  text-white gap-14  max-md:gap-2 ">
            <h4 className="uppercase font-bold tracking-widest text-2xl text-[#EE332D] max-md:text-xl border-l-4 pl-4 border-[#EE332D] ">
              GAMING CENTER BAKU
            </h4>
            <h4 className="uppercase font-bold  leading-18 max-md:leading-8 text-6xl text-white max-md:text-2xl border-l-2 pl-4 border-[#EE332D]/20 ">
              Добро пожаловать <br /> в
              <span className="text-[#EE332D]"> OMG CYBER ZONE</span>
            </h4>

            <h1 className="text-xl mb-8 tracking-wider  max-md:text-lg font-semibold   text-gray-400  max-md:w-9/12 max-md:text-fsm">
              Эпичный геймплей, вкусная еда и непревзойдённый комфорт.
            </h1>
            <div className="flex gap-4 items-center max-md:flex-col max-md:items-start">
              <BookButton
                title="Забронировать Место"
                showModal={() => setBookModal(true)}
              />
              <button className="uppercase px-8 py-4 border-white border rounded-xl text-lg font-semibold text-nowrap max-md:text-sm  max-md:px-4 max-md:py-1 max-md:rounded-sm">
                Посмотреть игры
              </button>
            </div>

            <Kpi />
          </div>
        </div>
      </div>
    </div>
  );
};
