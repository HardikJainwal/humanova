/**
 * i18n — Per-language JSON translation loader.
 *
 * Languages: en, ta (Tamil), te (Telugu), gu (Gujarati), mr (Marathi), si (Sinhala)
 *
 * How to add translations for a new feature:
 *   1. Add your keys to en.json under a new or existing section
 *   2. Copy the same keys to each language file and translate
 *   3. Use t("section.key") in your component — that's it
 *
 * How to add a new language:
 *   1. Create a new JSON file (e.g. hi.json) copying en.json structure
 *   2. Add the language to LANGUAGES below
 *   3. Import it in the `dictionaries` map below
 */

import en from "./en.json";
import ta from "./ta.json";
import te from "./te.json";
import gu from "./gu.json";
import mr from "./mr.json";
import si from "./si.json";

export const LANGUAGES = [
  { code: "en", label: "English",   nativeLabel: "English",   flag: "🇬🇧" },
  { code: "ta", label: "Tamil",     nativeLabel: "தமிழ்",      flag: "🇮🇳" },
  { code: "te", label: "Telugu",    nativeLabel: "తెలుగు",     flag: "🇮🇳" },
  { code: "gu", label: "Gujarati",  nativeLabel: "ગુજરાતી",    flag: "🇮🇳" },
  { code: "mr", label: "Marathi",   nativeLabel: "मराठी",      flag: "🇮🇳" },
  { code: "si", label: "Sinhala",   nativeLabel: "සිංහල",     flag: "🇱🇰" },
];

/** All dictionaries keyed by language code */
const dictionaries = { en, ta, te, gu, mr, si };

/**
 * Resolve a dotted key (e.g. "greeting.morning") from a nested dictionary.
 * Returns undefined if any segment is missing.
 */
function resolve(obj, dottedKey) {
  const segments = dottedKey.split(".");
  let current = obj;
  for (const seg of segments) {
    if (current == null || typeof current !== "object") return undefined;
    current = current[seg];
  }
  return current;
}

/**
 * Get the translation for a dotted key in a given language.
 * Falls back to English → raw key if missing.
 *
 * @param {string} lang - language code (e.g. "ta")
 * @param {string} key  - dotted key (e.g. "greeting.morning")
 * @returns {string}
 */
export function getTranslation(lang, key) {
  const dict = dictionaries[lang];
  const value = dict ? resolve(dict, key) : undefined;
  if (typeof value === "string") return value;

  // Fallback to English
  const enValue = resolve(en, key);
  if (typeof enValue === "string") return enValue;

  // Last resort: return the raw key (useful during development)
  return key;
}

/**
 * Get the full dictionary for a language.
 * Useful if a component needs to iterate over a section.
 */
export function getDictionary(lang) {
  return dictionaries[lang] || en;
}

// Default export for backward compatibility
export default dictionaries;
