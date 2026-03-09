import Logo from "@/assets/Logo";
import { BookButton } from "./buttons/bookButton";

export const Header = () => {
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
    <div className="flex px-8 w-full h-24 gap-8 justify-between items-center ">
      <Logo className="size-24 " />
      <div className="flex gap-8 font-bold items-center">
        {menu.map((m, i) => (
          <li className="cursor-pointer text-white" key={i}>
            {m.name}
          </li>
        ))}
      </div>
      <BookButton />
    </div>
  );
};
