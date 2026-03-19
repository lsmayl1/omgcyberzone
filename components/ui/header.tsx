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
    { name: "Главная", path: "/" },
    { name: "Тарифы", path: "/plans", id: "plans" },
    { name: "Игры", path: "/games" },
    { name: "Меню", path: "/menu", id: "menu" },
    { name: "Галерея", path: "/gallery", id: "gallery" },
    { name: "FAQ", path: "/faq", id: "faq" },
    { name: "Контакты", path: "/contacts", id: "footer" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className="flex  px-54 container-custom w-full h-24  justify-between items-center overflow-hidden max-md:h-14 max-md:gap-4  ">
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
                <Link
                  href={m.path}
                  className="cursor-pointer text-white max-md:text-sm"
                  key={i}
                >
                  {m.name}
                </Link>
              ))}
            </div>
            <div className="">
              <BookButton
                title="Забронировать"
                showModal={() => setBookModal(true)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-8 font-bold items-center max-md:gap-4 max-lg:hidden ">
          {menu.map((m, i) => (
            <button
              className={`cursor-pointer text-white max-md:text-sm ${pathname === m.path ? "border-b" : ""}`}
              key={i}
              onClick={() => scrollToSection(m.id)}
            >
              {m.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
