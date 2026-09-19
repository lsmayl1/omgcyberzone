import { Inter } from "next/font/google";

/**
 * Shared so the locale layout and the root not-found page (which renders its
 * own <html>/<body>, outside that layout) use the same self-hosted font
 * instead of loading two copies.
 */
export const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  display: "swap",
});
