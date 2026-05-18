import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Font from "expo-font";
import i18next from "i18next";
import { use } from "react";
import { initReactI18next } from "react-i18next";

import {
  DEFAULT_NAMESPACE,
  FALLBACK_LANGUAGE,
  translationResources,
} from "@/i18n";
import {
  setupQueryClientFocusManager,
  setupQueryClientOnlineManager,
} from "@/lib/query-client";
import { resolveLanguage } from "@/lib/resolve-language";
import { hydrateSettingsStore } from "@/stores/settings";
import fonts from "@assets/fonts";

const init = async () => {
  setupQueryClientOnlineManager();
  setupQueryClientFocusManager();

  const [settings] = await Promise.all([hydrateSettingsStore()]);

  await Promise.all([
    Font.loadAsync({
      ...fonts,
      ...MaterialCommunityIcons.font,
    }),
    i18next.use(initReactI18next).init({
      resources: translationResources,
      defaultNS: DEFAULT_NAMESPACE,
      fallbackLng: FALLBACK_LANGUAGE,
      lng: resolveLanguage(settings.language),
      // apenas para poder escrever em linguagem natural até traduzir tudo depois
      keySeparator: false,
      nsSeparator: false,
    }),
    // queryClient.prefetchQuery(weatherQueries.forecast()),
  ]);
};

const initPromise = init();

export const useInit = () => {
  return use(initPromise);
};
