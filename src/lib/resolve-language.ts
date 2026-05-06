import { getLocales } from "expo-localization";

import {
  FALLBACK_LANGUAGE,
  TranslationResourcesLanguage,
  translationResources,
} from "@/i18n";
import { TranslationLanguage } from "@/stores/settings";

const availableLanguages = Object.keys(translationResources);

export const resolveLanguage = (
  language: TranslationLanguage,
): TranslationResourcesLanguage => {
  if (language !== "auto") return language;

  const [{ languageTag }] = getLocales();

  // match exato
  if (availableLanguages.includes(languageTag)) {
    return languageTag as TranslationResourcesLanguage;
  }

  // match por prefixo
  const prefix = languageTag.split("-")[0];
  const prefixMatch = availableLanguages.find((lang) =>
    lang.startsWith(prefix),
  );

  if (prefixMatch !== undefined) {
    return prefixMatch as TranslationResourcesLanguage;
  }

  return FALLBACK_LANGUAGE;
};
