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
    <div className="w-full text-white ">
      <Swiper
        spaceBetween={2}
        slidesPerView={3}
        loop
        breakpoints={{
          480: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i} className="flex justify-center h-full">
            <img
              src={src}
              className="w-full h-9/12  rounded-lg max-md:h-full"
              alt={`slide-${i}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
