import { LOCALES, SITE_URL, absoluteUrl, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const PHONE = "+994702228886";
const INSTAGRAM = "https://instagram.com/omgcyberzone";
const TELEGRAM = "https://t.me/omgcyberzone";

/**
 * LocalBusiness markup — this is what lets Google show opening hours, address,
 * phone and rating in local results for a physical venue.
 */
export const LocalBusinessJsonLd = ({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "InternetCafe",
    "@id": `${SITE_URL}/#business`,
    name: t.meta.siteName,
    description: t.meta.home.description,
    url: absoluteUrl(locale),
    telephone: PHONE,
    image: `${SITE_URL}/gamerparking.webp`,
    priceRange: "₼₼",
    currenciesAccepted: "AZN",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Azadlıq prospekti 103E",
      addressLocality: "Baku",
      addressCountry: "AZ",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [INSTAGRAM, TELEGRAM],
    availableLanguage: LOCALES.map((l) => l.toUpperCase()),
  };

  return (
    <script
      type="application/ld+json"
      // Content is a compile-time constant, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

/** FAQPage markup makes the FAQ eligible for rich results. */
export const FaqJsonLd = ({ t }: { t: Dictionary }) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

/** Menu markup for the food page. */
export const MenuJsonLd = ({
  locale,
  t,
  sections,
}: {
  locale: Locale;
  t: Dictionary;
  sections: { category: string; items: { name: string; description: string; price: string }[] }[];
}) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: t.meta.menu.title,
    url: absoluteUrl(locale, "/menu"),
    hasMenuSection: sections.map((section) => ({
      "@type": "MenuSection",
      name: section.category,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: {
          "@type": "Offer",
          price: item.price.replace(/[^\d.]/g, ""),
          priceCurrency: "AZN",
        },
      })),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
