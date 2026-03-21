"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { MenuCard } from "./menuCard";

export const MenuSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const icons = [
    { key: "pizza", icon: "/icons/menu/Pizza.png", name: "Пицца" },
    { key: "burger", icon: "/icons/menu/Burger.png", name: "Бургер" },
    { key: "roll", icon: "/icons/menu/Roll.png", name: "Ролл" },
    { key: "sandwich", icon: "/icons/menu/Sandwich.png", name: "Сэндвич" },
    { key: "pasta", icon: "/icons/menu/Pasta.png", name: "Паста" },
    { key: "salads", icon: "/icons/menu/Salad.png", name: "Салаты" },
    { key: "snacks", icon: "/icons/menu/Snacks.png", name: "Закуски" },
    { key: "sweets", icon: "/icons/menu/Sweets.png", name: "Десерт" },
    { key: "drinks", icon: "/icons/menu/Drinks.png", name: "Напитки" },
    { key: "coffee", icon: "/icons/menu/Coffee.png", name: "Кофе" },
    { key: "kalyan", icon: "/icons/menu/Kalyan.png", name: "Кальян" },
  ];
  return (
    <div
      id="menu"
      className="flex section scroll-mt-20 flex-col container-custom py-8 gap-4  border-b border-b-mainRed max-md:gap-2"
    >
      <h1 className="text-white text-center text-4xl font-semibold pb-4">
        Меню
      </h1>
      <div
        ref={scrollRef}
        className="flex flex-col gap-2 w-full max-md:hidden overflow-x-auto min-h-0  no-scrollbar-buttons select-none  cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => {
          const container = scrollRef.current;
          if (!container) return;

          const startX = e.pageX;
          const startScroll = container.scrollLeft;

          const onMove = (e: MouseEvent) => {
            const dx = e.pageX - startX;
            container.scrollLeft = startScroll - dx;
          };

          const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
          };

          document.addEventListener("mousemove", onMove);
          document.addEventListener("mouseup", onUp);
        }}
      >
        <div className="flex w-full gap-2 max-md:gap-1 pb-2 ">
          {icons.map((dt, i) => (
            <div
              key={i}
              className="text-white select-none  flex-col shrink-0 justify-center bg-boxColor flex items-center rounded-lg w-48 p-4 gap-3 "
            >
              <Image
                src={dt.icon}
                alt={dt.key}
                width={40}
                height={40}
                className="w-auto h-auto"
              />
              <span className="capitalize text-lg font-semibold">
                {dt.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <MenuCard />
      <div className="flex items-center justify-center">
        <button className="rounded-xl text-white bg-mainRed font-bold w-fit px-4 py-2 text-xl mt-4 max-md:text-flg">
          Смотреть ещё
        </button>
      </div>
    </div>
  );
};
