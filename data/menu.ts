import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export type Localized = Record<Locale, string>;

export type SizeUnit = "cm" | "g" | "l" | "ml" | "pcs";
export type SizeLabel = "standard" | "double" | "premium";

export type ItemSize =
  | { amount: number; unit: SizeUnit; price: string; label?: never }
  | { label: SizeLabel; price: string; amount?: never; unit?: never };

export interface MenuItem {
  id: number;
  category: string;
  image: string;
  selectedSizeIndex: number;
  name: Localized;
  description: Localized;
  sizes: ItemSize[];
  isPopular?: boolean;
  isSpicy?: boolean;
}

/** Category keys in display order; labels come from the dictionary. */
export const CATEGORY_KEYS = [
  "pizza",
  "burger",
  "roll",
  "sandwich",
  "pasta",
  "salads",
  "snacks",
  "sweets",
  "drinks",
  "coffee",
  "kalyan",
] as const;

export const CATEGORY_ICONS: Record<string, string> = {
  pizza: "/icons/menu/Pizza.png",
  burger: "/icons/menu/Burger.png",
  roll: "/icons/menu/Roll.png",
  sandwich: "/icons/menu/Sandwich.png",
  pasta: "/icons/menu/Pasta.png",
  salads: "/icons/menu/Salad.png",
  snacks: "/icons/menu/Snacks.png",
  sweets: "/icons/menu/Sweets.png",
  drinks: "/icons/menu/Drinks.png",
  coffee: "/icons/menu/Coffee.png",
  kalyan: "/icons/menu/Kalyan.png",
};

export const CATEGORY_TAB_KEYS = ["all", ...CATEGORY_KEYS] as const;

export const formatSize = (size: ItemSize, t: Dictionary): string =>
  size.label
    ? t.menu.sizeLabels[size.label]
    : `${size.amount} ${t.menu.units[size.unit]}`;

export const filterMenuItems = (
  items: MenuItem[],
  locale: Locale,
  category: string,
  query = "",
) => {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    if (!q) return matchesCategory;
    return (
      matchesCategory &&
      (item.name[locale].toLowerCase().includes(q) ||
        item.description[locale].toLowerCase().includes(q))
    );
  });
};
