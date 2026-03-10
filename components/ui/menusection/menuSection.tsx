import Burger from "@/assets/menu-icons/Burger";
import Coffee from "@/assets/menu-icons/Coffee";
import Drinks from "@/assets/menu-icons/Drinks";
import Kalyan from "@/assets/menu-icons/Kalyan";
import Pasta from "@/assets/menu-icons/Pasta";
import Pizza from "@/assets/menu-icons/Pizza";
import Roll from "@/assets/menu-icons/Roll";
import Salads from "@/assets/menu-icons/Salads";
import Sandwich from "@/assets/menu-icons/Sandwich";
import Snacks from "@/assets/menu-icons/Snacks";
import Sweets from "@/assets/menu-icons/Sweets";
import Image from "next/image";
import React from "react";
import { MenuCard } from "./menuCard";

export const MenuSection = () => {
  const icons = [
    { key: "pizza", icon: "/icons/menu/pizza.png", name: "Пицца" },
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
    <div className="flex flex-col p-8 gap-4 items-center border border-b-mainRed">
      <h1 className="text-white text-center text-4xl font-semibold pb-4">Меню</h1>
      <div className="flex flex-col gap-2 w-full">
        <div className="grid grid-cols-5 gap-2">
          {icons.slice(0, 5).map((dt, i) => (
            <div
              key={i}
              className="text-white flex-col justify-center bg-boxColor flex items-center rounded-lg p-4 gap-3 "
            >
              <Image src={dt.icon} alt={dt.key} width={50} height={25} />
              <span className="capitalize text-lg font-semibold">
                {dt.name}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {icons.slice(5).map((dt, i) => (
            <div
              key={i}
              className="text-white flex-col justify-center bg-boxColor flex items-center rounded-lg p-4 gap-3 "
            >
              <Image src={dt.icon} alt={dt.key} width={50} height={25} />
              <span className="capitalize text-lg font-semibold">
                {dt.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <MenuCard />
	  <button className="rounded-xl text-white bg-mainRed font-bold w-fit px-4 py-2 text-xl mt-4">Смотреть ещё</button>
    </div>
  );
};
