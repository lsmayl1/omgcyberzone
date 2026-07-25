import type { Locale } from "./config";
import type { PluralForms } from "./types";

/**
 * Picks the right plural form for `n` using CLDR rules for the locale, then
 * substitutes {n}. Russian needs one/few/many, English one/other, Azerbaijani
 * and Turkish only ever use other — each dictionary supplies what it needs and
 * we fall back to `other` when a category is absent.
 */
export const plural = (
  locale: Locale,
  forms: PluralForms,
  n: number,
): string => {
  const category = new Intl.PluralRules(locale).select(n);
  const template = forms[category] ?? forms.other ?? "";
  return template.replace("{n}", String(n));
};
