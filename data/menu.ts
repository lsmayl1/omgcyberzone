import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export type Localized = Record<Locale, string>;

export type SizeUnit = "cm" | "g" | "l" | "ml" | "pcs";
export type SizeLabel = "medium" | "large";

/**
 * A size is a measurement (25 cm, 8 pcs), a named one the kitchen uses instead
 * (coffee is only ever "orta"/"böyük"), or nothing at all — a sauce or a bottle
 * of Fanta has a single price and no choice to make, and those render without a
 * size chip.
 */
export type ItemSize =
  | { amount: number; unit: SizeUnit; price: string; label?: never }
  | { label: SizeLabel; price: string; amount?: never; unit?: never }
  | { price: string; amount?: never; unit?: never; label?: never };

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
  "sandwich",
  "burger",
  "roll",
  "pasta",
  "salads",
  "soups",
  "snacks",
  "milkshake",
  "drinks",
  "coffee",
  "sauces",
] as const;

export const CATEGORY_TAB_KEYS = ["all", ...CATEGORY_KEYS] as const;

/** "" for a size that is only a price, which the card reads as "no chip". */
export const formatSize = (size: ItemSize, t: Dictionary): string => {
  if (size.label) return t.menu.sizeLabels[size.label];
  if (size.unit) return `${size.amount} ${t.menu.units[size.unit]}`;
  return "";
};

/** A lone, unlabelled price is not a choice, so the chip row is dropped. */
export const hasSizeChoice = (sizes: ItemSize[]): boolean =>
  sizes.some((size) => size.label !== undefined || size.unit !== undefined);

export const filterMenuItems = (
  items: MenuItem[],
  locale: Locale,
  category: string,
  query = "",
) => {
  const q = query.trim().toLowerCase();
  const matchingItems = items.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    if (!q) return matchesCategory;
    return (
      matchesCategory &&
      (item.name[locale].toLowerCase().includes(q) ||
        item.description[locale].toLowerCase().includes(q))
    );
  });

  if (category !== "all") return matchingItems;

  // Interleave categories so the All preview represents the whole menu
  // instead of showing only the first category's items.
  const itemsByCategory = CATEGORY_KEYS.map((key) =>
    matchingItems.filter((item) => item.category === key),
  );
  const mixedItems: MenuItem[] = [];
  const maxItems = Math.max(...itemsByCategory.map((group) => group.length), 0);
  for (let index = 0; index < maxItems; index += 1) {
    for (const group of itemsByCategory) {
      const item = group[index];
      if (item) mixedItems.push(item);
    }
  }
  return mixedItems;
};
