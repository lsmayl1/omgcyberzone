import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import {
  LOCALES,
  OG_LOCALE,
  SITE_URL,
  absoluteUrl,
  alternatesFor,
  isLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/I18nProvider";
import { LocalBusinessJsonLd } from "@/components/seo/jsonLd";

const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  display: "swap",
});

export const generateStaticParams = () =>
  LOCALES.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.meta.home.title,
      template: `%s — ${t.meta.siteName}`,
    },
    description: t.meta.home.description,
    icons: { icon: "/logo.ico" },
    alternates: {
      canonical: absoluteUrl(locale),
      languages: alternatesFor(),
    },
    openGraph: {
      type: "website",
      siteName: t.meta.siteName,
      title: t.meta.home.title,
      description: t.meta.home.description,
      url: absoluteUrl(locale),
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE[l],
      ),
      images: [
        {
          url: "/gamerparking.webp",
          width: 1200,
          height: 630,
          alt: t.meta.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.home.title,
      description: t.meta.home.description,
      images: ["/gamerparking.webp"],
    },
  };
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale as Locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <I18nProvider locale={locale as Locale} dictionary={dictionary}>
          <LocalBusinessJsonLd locale={locale as Locale} t={dictionary} />
          <Header />
          {children}
          <Footer t={dictionary} />
        </I18nProvider>
      </body>
    </html>
  );
}
