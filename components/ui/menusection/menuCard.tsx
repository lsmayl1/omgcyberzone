"use client";
import Image from "next/image";
import React, { useState } from "react";

export const MenuCard = () => {
  const [food, setFood] = useState([
    {
      name: "Пицца BBQ с курицей",
      description: "Соус барбекю, сыр гауда, сыр чеддер, лук, перец, курица",
      category: [
        { key: "25 см", price: "13.00 ₼", selected: true },
        { key: "30 см", price: "15.00 ₼", selected: false },
        { key: "35 см", price: "18.00 ₼", selected: false },
      ],
      img: "/menu-food/pizza.png",
    },
    {
      name: "Пицца BBQ с курицей",
      description: "Соус барбекю, сыр гауда, сыр чеддер, лук, перец, курица",
      category: [
        { key: "25 см", price: "13.00 ₼", selected: true },
        { key: "30 см", price: "15.00 ₼", selected: false },
        { key: "35 см", price: "18.00 ₼", selected: false },
      ],
      img: "/menu-food/pizza.png",
    },
    {
      name: "Пицца BBQ с курицей",
      description: "Соус барбекю, сыр гауда, сыр чеддер, лук, перец, курица",
      category: [
        { key: "25 см", price: "13.00 ₼", selected: true },
        { key: "30 см", price: "15.00 ₼", selected: false },
        { key: "35 см", price: "18.00 ₼", selected: false },
      ],
      img: "/menu-food/pizza.png",
    },
    {
      name: "Пицца BBQ с курицей",
      description: "Соус барбекю, сыр гауда, сыр чеддер, лук, перец, курица",
      category: [
        { key: "25 см", price: "13.00 ₼", selected: true },
        { key: "30 см", price: "15.00 ₼", selected: false },
        { key: "35 см", price: "18.00 ₼", selected: false },
      ],
      img: "/menu-food/pizza.png",
    },
    {
      name: "Пицца BBQ с курицей",
      description: "Соус барбекю, сыр гауда, сыр чеддер, лук, перец, курица",
      category: [
        { key: "25 см", price: "13.00 ₼", selected: true },
        { key: "30 см", price: "15.00 ₼", selected: false },
        { key: "35 см", price: "18.00 ₼", selected: false },
      ],
      img: "/menu-food/pizza.png",
    },
    {
      name: "Пицца BBQ с курицей",
      description: "Соус барбекю, сыр гауда, сыр чеддер, лук, перец, курица",
      category: [
        { key: "25 см", price: "13.00 ₼", selected: true },
        { key: "30 см", price: "15.00 ₼", selected: false },
        { key: "35 см", price: "18.00 ₼", selected: false },
      ],
      img: "/menu-food/pizza.png",
    },
    {
      name: "Пицца BBQ с курицей",
      description: "Соус барбекю, сыр гауда, сыр чеддер, лук, перец, курица",
      category: [
        { key: "25 см", price: "13.00 ₼", selected: true },
        { key: "30 см", price: "15.00 ₼", selected: false },
        { key: "35 см", price: "18.00 ₼", selected: false },
      ],
      img: "/menu-food/pizza.png",
    },
    {
      name: "Пицца BBQ с курицей",
      description: "Соус барбекю, сыр гауда, сыр чеддер, лук, перец, курица",
      category: [
        { key: "25 см", price: "13.00 ₼", selected: true },
        { key: "30 см", price: "15.00 ₼", selected: false },
        { key: "35 см", price: "18.00 ₼", selected: false },
      ],
      img: "/menu-food/pizza.png",
    },
  ]);

  const handleChangeSelected = (foodIndex: number, categoryIndex: number) => {
    const updatedFood = food.map((item, i) => {
      if (i === foodIndex) {
        return {
          ...item,
          category: item.category.map((cat, idx) => ({
            ...cat,
            selected: idx === categoryIndex,
          })),
        };
      }
      return item;
    });
    setFood(updatedFood);
  };

  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-2 max-md:grid-cols-1 max-md:gap-1">
      {food.map((dt, i) => (
        <div
          key={i}
          className="flex bg-boxColor  flex-col gap-4 relative rounded-4xl  max-md:gap-2"
        >
          <div className=" h-64 max-md:max-h-36">
            <Image
              src={dt.img}
              alt={dt.name}
              className="w-full h-full rounded-xl "
              width={400}
              height={64}
            />
          </div>
          <div className="p-4 flex flex-col gap-4">
            <span className="text-white text-xl font-semibold max-md:text-lg">
              {dt.name}
            </span>
            <p className="text-[#66676D] font-semibold max-md:text-xs">
              {dt.description}
            </p>
            <div className="flex gap-2 max-md:gap-1 ">
              {dt.category.map((ct, idx) => (
                <button
                  onClick={() => handleChangeSelected(i, idx)}
                  className={`text-white rounded-lg font-semibold text-lg text-nowrap max-md:text-flg  p-2 max-md:p-2 max-md:rounded-lg ${ct.selected ? "bg-mainRed" : "bg-background"}`}
                  key={idx}
                >
                  {ct.key}
                </button>
              ))}
            </div>
            <span className="flex justify-end text-end w-full text-white text-2xl font-bold max-md:text-lg">
              {dt.category.find((item) => item.selected)?.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
