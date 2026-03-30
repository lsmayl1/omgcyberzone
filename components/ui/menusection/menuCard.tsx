"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

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

interface MenuCardProps {
  items: MenuItem[];
  limit?: number;
}

export const MenuCard = ({ items, limit }: MenuCardProps) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<Record<number, number>>({});

  const handleSizeChange = (itemId: number, newSizeIndex: number) => {
    setSelectedSizeIndex((prev) => ({
      ...prev,
      [itemId]: newSizeIndex,
    }));
  };

  const displayItems = limit ? items.slice(0, limit) : items;

  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 max-md:gap-3">
      {displayItems.map((item) => {
        const currentIndex = selectedSizeIndex[item.id] ?? item.selectedSizeIndex ?? 0;
        return (
          <div
            key={item.id}
            className="group bg-boxColor rounded-2xl overflow-hidden max-md:rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-mainRed/10 hover:-translate-y-1"
          >
            {/* Desktop: Stacked Layout */}
            <div className="max-md:hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.isPopular && (
                    <span className="bg-mainRed text-white text-xs font-bold px-2 py-1 rounded-full">
                      Популярное
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Острое
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <h3 className="text-white text-lg font-bold mb-1 group-hover:text-mainRed transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 min-h-6">
                    {item.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSizeChange(item.id, idx)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        currentIndex === idx
                          ? "bg-mainRed text-white"
                          : "bg-background text-gray-400 hover:bg-mainRed/50 hover:text-white"
                      }`}
                    >
                      {size.key}
                    </button>
                  ))}
                </div>
                <div className="flex items-center pt-3 justify-end">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">Цена:</span>
                    <span className="text-white text-xl font-bold">
                      {item.sizes[currentIndex].price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Flex Row Layout */}
            <div className="hidden max-md:flex flex-row gap-3 max-md:gap-2">
              {/* Image */}
              <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-1 left-1 flex gap-1">
                  {item.isPopular && (
                    <span className="bg-mainRed text-white text-[0.50rem] font-bold px-1.5 py-0.5 rounded-full">
                      Популярное
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="bg-orange-500 text-white text-[0.50rem] font-bold px-1.5 py-0.5 rounded-full">
                      Острое
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-1 max-md:pr-1">
                <div>
                  <h3 className="text-white text-base font-bold mb-1 max-md:text-[0.8rem]">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2 max-md:text-[0.45rem] min-h-4">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-2 max-md:gap-0">
                  <div className="flex flex-wrap gap-1.5 max-md:gap-1">
                    {item.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSizeChange(item.id, idx)}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all max-md:text-[0.5rem] max-md:px-1.5 ${
                          currentIndex === idx
                            ? "bg-mainRed text-white"
                            : "bg-background text-gray-400 hover:bg-mainRed/50 hover:text-white"
                        }`}
                      >
                        {size.key}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between max-md:justify-end px-2">
                    <span className="text-white text-lg font-bold max-md:text-[0.95rem]">
                      {item.sizes[currentIndex].price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
