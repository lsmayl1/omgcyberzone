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
    <div
      id="gallery"
      className="py-16 scroll-mt-20 flex flex-col gap-8 container-custom border-b border-mainRed"
    >
      <h1 className="text-white text-4xl font-bold max-md:text-xl mb-4 max-md:mb-2 uppercase border-l-4 border-mainRed pl-4  ">
        Галерея
      </h1>
      <div className="max-w-full">
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-2 auto-rows-[200px]">
          <img
            src={images[0]}
            className="w-full h-full object-cover rounded-xl col-span-1 row-span-1 max-md:row-span-2 transition-transform duration-300 hover:scale-120"
          />

          <img
            src={images[1]}
            className="w-full h-full object-cover rounded-xl col-span-1 row-span-2 transition-transform duration-300 hover:scale-120"
          />

          <img
            src={images[2]}
            className="w-full h-full object-cover rounded-xl col-span-2 row-span-1 transition-transform duration-300 hover:scale-120 "
          />

          <img
            src={images[3]}
            className="w-full h-full object-cover rounded-xl col-span-1 row-span-1 max-md:col-span-2 transition-transform duration-300 hover:scale-120"
          />

          <img
            src={images[5]}
            className="w-full h-full object-cover rounded-xl col-span-2 row-span-2 transition-transform duration-300 hover:scale-120"
          />

          <img
            src={images[6]}
            className="w-full h-full object-cover rounded-xl col-span-1 row-span-1 transition-transform duration-300 hover:scale-120"
          />

          <img
            src={images[7]}
            className="w-full h-full object-cover rounded-xl col-span-1 row-span-1 transition-transform duration-300 hover:scale-120  "
          />
        </div>
      </div>
    </div>
  );
};
