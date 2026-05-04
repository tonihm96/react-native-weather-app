import {
  createContext,
  ReactNode,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { TranslationLanguage } from "@/i18n";
import { Settings, storeSettings } from "@/lib/settings";
import { FontFamily } from "@assets/fonts";

interface SettingsContextProps extends Settings {
  setThemeMode: (themeMode: ThemeMode) => void;
  setLanguage: (language: TranslationLanguage) => void;
  setFontFamily: (fontFamily: FontFamily) => void;
}

interface SettingsProviderProps {
  children: ReactNode;
  init: Settings;
}

const SettingsContext = createContext<SettingsContextProps | null>(null);

export const SettingsProvider = ({ children, init }: SettingsProviderProps) => {
  const [, i18n] = useTranslation();

  const [settings, setSettings] = useState<Settings>(init);

  const setThemeMode = useCallback((themeMode: ThemeMode) => {
    setSettings((prev) => ({ ...prev, themeMode }));
  }, []);

  const setLanguage = useCallback(
    (language: TranslationLanguage) => {
      i18n.changeLanguage(language);
      setSettings((prev) => ({ ...prev, language }));
    },
    [i18n],
  );

  const setFontFamily = useCallback((fontFamily: FontFamily) => {
    setSettings((prev) => ({ ...prev, fontFamily }));
  }, []);

  useEffect(() => {
    storeSettings(settings);
  }, [settings]);

  return (
    <SettingsContext
      value={{ setThemeMode, setLanguage, setFontFamily, ...settings }}
    >
      {children}
    </SettingsContext>
  );
};

export const useSettings = () => {
  const settings = use(SettingsContext);
  if (settings === null) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return settings;
};
