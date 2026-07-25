"use client";
import Image from "next/image";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

type Slide = {
  src: string;
  alt?: string;
};

type CarouselProps = {
  slides: Slide[];
};

// Widest breakpoint shows 1 slide per view; Swiper needs at least a couple
// more than that to loop cleanly, otherwise it warns and disables looping.
const MIN_SLIDES_FOR_LOOP = 3;

const SIZES = "(max-width: 1024px) 100vw, 50vw";

/** Fills its container — the parent decides the height. */
export const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  if (slides.length === 0) return null;

  if (slides.length === 1) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={slides[0].src}
          alt={slides[0].alt ?? ""}
          fill
          sizes={SIZES}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <Swiper
      modules={[Pagination]}
      className="w-full h-full text-white"
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={slides.length >= MIN_SLIDES_FOR_LOOP}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={`${slide.src}-${i}`}>
          <div className="relative w-full h-full">
            <Image
              src={slide.src}
              fill
              sizes={SIZES}
              className="object-cover"
              alt={slide.alt ?? ""}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
