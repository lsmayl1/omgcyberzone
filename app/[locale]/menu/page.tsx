import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuPageContent } from "@/components/ui/menusection/menuPageContent";
import { MenuJsonLd } from "@/components/seo/jsonLd";
import menuData from "@/data/menu-items.json";
import { CATEGORY_KEYS, type MenuItem } from "@/data/menu";
import { absoluteUrl, alternatesFor, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const menuItems = menuData as MenuItem[];

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);

  return {
    title: t.meta.menu.title,
    description: t.meta.menu.description,
    alternates: {
      canonical: absoluteUrl(locale, "/menu"),
      languages: alternatesFor("/menu"),
    },
    openGraph: {
      title: t.meta.menu.title,
      description: t.meta.menu.description,
      url: absoluteUrl(locale, "/menu"),
    },
  };
};

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  const sections = CATEGORY_KEYS.map((key) => ({
    category: t.menu.categories[key],
    items: menuItems
      .filter((item) => item.category === key)
      .map((item) => ({
        name: item.name[locale],
        description: item.description[locale],
        price: item.sizes[0]?.price ?? "",
      })),
  })).filter((section) => section.items.length > 0);

  return (
    <>
      <MenuJsonLd locale={locale} t={t} sections={sections} />
      <MenuPageContent />
    </>
  );
}
