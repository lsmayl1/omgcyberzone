import {
  Beef,
  Candy,
  Citrus,
  Coffee,
  CupSoda,
  Droplet,
  Flame,
  GlassWater,
  IceCreamBowl,
  Leaf,
  Pizza,
  Salad,
  Sandwich,
  Utensils,
  type LucideIcon,
} from "lucide-react";

/**
 * One glyph per category, shared by the tab strip and by cards that have no
 * photograph — 59 of the 117 items on menu-in.com ship only the restaurant's
 * logo, so those fall back to this rather than showing the same logo 59 times.
 */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  all: Utensils,
  pizza: Pizza,
  sandwich: Sandwich,
  burger: Beef,
  roll: Sandwich,
  pasta: Utensils,
  salads: Salad,
  snacks: Utensils,
  sauces: Droplet,
  sweets: Candy,
  milkshake: IceCreamBowl,
  lemonade: GlassWater,
  fresh: Citrus,
  drinks: CupSoda,
  coffee: Coffee,
  tea: Leaf,
  hookah: Flame,
};
