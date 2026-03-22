"use client";
import React, { useState } from "react";

export const Games = () => {
  const gamelist = {
    pc: [
      { name: "csgo2", img: "/games/csgo2.jpg" },
      { name: "pubg", img: "/games/pubg.jpg" },
      { name: "dota2", img: "/games/dota2.jpg" },
      { name: "apex", img: "/games/apexLegends.jpg" },
      { name: "gta5", img: "/games/gta5.jpg" },
      { name: "rust", img: "/games/rust.jpg" },

      { name: "arcRaiders", img: "/games/arcRaiders.jpg" },
      { name: "battlefield6", img: "/games/battlefield6.jpg" },
      { name: "callofdutyblackops7", img: "/games/callofdutyblackops7.jpg" },
      {
        name: "callofdutymodernwarfare",
        img: "/games/callofdutymodernwarfare.jpg",
      },
      { name: "cyberpunk", img: "/games/cyberpunk.jpg" },
      { name: "forzahorizon5", img: "/games/forzahorizon5.jpg" },
      { name: "rdr2", img: "/games/rdr2.jpg" },
      { name: "rivals", img: "/games/rivals.jpg" },
      { name: "rust", img: "/games/sonsoftheforest.jpg" },
      { name: "warthunder", img: "/games/warthunder.jpg" },
    ],
    ps: [],
  };
  const [selectedDevice, setSelectedDevice] = useState("pc");

  return (
    <div
      id="games"
      className="flex scroll-mt-20 flex-col py-16 border-b border-mainRed container-custom gap-8 "
    >
      <div className="flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold max-md:text-xl mb-4 max-md:mb-2 text-center border-l-4 border-mainRed pl-4 uppercase ">
          Игры
        </h1>
        <div className="flex gap-2 justify-between w-1/4 overflow-auto pb-2 ">
          <button
            onClick={() => setSelectedDevice("pc")}
            className={`text-white text-xl font-semibold text-nowrap max-xl:text-sm py-2 px-4 rounded-lg w-full ${selectedDevice === "pc" ? "bg-mainRed" : "bg-boxColor"}  `}
          >
            PC
          </button>
          <button
            onClick={() => setSelectedDevice("ps")}
            className={`text-white text-xl font-semibold text-nowrap max-xl:text-sm py-2 px-4 rounded-lg w-full ${selectedDevice === "ps" ? "bg-mainRed" : "bg-boxColor"} `}
          >
            PS
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {gamelist.pc.map((gm, i) => (
          <div key={i}>
            <img
              src={gm.img}
              alt=""
              className="transition-transform duration-300 hover:scale-120 cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button className="rounded-xl text-white bg-mainRed font-bold w-fit px-4 py-2 text-xl mt-4 max-md:text-flg">
          Смотреть ещё
        </button>
      </div>
    </div>
  );
};
