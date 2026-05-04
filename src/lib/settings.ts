import AsyncStorage from "@react-native-async-storage/async-storage";

import { TranslationLanguage } from "@/i18n";
import { FontFamily } from "@assets/fonts";

export interface Settings {
  themeMode: ThemeMode;
  language: TranslationLanguage;
  // sendCrashReports: boolean;
  // sendUsageData: boolean;
  fontFamily: FontFamily;
}

export const SETTINGS_STORAGE_KEY = "SETTINGS_STORAGE_KEY" as const;

export const DEFAULT_SETTINGS: Settings = Object.freeze({
  themeMode: "auto",
  language: "pt-BR",
  // sendCrashReports: true,
  // sendUsageData: false,
  fontFamily: "DMSans",
} as const satisfies Settings);

export const loadStoredSettings = async (): Promise<Settings> => {
  try {
    const stored = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored === null) {
      return DEFAULT_SETTINGS;
    }
    const parsed = JSON.parse(stored) as Partial<Settings>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    // Se lançar erro ao carregar as configurações, retorna as configurações padrão
  }
  return DEFAULT_SETTINGS;
};

export const storeSettings = async (settings: Settings): Promise<void> => {
  try {
    await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Se lançar erro ao salvar as configurações, falha silenciosamente
  }
};
