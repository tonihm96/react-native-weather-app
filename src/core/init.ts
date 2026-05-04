import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Font from "expo-font";
import i18next from "i18next";
import { use } from "react";
import { initReactI18next } from "react-i18next";

import translations, { DEFAULT_NAMESPACE } from "@/i18n";
import { languageDetector } from "@/lib/language-detector";
import queryClient, {
  setupAppFocusManager,
  setupOnlineManager,
} from "@/lib/query-client";
import { loadStoredSettings } from "@/lib/settings";
import weatherQuery from "@/queries/weather";
import fonts from "@assets/fonts";

const init = async () => {
  setupOnlineManager();
  setupAppFocusManager();

  const [settings] = await Promise.all([loadStoredSettings()]);

  await Promise.all([
    Font.loadAsync({
      ...fonts,
      ...MaterialCommunityIcons.font,
    }),
    i18next.use(initReactI18next).use(languageDetector).init({
      resources: translations,
      defaultNS: DEFAULT_NAMESPACE,
      fallbackLng: settings.language,
      lng: settings.language,
    }),
    queryClient.prefetchQuery(weatherQuery()),
  ]);

  return { settings };
};

const initPromise = init();

export const useInit = () => {
  return use(initPromise);
};
