import type { MetadataRoute } from "next";
import { LOCALES, ROUTES, absoluteUrl, alternatesFor } from "@/i18n/config";

/**
 * One entry per locale × route, each carrying the full hreflang set so
 * crawlers can see the translations belong together. /plans is deliberately
 * excluded — it is noindex placeholder content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: absoluteUrl(locale, route),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: { languages: alternatesFor(route) },
    })),
  );
}
