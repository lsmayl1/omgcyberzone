import Instagram from "@/assets/Instagram";
import Phone from "@/assets/Phone";
import { Telegram } from "@/assets/Telegram";
import Image from "next/image";
import React from "react";
import type { Dictionary } from "@/i18n/types";

const PHONE = "+994 70 222 88 86";
const HANDLE = "omgcyberzone";

export const Footer = ({ t }: { t: Dictionary }) => {
  const contacts = [
    {
      key: "phone",
      icon: <Phone />,
      label: t.footer.phone,
      value: PHONE,
      href: `tel:${PHONE.replace(/\s/g, "")}`,
      external: false,
    },
    {
      key: "instagram",
      icon: <Instagram />,
      label: t.footer.instagram,
      value: `@${HANDLE}`,
      href: `https://instagram.com/${HANDLE}`,
      external: true,
    },
    {
      key: "telegram",
      icon: <Telegram className="size-8 text-white" />,
      label: t.footer.telegram,
      value: `@${HANDLE}`,
      href: `https://t.me/${HANDLE}`,
      external: true,
    },
  ];

  return (
    <footer id="footer" className="w-full flex-col gap-8   pt-8 bg-boxColor">
      <div className="flex gap-2 py-8 max-md:flex-col-reverse container-custom">
        <div className="flex-1  rounded-[60px] max-md:rounded-2xl flex gap-12 flex-col p-8">
          <h2 className="capitalize text-white font-bold text-4xl max-md:text-2xl">
            {t.footer.address}
          </h2>
          <address className="flex flex-col gap-8 not-italic">
            {contacts.map((c) => (
              <a
                key={c.key}
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex items-center gap-4"
              >
                {c.icon}
                <span className="flex flex-col ">
                  <span className="text-white">{c.label}</span>
                  <span className="text-[#66676D]">{c.value}</span>
                </span>
              </a>
            ))}
          </address>
        </div>
        <div className="flex-1 overflow-hidden rounded-4xl">
          <Image
            src="/footer_map.png"
            alt={t.footer.mapAlt}
            width={650}
            height={356}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-auto rounded-4xl transition-transform duration-300 hover:scale-120"
          />
        </div>
      </div>
      <p className="text-center text-white uppercase pb-4">
        {t.footer.copyright}
      </p>
    </footer>
  );
};
