"use client";
import Night from "@/assets/Night";
import Sun from "@/assets/sun";
import Image from "next/image";
import React, { useState } from "react";
import { BookButton } from "../buttons/bookButton";
import { DayNight } from "../dayNightComponent";
import { BookModal } from "../bookModal";

export const PsSection = () => {
  const [bookModal, setBookModal] = useState(false);

  const data = {
    price: [
      { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
      { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
      { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
      { hour: "1 час", dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
    ],
  };
  return (
    <div className="flex flex-col gap-4 py-8  border-b  border-b-mainRed px-54">
      <BookModal open={bookModal} handleClose={() => setBookModal(false)} />

      <div className="flex justify-center flex-col pt-4 items-center gap-8">
        <h1 className="text-white text-4xl font-bold ">PlayStation 5</h1>
        <DayNight />
      </div>
      <div className="flex">
        <div className="flex-1 px-4  justify-center flex flex-col w-full gap-4 max-md:gap-2 ">
          {data?.price?.map((dt, i) => (
            <div
              key={i}
              className="text-white w-full flex bg-background rounded-xl p-4 font-bold text-xl flex-col gap-4"
            >
              <h1 className="text-md"> {dt.hour}</h1>
              <div className="flex gap-2 text-nowrap">
                <div className="bg-boxColor items-center p-2 rounded-lg flex gap-2 w-full justify-between">
                  <Sun />
                  <span className="text-lg">{dt.dayPrice}</span>
                </div>
                <div className="bg-boxColor p-2 rounded-lg items-center flex gap-2 w-full justify-between">
                  <Night />
                  <span className="text-lg">{dt.nightPrice}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="">
            <BookButton
              title="Забронировать PS5"
              showModal={() => setBookModal(true)}
            />
          </div>
        </div>
        <Image
          src={"/ps5.png"}
          alt="ps5"
          width={600}
          height={1200}
          className="flex-1 max-md:hidden"
        />
      </div>
    </div>
  );
};
