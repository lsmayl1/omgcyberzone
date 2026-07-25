import type ru from "./dictionaries/ru.json";

/**
 * The Russian dictionary is the source of truth for the shape. Every other
 * locale file is checked against it by `npm run check:i18n`.
 *
 * Plural groups are widened to a partial record because languages differ in
 * which CLDR categories they use (ru has one/few/many, tr only has other).
 */
export type PluralForms = Partial<
  Record<"zero" | "one" | "two" | "few" | "many" | "other", string>
>;

type WidenPlurals<T> = T extends { other: string }
  ? PluralForms
  : T extends object
    ? { [K in keyof T]: WidenPlurals<T[K]> }
    : T;

export type Dictionary = WidenPlurals<typeof ru>;
