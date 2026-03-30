"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { MenuCard } from "@/components/ui/menusection/menuCard";
import menuData from "@/data/menu-items.json";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  sizes: { key: string; price: string }[];
  selectedSizeIndex: number;
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
}

interface Category {
  key: string;
  icon: string;
  name: string;
}

const MenuPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("pizza");
  const [searchQuery, setSearchQuery] = useState("");

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

  const menuItems = menuData as MenuItem[];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const allItems = [{ key: "all", icon: "", name: "Все" }, ...categories];

  return (
    <div className="flex flex-col container-custom pt-26 pb-8 min-h-screen">
      {/* Hero Section - Modern Split Layout */}
      <div className="relative bg-boxColor rounded-3xl overflow-hidden mb-8 max-md:hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="relative p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-mainRed/20 border border-mainRed/30 rounded-full px-4 py-2 mb-4 w-fit">
              <span className="w-2 h-2 bg-mainRed rounded-full animate-pulse" />
              <span className="text-mainRed text-sm font-semibold">
                Добро пожаловать
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Вкусная еда
              <br />
              <span className="text-mainRed">в уютной атмосфере</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              Лучшие блюда от шеф-повара. Свежие ингредиенты, авторские рецепты
              и незабываемый вкус в нашем ресторане.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold text-white">30+</div>
                <div className="text-gray-400 text-sm">видов пиццы</div>
              </div>
              <div className="w-px bg-gray-700 h-12" />
              <div>
                <div className="text-3xl font-bold text-white">15 мин</div>
                <div className="text-gray-400 text-sm">время подачи</div>
              </div>
              <div className="w-px bg-gray-700 h-12" />
              <div>
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-gray-400 text-sm">рейтинг</div>
              </div>
            </div>
          </div>

          {/* Right - Food Image Showcase */}
          <div className="relative min-h-[400px] lg:min-h-full">
            {/* Main Hero Image */}
            <div className="absolute inset-0">
              <Image
                src="/menu-food/pizza-peperoni.avif"
                alt="Pizza"
                fill
                className="object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-boxColor via-boxColor/50 to-transparent lg:bg-gradient-to-r" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-white text-3xl font-bold border-l-4 border-mainRed pl-4 uppercase">
          Меню
        </h2>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск блюд..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-boxColor text-white px-4 py-3 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-mainRed transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Navigation with Drag Scroll */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 pb-4 mb-6 no-scrollbar-buttons scrollbar-hide cursor-grab active:cursor-grabbing select-none"
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

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm">
          Найдено:{" "}
          <span className="text-white font-semibold">
            {filteredItems.length}
          </span>{" "}
          блюд
        </p>
      </div>

      {/* Menu Grid */}
      <MenuCard items={filteredItems} />

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="w-24 h-24 text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-400 text-lg">Ничего не найдено</p>
          <p className="text-gray-500 text-sm mt-1">
            Попробуйте изменить запрос или категорию
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
