import React from "react";

export const Gallery = () => {
  const images = [
    "/pszone2.webp",
    "/standart_3.webp",
    "/standart_2.webp",
    "/standart_4.webp",
    "/standart_room.webp",
    "/gamerparking.webp",
    "/pszone.webp",
    "/standart_5.webp",
  ];

  return (
    <div className="py-8 flex flex-col gap-8 container-custom">
      <h1 className="text-white text-center text-4xl font-semibold pb-4">
        Галерея
      </h1>
      <div className="max-w-full">
        <div className="grid grid-cols-4 gap-2 auto-rows-[200px]">
          <img
            src={images[0]}
            className="w-full h-full object-cover rounded-xl col-span-1 row-span-1"
          />

          <img
            src={images[1]}
            className="w-full h-full object-cover rounded-xl col-span-1 row-span-2"
          />

          <img
            src={images[2]}
            className="w-full h-full object-cover rounded-xl col-span-2 row-span-1"
          />

          <img
            src={images[3]}
            className="w-full h-full object-cover rounded-xl col-span-1 row-span-1"
          />

          <img
            src={images[5]}
            className="w-full h-full object-cover rounded-xl col-span-2 row-span-2"
          />

          <img
            src={images[6]}
            className="w-full h-full object-cover rounded-xl col-span-1 row-span-1"
          />

          <img
            src={images[7]}
            className="w-full h-full object-cover rounded-xl col-span-1 row-span-1"
          />
        </div>
      </div>
    </div>
  );
};
