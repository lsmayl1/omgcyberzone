"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LOCALES,
  LOCALE_LABELS,
  LOCALE_SHORT,
  isLocale,
  type Locale,
} from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

/** Strips the leading locale segment so we can re-prefix with another one. */
export const pathWithoutLocale = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) segments.shift();
  return segments.length ? `/${segments.join("/")}` : "";
};

export const LanguageSwitcher = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const rest = pathWithoutLocale(pathname);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.nav.language}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 text-white font-semibold px-3 py-2 rounded-lg bg-boxColor hover:bg-mainRed transition-colors max-md:text-sm"
      >
        {LOCALE_SHORT[locale]}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 z-50 min-w-40 rounded-lg bg-boxColor p-1 shadow-lg shadow-black/40"
        >
          {LOCALES.map((l: Locale) => (
            <Link
              key={l}
              href={`/${l}${rest}`}
              hrefLang={l}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className={`block rounded-md px-3 py-2 text-sm text-white transition-colors ${
                l === locale ? "bg-mainRed" : "hover:bg-mainRed/60"
              }`}
            >
              {LOCALE_LABELS[l]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
