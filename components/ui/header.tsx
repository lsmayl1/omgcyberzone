"use client";
import Logo from "@/assets/Logo";
import { BookButton } from "./buttons/bookButton";
import { useState } from "react";
import { HamburgerMenu } from "@/assets/hamburger-menu";
import { BookModal } from "./bookModal";

export const Header = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const menu = [
    { name: "Главная", path: "/" },
    { name: "Тарифы", path: "/plan" },
    { name: "Игры", path: "/games" },
    { name: "Интерьер", path: "/interier" },
    { name: "Меню", path: "/menu" },
    { name: "Галерея", path: "/gallery" },
    { name: "Контакты", path: "/contacts" },
  ];
  return (
    <div className="flex px-54 container-custom w-full h-24  justify-between items-center overflow-hidden max-md:h-14 max-md:gap-4  ">
      <BookModal open={bookModal} handleClose={() => setBookModal(false)} />
      <Logo className="size-24 max-md:w-22 h-12 " />
      <HamburgerMenu
        className="size-8 text-white rotate-180 lg:hidden"
        onClick={() => setHamburgerMenu(true)}
      />

      {hamburgerMenu ? (
        <div className="absolute w-full h-full  z-45 left-0 top-0 ">
          <div className=" bg-boxColor  h-full p-4 flex  flex-col w-full ">
            <div className="flex justify-end">
              <HamburgerMenu
                className="size-8 text-white rotate-180 "
                onClick={() => setHamburgerMenu(false)}
              />
            </div>

            <div className="flex flex-col gap-8 font-bold items-center max-md:gap-4 ">
              {menu.map((m, i) => (
                <li
                  className="cursor-pointer text-white max-md:text-sm"
                  key={i}
                >
                  {m.name}
                </li>
              ))}
            </div>
            <div className="">
              <BookButton showModal={() => setBookModal(true)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-8 font-bold items-center max-md:gap-4 max-lg:hidden ">
          {menu.map((m, i) => (
            <li className="cursor-pointer text-white max-md:text-sm" key={i}>
              {m.name}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
