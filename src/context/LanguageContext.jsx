"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import translations from "@/lib/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [translatedNames, setTranslatedNames] = useState({});

  /* Rehydrate from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("hm_lang");
    if (stored) setLang(stored);
  }, []);

  /* Persist changes */
  const changeLang = useCallback((newLang) => {
    setLang(newLang);
    localStorage.setItem("hm_lang", newLang);
    // Clear cached name translations when language changes
    setTranslatedNames({});
  }, []);

  /**
   * t(key) — look up static translation.
   * Falls back to English if key/lang missing.
   */
  const t = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return key; // dev fallback — shows raw key
      return entry[lang] ?? entry.en ?? key;
    },
    [lang]
  );

  /**
   * translateName(name) — transliterate a name to current script.
   * Returns cached value or fetches from /api/translate.
   * Returns original name while loading.
   */
  const translateName = useCallback(
    async (name) => {
      if (!name || lang === "en") return name;

      const cacheKey = `${lang}:${name}`;
      if (translatedNames[cacheKey]) return translatedNames[cacheKey];

      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: name, targetLang: lang }),
        });
        const data = await res.json();
        const translated = data.translated || name;

        setTranslatedNames((prev) => ({ ...prev, [cacheKey]: translated }));
        return translated;
      } catch {
        return name;
      }
    },
    [lang, translatedNames]
  );

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t, translateName }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
