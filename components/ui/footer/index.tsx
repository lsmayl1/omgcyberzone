import Instagram from "@/assets/Instagram";
import Phone from "@/assets/Phone";
import { Telegram } from "@/assets/Telegram";
import React from "react";
import type { Dictionary } from "@/i18n/types";

const PHONE = "+994 70 222 88 86";
const HANDLE = "omgcyberzone";
/**
 * Name + address, not coordinates: Google resolves this to the business
 * listing, so the pin stays right if the venue is ever re-registered. Kept
 * out of the dictionaries on purpose — the query must not change per locale
 * or the four language versions would pin four different searches.
 */
const MAP_QUERY = "OMG Cyber Zone, Azadlıq prospekti 103E, Baku";

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
        <div className="flex-1 flex flex-col gap-3">
          {/*
            A real map instead of footer_map.png: the old static image could
            not be panned, zoomed or tapped for directions, which is the only
            thing most phone visitors want from it.

            loading="lazy" matters here — the footer is below the fold on
            every page, and this iframe pulls in Google's whole map bundle.
            The embed is the keyless ?output=embed form, so there is no API
            key to leak or rotate.
          */}
          <iframe
            title={t.footer.mapAlt}
            src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=17&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[356px] max-md:h-64 rounded-4xl border-0"
          />
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 self-end rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            {t.footer.directions}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8m9 0v9" />
            </svg>
          </a>
        </div>
      </div>
      <p className="text-center text-white uppercase pb-4">
        {t.footer.copyright}
      </p>
    </footer>
  );
};
