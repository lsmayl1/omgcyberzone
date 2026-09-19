import { PriceLayout } from "@/components/ui/pricelist/priceLayout";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { absoluteUrl, alternatesFor, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * NOTE: this route still renders placeholder pricing (three identical STANDART
 * cards) and nothing links to it — the header's "Тарифы" scrolls to the Rooms
 * section on the homepage instead. Keeping it out of search results until the
 * real content lands. Delete the route if it is not going to be finished.
 */
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.meta.plans.title,
    description: t.meta.plans.description,
    // Metadata is inherited, so without this the page kept the locale
    // layout's canonical and pointed at the homepage instead of itself.
    alternates: {
      canonical: absoluteUrl(locale, "/plans"),
      languages: alternatesFor("/plans"),
    },
    robots: { index: false, follow: false },
  };
};

export default async function PlansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <div className="text-white pt-24 max-md:pt-14">
      <PriceLayout t={t} locale={locale} />
    </div>
  );
}
