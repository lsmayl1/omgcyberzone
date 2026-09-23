import Instagram from "@/assets/Instagram";
import Logo from "@/assets/Logo";
import Phone from "@/assets/Phone";
import { Telegram } from "@/assets/Telegram";
import WhatsApp from "@/assets/WhatsApp";
import Link from "next/link";
import React from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const PHONE = "+994 70 222 88 86";
const HANDLE = "omgcyberzone";
/** wa.me wants the number bare: no plus, no spaces. */
const WHATSAPP = PHONE.replace(/\D/g, "");
/**
 * Name + address, not coordinates: Google resolves this to the business
 * listing, so the pin stays right if the venue is ever re-registered. Kept
 * out of the dictionaries on purpose — the query must not change per locale
 * or the four language versions would pin four different searches.
 */
const MAP_QUERY = "OMG Cyber Zone, Azadlıq prospekti 103E, Baku";

export const Footer = ({ t, locale }: { t: Dictionary; locale: Locale }) => {
  const home = `/${locale}`;

  /** Mirrors the header, minus Home — the logo above already goes there. */
  const sections = [
    { label: t.nav.plans, href: `${home}#plans` },
    { label: t.nav.games, href: `${home}#games` },
    { label: t.nav.menu, href: `${home}/menu` },
    { label: t.nav.gallery, href: `${home}#gallery` },
    { label: t.nav.faq, href: `${home}#faq` },
  ];

  const contacts = [
    {
      key: "phone",
      icon: <Phone className="size-5" />,
      label: t.footer.phone,
      value: PHONE,
      href: `tel:${PHONE.replace(/\s/g, "")}`,
      external: false,
    },
    {
      key: "whatsapp",
      icon: <WhatsApp className="size-5" />,
      label: t.footer.whatsapp,
      value: PHONE,
      href: `https://wa.me/${WHATSAPP}`,
      external: true,
    },
    {
      key: "instagram",
      icon: <Instagram className="size-5" />,
      label: t.footer.instagram,
      value: `@${HANDLE}`,
      href: `https://instagram.com/${HANDLE}`,
      external: true,
    },
    {
      key: "telegram",
      icon: <Telegram className="size-5" />,
      label: t.footer.telegram,
      value: `@${HANDLE}`,
      href: `https://t.me/${HANDLE}`,
      external: true,
    },
  ];

  return (
    <footer id="footer" className="w-full scroll-mt-20 bg-boxColor">
      <div className="container-custom">
        {/*
          Four bands on a phone, three columns and the map beside them from lg.
          The address used to be a 4xl headline with nothing else around it,
          which gave the footer a heading but no way to get anywhere.
        */}
        <div className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link href={home} aria-label={t.nav.toHome} className="w-fit">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              {t.footer.hours}
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              {t.footer.address}
            </p>
          </div>

          <nav
            aria-label={t.footer.navTitle}
            className="flex flex-col gap-3 lg:col-span-2"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              {t.footer.navTitle}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {sections.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              {t.nav.contacts}
            </h2>
            <address className="flex flex-col gap-3 not-italic">
              {contacts.map((c) => (
                <a
                  key={c.key}
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-3"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-gray-300 transition-colors group-hover:bg-mainRed group-hover:text-white">
                    {c.icon}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500">{c.label}</span>
                    <span className="truncate text-sm text-gray-200 transition-colors group-hover:text-white">
                      {c.value}
                    </span>
                  </span>
                </a>
              ))}
            </address>

            {/* The one action in the footer, and the one people actually take:
                booking happens over WhatsApp. */}
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-mainRed px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mainRed/85"
            >
              <WhatsApp className="size-4" />
              {t.footer.writeUs}
            </a>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-3">
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
              className="h-56 w-full rounded-2xl border-0 lg:h-full lg:min-h-[14rem]"
            />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H8m9 0v9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="container-custom py-5 text-center text-xs uppercase tracking-wider text-gray-500">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
};
