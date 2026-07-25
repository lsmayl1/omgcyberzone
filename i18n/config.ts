export const LOCALES = ["ru", "en", "az", "tr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

/** Native name, shown in the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  az: "Azərbaycan",
  tr: "Türkçe",
};

/** Two-letter code shown in the collapsed switcher. */
export const LOCALE_SHORT: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  az: "AZ",
  tr: "TR",
};

/** og:locale needs the full IETF-ish form. */
export const OG_LOCALE: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  az: "az_AZ",
  tr: "tr_TR",
};

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/**
 * Absolute origin, required for canonical URLs, og:url, hreflang and the
 * sitemap — relative paths are ignored by crawlers for all of those.
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Every localised route, without the locale prefix. */
export const ROUTES = ["", "/menu"] as const;

export const localePath = (locale: Locale, path = "") => `/${locale}${path}`;

export const absoluteUrl = (locale: Locale, path = "") =>
  `${SITE_URL}${localePath(locale, path)}`;

/** hreflang map for a given route, including x-default. */
export const alternatesFor = (path = "") => {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) languages[locale] = absoluteUrl(locale, path);
  languages["x-default"] = absoluteUrl(DEFAULT_LOCALE, path);
  return languages;
};
