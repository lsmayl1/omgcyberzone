"use client";
import Image from "next/image";
import React from "react";

// swiper imports – make sure `npm install swiper` is run first
import { Swiper, SwiperSlide } from "swiper/react";

export const Carousel = () => {
  const slides = [
    "/standart_carousel_1.png",
    "/standart_carousel_2.png",
    "/standart_carousel_3.png",
    "/standart_carousel_1.png",
    "/standart_carousel_2.png",
    "/standart_carousel_3.png",
    "/standart_carousel_1.png",
    "/standart_carousel_2.png",
    "/standart_carousel_3.png",
  ];

  return (
    <div className="w-full text-white max-md:hidden">
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        loop
        breakpoints={{
          480: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i} className="flex justify-center gap-2 px-1">
            <img
              src={src}
              className="w-full h-9/12 rounded-lg"
              alt={`slide-${i}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
