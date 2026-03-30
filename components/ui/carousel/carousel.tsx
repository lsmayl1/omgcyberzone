"use client";
import { Blob } from "buffer";
import Image from "next/image";
import React from "react";

// swiper imports – make sure `npm install swiper` is run first
import { Swiper, SwiperSlide } from "swiper/react";
type Slide = {
  src: string;
};

type CarouselProps = {
  slides: Slide[];
};

export const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  if (slides.length === 1) {
    return (
      <div className="w-full h-96 relative">
        <Image
          src={slides[0].src}
          alt="single-image"
          fill
          className="object-cover rounded-md"
        />
      </div>
    );
  }
  return (
    <div className="w-full text-white h-full ">
      <Swiper
        spaceBetween={7}
        slidesPerView={3}
        loop
        breakpoints={{
          480: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
      >
        {slides?.map((slide, i) => (
          <SwiperSlide
            key={i}
            className="flex justify-center max-h-96 h-full gap-4 "
          >
            <div className="h-96">
              <Image
                src={slide.src}
                fill
                className="object-cover rounded-xl"
                alt={`slide-${i}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
