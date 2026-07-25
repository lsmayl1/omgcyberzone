import type { Locale } from "./config";
import type { Dictionary } from "./types";

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  ru: () => import("./dictionaries/ru.json"),
  en: () => import("./dictionaries/en.json"),
  az: () => import("./dictionaries/az.json"),
  tr: () => import("./dictionaries/tr.json"),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  (await loaders[locale]()).default;
