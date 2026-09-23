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
  /** null where menu-in.com has no photograph; the card shows an icon. */
  image: string | null;
  selectedSizeIndex: number;
  name: Localized;
  description: Localized;
  sizes: ItemSize[];
  isPopular?: boolean;
  isSpicy?: boolean;
}

/** Category keys in display order; labels come from the dictionary. */
// Food first, then sweets, then everything you drink. Mirrors the order
// menu-in.com lists them in, with its 18 sections folded into these 16
// (its two sandwich sections and its Juice section have no separate identity
// here).
export const CATEGORY_KEYS = [
  "pizza",
  "sandwich",
  "burger",
  "roll",
  "pasta",
  "salads",
  "snacks",
  "sauces",
  "sweets",
  "milkshake",
  "lemonade",
  "fresh",
  "drinks",
  "coffee",
  "tea",
  "hookah",
] as const;

export const CATEGORY_TAB_KEYS = ["all", ...CATEGORY_KEYS] as const;

/**
 * Categories that always render a glyph, whatever the data says. The bottle
 * shots are stock product images rather than pictures of the club. Kept here
 * rather than in the card because it decides what the All tab shows, not
 * just how a card looks.
 */
export const ICON_CATEGORIES = new Set(["drinks"]);

/** True when the card will show a photograph rather than a glyph. */
export const hasPhoto = (item: MenuItem): boolean =>
  Boolean(item.image) && !ICON_CATEGORIES.has(item.category);

/**
 * What leads the All tab. The kitchen's own draw is pizza first, then
 * burgers and sandwiches; everything else follows.
 */
const PRIORITY_CATEGORIES = ["pizza", "burger", "sandwich"] as const;

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

  // The All tab is the shop window, so it shows only dishes there is a
  // photograph of. A search still sees everything — turning up nothing for
  // a drink someone typed in would just look broken.
  const browsing = q ? matchingItems : matchingItems.filter(hasPhoto);

  // Round-robin within a group so one category cannot fill the first
  // screenful, and the priority group runs out before the rest begin.
  const interleave = (keys: readonly string[]) => {
    const groups = keys.map((key) =>
      browsing.filter((item) => item.category === key),
    );
    const out: MenuItem[] = [];
    const longest = Math.max(...groups.map((g) => g.length), 0);
    for (let index = 0; index < longest; index += 1) {
      for (const group of groups) {
        const item = group[index];
        if (item) out.push(item);
      }
    }
    return out;
  };

  const rest = CATEGORY_KEYS.filter(
    (key) => !PRIORITY_CATEGORIES.includes(key as (typeof PRIORITY_CATEGORIES)[number]),
  );
  return [...interleave(PRIORITY_CATEGORIES), ...interleave(rest)];
};
