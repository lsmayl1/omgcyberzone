"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
interface Category {
  key: string;
  icon: string;
  name: string;
}

export const MenuCategory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories: Category[] = [
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

  const allItems = [{ key: "all", icon: "", name: "Все" }, ...categories];
  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-2 pb-4  no-scrollbar-buttons scrollbar-hide cursor-grab active:cursor-grabbing select-none"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      onMouseDown={(e) => {
        e.preventDefault();
        const container = scrollRef.current;
        if (!container) return;

        const startX = e.pageX;
        const startScroll = container.scrollLeft;
        container.style.cursor = "grabbing";

        const onMove = (e: MouseEvent) => {
          const dx = e.pageX - startX;
          container.scrollLeft = startScroll - dx;
        };

        const onUp = () => {
          container.style.cursor = "grab";
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseup", onUp);
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
      }}
    >
      {allItems.map((cat, i) => (
        <button
          key={i}
          onClick={() => setActiveCategory(cat.key)}
          className={`flex-shrink-0 flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 min-w-[110px] ${
            activeCategory === cat.key
              ? "bg-mainRed text-white shadow-lg shadow-mainRed/30"
              : "bg-boxColor text-white hover:bg-mainRed/80"
          }`}
        >
          {cat.icon && (
            <Image
              src={cat.icon}
              alt={cat.name}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          )}
          <span className="text-xs font-semibold whitespace-nowrap">
            {cat.name}
          </span>
        </button>
      ))}
    </div>
  );
};
