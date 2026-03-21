"use client";
import Logo from "@/assets/Logo";
import { BookButton } from "./buttons/bookButton";
import { useState } from "react";
import { HamburgerMenu } from "@/assets/hamburger-menu";
import { BookModal } from "./bookModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const Header = () => {
  const pathname = usePathname();
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const menu = [
    { name: "Главная", path: "/", id: "main" },
    { name: "Тарифы", path: "/plans", id: "plans" },
    { name: "Игры", path: "/games", id: "games" },
    { name: "Меню", path: "/menu", id: "menu" },
    { name: "Галерея", path: "/gallery", id: "gallery" },
    { name: "FAQ", path: "/faq", id: "faq" },
    { name: "Контакты", path: "/contacts", id: "footer" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className="flex fixed  bg-foreground z-40  w-full h-24  justify-between items-center  max-md:h-14 max-md:gap-4  ">
      <div className="flex  container-custom bg-foreground z-40  w-full   justify-between items-center overflow-hidden max-md:gap-4">
        <BookModal open={bookModal} handleClose={() => setBookModal(false)} />
        <Logo
          className="size-24 max-md:w-22 h-12 cursor-pointer"
          onClick={() => scrollToSection("main")}
        />
        <HamburgerMenu
          className="size-10 text-white rotate-180 lg:hidden"
          onClick={() => setHamburgerMenu(true)}
        />

        {hamburgerMenu ? (
          <div className="absolute w-screen h-screen  z-50 left-0 top-0 ">
            <div className=" bg-boxColor gap-8  h-full p-8 flex  flex-col w-full ">
              <div className="flex justify-between items-center">
                <Logo
                  className="size-24 max-md:w-22 h-12 cursor-pointer"
                  onClick={() => scrollToSection("main")}
                />
                <HamburgerMenu
                  className="size-10 text-white rotate-180 "
                  onClick={() => setHamburgerMenu(false)}
                />
              </div>
              <div className="flex flex-col gap-12 font-bold max-md:gap-12 ">
                {menu.map((m, i) => (
                  <Link
                    href={m.path}
                    className="cursor-pointer text-white max-md:text-lg"
                    key={i}
                  >
                    {m.name}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setBookModal(true)}
                className="bg-mainRed w-fit text-lg   px-8 py-4 rounded-xl font-semibold cursor-pointer max-md:text-sm max-md:px-4 max-md:py-1 text-white uppercase text-nowrap max-md:rounded-sm"
              >
                Забронировать
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-12 items-center max-lg:hidden ">
            <div className="flex gap-8 font-bold items-center max-md:gap-4  ">
              {menu.map((m, i) => (
                <button
                  className={`cursor-pointer text-white max-md:text-sm ${pathname === m.path ? "border-b" : ""}`}
                  key={i}
                  onClick={() => scrollToSection(m?.id)}
                >
                  {m.name}
                </button>
              ))}
            </div>
            <div className="">
              <button
                onClick={() => setBookModal(true)}
                className="bg-mainRed p-2 rounded-lg text-white font-semibold px-4"
              >
                Забронировать
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
