import Image from "next/image";
import { title } from "process";
import React from "react";

export const Kpi = () => {
  const kpi = [
    {
      key: "pc",
      value: 50,
      title: "Мощных ПК",
      img: "/icons/cpu.png",
    },
    {
      key: "ps",
      value: 6,
      title: "PS 5",
      img: "/icons/gamepad.png",
    },
    {
      key: "games",
      value: "40 +",
      title: "Игр в библиотеке",
      img: "/icons/games.png",
    },
    {
      key: "open",
      value: "24/7",
      title: "Открыты всегда",
      img: "/icons/calendar.png",
    },
  ];
  return (
    <div className="flex gap-2 p-4">
      {kpi.map((kp, i) => (
        <div
          key={i}
          className="w-full bg-boxColor p-4 rounded-xl text-white relative"
        >
          <Image
            src={kp.img}
            alt=""
            width={50}
            height={50}
            className="absolute bottom-14 z-50 right-0"
          />
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">{kp.value}</h1>
            <h4 className="font-bold text-[#C6D1E0]">{kp.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};
