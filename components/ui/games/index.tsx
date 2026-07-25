"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type Game = { name: string; title: string; img: string };
type Device = "pc" | "ps";

// Titles are proper nouns and stay untranslated across locales.
const GAMES: Record<Device, Game[]> = {
  pc: [
    { name: "csgo2", title: "Counter-Strike 2", img: "/games/csgo2.jpg" },
    { name: "pubg", title: "PUBG: Battlegrounds", img: "/games/pubg.jpg" },
    { name: "dota2", title: "Dota 2", img: "/games/dota2.jpg" },
    { name: "apex", title: "Apex Legends", img: "/games/apexLegends.jpg" },
    { name: "gta5", title: "GTA V", img: "/games/gta5.jpg" },
    { name: "rust", title: "Rust", img: "/games/rust.jpg" },
    { name: "arcRaiders", title: "ARC Raiders", img: "/games/arcRaiders.jpg" },
    {
      name: "battlefield6",
      title: "Battlefield 6",
      img: "/games/battlefield6.jpg",
    },
    {
      name: "callofdutyblackops7",
      title: "Call of Duty: Black Ops 7",
      img: "/games/callofdutyblackops7.jpg",
    },
    {
      name: "callofdutymodernwarfare",
      title: "Call of Duty: Modern Warfare",
      img: "/games/callofdutymodernwarfare.jpg",
    },
    { name: "cyberpunk", title: "Cyberpunk 2077", img: "/games/cyberpunk.jpg" },
    {
      name: "forzahorizon5",
      title: "Forza Horizon 5",
      img: "/games/forzahorizon5.jpg",
    },
    { name: "rdr2", title: "Red Dead Redemption 2", img: "/games/rdr2.jpg" },
    { name: "rivals", title: "Marvel Rivals", img: "/games/rivals.jpg" },
    {
      name: "sonsoftheforest",
      title: "Sons of the Forest",
      img: "/games/sonsoftheforest.jpg",
    },
    { name: "warthunder", title: "War Thunder", img: "/games/warthunder.jpg" },
  ],
  ps: [],
};

export const Games = () => {
  const { t } = useI18n();
  const [selectedDevice, setSelectedDevice] = useState<Device>("pc");
  const games = GAMES[selectedDevice];

  const devices: { key: Device; label: string }[] = [
    { key: "pc", label: t.games.pc },
    { key: "ps", label: t.games.ps },
  ];

  return (
    <div
      id="games"
      className="flex scroll-mt-28 max-md:scroll-mt-20 flex-col py-16 border-b border-mainRed container-custom gap-8 "
    >
      <div className="flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:items-start">
        <h2 className="text-white text-4xl font-bold max-md:text-xl mb-4 max-md:mb-2 text-center border-l-4 border-mainRed pl-4 uppercase ">
          {t.games.heading}
        </h2>
        <div className="flex justify-between w-1/4 max-md:w-full p-2 rounded-lg bg-boxColor  ">
          {devices.map((device) => (
            <button
              key={device.key}
              onClick={() => setSelectedDevice(device.key)}
              aria-pressed={selectedDevice === device.key}
              className={`text-white text-xl font-semibold text-nowrap max-xl:text-sm py-2 px-4 rounded-lg w-full transition-colors ${
                selectedDevice === device.key ? "bg-mainRed" : "bg-boxColor"
              }`}
            >
              {device.label}
            </button>
          ))}
        </div>
      </div>

      {games.length > 0 ? (
        <div className="grid grid-cols-4 gap-2 max-md:gap-1 max-md:grid-cols-2">
          {games.map((gm) => (
            <div
              key={gm.name}
              className="overflow-hidden rounded-lg max-md:rounded"
            >
              <Image
                src={gm.img}
                alt={gm.title}
                width={460}
                height={215}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-boxColor rounded-xl">
          <p className="text-gray-400 text-lg max-md:text-base text-center px-4">
            {t.games.emptyTitle}
          </p>
          <p className="text-gray-500 text-sm mt-1 max-md:text-xs text-center px-4">
            {t.games.emptyHint}
          </p>
        </div>
      )}

      {games.length > 0 && (
        <div className="flex items-center justify-center">
          <button className="rounded-xl text-white bg-mainRed font-bold w-fit px-4 py-2 text-md mt-4 max-md:text-flg">
            {t.games.more}
          </button>
        </div>
      )}
    </div>
  );
};
