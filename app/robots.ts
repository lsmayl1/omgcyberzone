import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL, localePath } from "@/i18n/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Placeholder pricing page, see app/[locale]/plans/page.tsx.
      // Derived from LOCALES so adding a language cannot leave it exposed.
      disallow: LOCALES.map((locale) => localePath(locale, "/plans")),
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
