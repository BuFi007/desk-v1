import { type TranslationParams, translations } from "./translations";

type Options = {
  locale?: string;
};

const supportedLocales = ["en", "fr"];

export function getI18n({ locale = "en" }: Options) {
  // Ensure locale is supported, fallback to English if not
  const safeLocale = supportedLocales.includes(locale) ? locale : "en";

  // Get translations for the locale
  const getTranslation = (
    key: string,
    Preview: unknown,
    params?: TranslationParams
  ) => {
    const translationSet: { [key: string]: string } = Object.fromEntries(
      Object.entries(translations(safeLocale, params) || {}).map(([k, v]) => [
        k,
        v ?? "",
      ])
    );

    if (!translationSet || !(key in translationSet)) {
      return key; // Fallback to key if translation missing
    }

    return translationSet[key];
  };

  return {
    t: getTranslation,
  };
}
