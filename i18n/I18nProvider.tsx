"use client";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary, PluralForms } from "./types";
import { plural } from "./format";

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  plural: (forms: PluralForms, n: number) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Most of this site's components are client components, so the dictionary for
 * the active locale is handed down once from the locale layout instead of
 * being threaded through every prop.
 */
export const I18nProvider = ({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) => {
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: dictionary,
      plural: (forms, n) => plural(locale, forms, n),
    }),
    [locale, dictionary],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
};
