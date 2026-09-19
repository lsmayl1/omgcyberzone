import Link from "next/link";
import type { Metadata } from "next";
import { inter } from "./fonts";
import Logo from "@/assets/Logo";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LABELS,
  localePath,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Root 404. This is what an unknown locale hits, because app/[locale]/layout
 * calls notFound() before it has rendered anything — so this boundary sits
 * outside that layout and there is no <html>/<body> above it (the root layout
 * is a pass-through). It has to supply both itself, or Next falls back to the
 * bare internal error shell with no styling and no way back to the site.
 *
 * No locale is known here, so the copy is in the default locale and every
 * language is offered as a link.
 */
export default async function NotFound() {
  const t = await getDictionary(DEFAULT_LOCALE);

  return (
    <html lang={DEFAULT_LOCALE}>
      <body className={inter.className}>
        <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-8 container-custom py-16 text-center">
          <Link href={localePath(DEFAULT_LOCALE)} aria-label={t.nav.toHome}>
            <Logo className="h-12 w-auto" />
          </Link>

          <p className="text-mainRed text-7xl font-black tracking-tight max-md:text-5xl">
            404
          </p>

          <div className="flex flex-col gap-3">
            <h1 className="text-white text-3xl font-bold uppercase max-md:text-xl">
              {t.notFound.title}
            </h1>
            <p className="text-gray-400 text-base max-w-lg max-md:text-sm">
              {t.notFound.lead}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              {t.notFound.chooseLanguage}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {LOCALES.map((locale) => (
                <Link
                  key={locale}
                  href={localePath(locale)}
                  hrefLang={locale}
                  className="rounded-lg bg-boxColor px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-mainRed"
                >
                  {LOCALE_LABELS[locale]}
                </Link>
              ))}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
