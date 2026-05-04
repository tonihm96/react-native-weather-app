import { getLocales } from "expo-localization";
import { LanguageDetectorModule } from "i18next";

export const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  detect: () => {
    const [{ languageTag }] = getLocales();
    return languageTag;
  },
};
