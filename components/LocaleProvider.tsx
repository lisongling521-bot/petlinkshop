"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Locale, MessageKey, localeLabels, locales, messages } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ja");

  useEffect(() => {
    const saved = window.localStorage.getItem("petlink-locale");
    if (saved && locales.includes(saved as Locale)) {
      setLocaleState(saved as Locale);
    }
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    return {
      locale,
      setLocale(nextLocale) {
        window.localStorage.setItem("petlink-locale", nextLocale);
        setLocaleState(nextLocale);
      },
      t(key) {
        return messages[locale][key] || messages.ja[key];
      }
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}

export function T({ k }: { k: MessageKey }) {
  const { t } = useLocale();
  return <>{t(k)}</>;
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <label className="block">
      <span className="sr-only">Language</span>
      <select
        className="field h-10 min-h-10 w-28 text-xs"
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
