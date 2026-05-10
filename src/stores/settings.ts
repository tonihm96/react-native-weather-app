import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { useColorScheme } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { TranslationResourcesLanguage } from "@/i18n";
import { resolveLanguage } from "@/lib/resolve-language";
import { waitForStoreHydration } from "@/utils/wait-for-store-hydration";

//#region Tipos
export type ThemeMode = "light" | "dark" | "auto";

export type TranslationLanguage = TranslationResourcesLanguage | "auto";

export type TemperatureUnit = "celsius" | "fahrenheit";

export type WindSpeedUnit = "kmh" | "ms" | "mph" | "kn";

export type PrecipitationUnit = "mm" | "inch";

export type PressureUnit = "hPa" | "inHg" | "mmHg";

export type TimeFormat = "12h" | "24h";

export type LocationSortMode = "manual" | "name" | "createdAt";

export interface Location {
  id: string;
  /**
   * Nome para exibição, editável.
   */
  name: string;
  /**
   * Vem da API de geocoding.
   */
  originalName: string;
  lat: number;
  lng: number;
  /**
   * Vem da API de geocoding.
   */
  timezone: string;
  country?: string;
  /**
   * Estado/província
   */
  admin1?: string;
  /**
   * Município
   */
  admin2?: string;
  createdAt: number;
}

export interface Settings {
  // Aparência
  themeMode: ThemeMode;

  // Idioma
  language: TranslationLanguage;

  // Unidades
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  precipitationUnit: PrecipitationUnit;
  pressureUnit: PressureUnit;
  timeFormat: TimeFormat;

  // Localização
  savedLocations: Location[];
  selectedLocationId: string | null;
  useCurrentLocation: boolean;
  locationSortMode: LocationSortMode;

  // Futuro
  // autoRefreshOnFocus: boolean;
  // autoRefreshInterval: "15min" | "30min" | "1h"
  // sendCrashReports: boolean;
  // sendUsageData: boolean;
}
//#endregion Tipos

const SETTINGS_STORAGE_KEY = "SETTINGS_STORAGE_KEY" as const;

const DEFAULT_SETTINGS = Object.freeze<Settings>({
  // Aparência
  themeMode: "auto",

  // Idioma
  language: "auto",

  // Unidades
  temperatureUnit: "celsius",
  windSpeedUnit: "kmh",
  precipitationUnit: "mm",
  pressureUnit: "hPa", // só client-side
  timeFormat: "24h",

  // Localização
  savedLocations: [],
  selectedLocationId: null,
  useCurrentLocation: false,
  locationSortMode: "createdAt",
});

export const useSettingsStore = create<Settings>()(
  persist(() => ({ ...DEFAULT_SETTINGS }), {
    name: SETTINGS_STORAGE_KEY,
    storage: createJSONStorage(() => AsyncStorage),
    // garante que campos novos adicionados a DEFAULT_SETTINGS apareçam
    // mesmo em instalações que já têm dados persistidos da versão anterior
    merge: (persisted, current) => ({
      ...current,
      ...(persisted as Partial<Settings>),
    }),
  }),
);

export const hydrateSettingsStore = async () => {
  const settings = await waitForStoreHydration(useSettingsStore);
  return settings;
};

export const useThemeMode = () => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const systemScheme = useColorScheme();

  if (themeMode === "auto") {
    return systemScheme === "dark" ? "dark" : "light";
  }

  return themeMode;
};

//#region Actions
export const setThemeMode = (themeMode: ThemeMode) => {
  useSettingsStore.setState({ themeMode });
};

export const setLanguage = (language: TranslationLanguage) => {
  i18next.changeLanguage(resolveLanguage(language));
  useSettingsStore.setState({ language });
};

export const setTemperatureUnit = (temperatureUnit: TemperatureUnit) => {
  useSettingsStore.setState({ temperatureUnit });
};

export const setWindSpeedUnit = (windSpeedUnit: WindSpeedUnit) => {
  useSettingsStore.setState({ windSpeedUnit });
};

export const setPrecipitationUnit = (precipitationUnit: PrecipitationUnit) => {
  useSettingsStore.setState({ precipitationUnit });
};

export const setPressureUnit = (pressureUnit: PressureUnit) => {
  useSettingsStore.setState({ pressureUnit });
};

export const setTimeFormat = (timeFormat: TimeFormat) => {
  useSettingsStore.setState({ timeFormat });
};

export const setSavedLocations = (savedLocations: Location[]) => {
  useSettingsStore.setState({ savedLocations });
};

export const setSelectedLocationId = (selectedLocationId: string | null) => {
  useSettingsStore.setState({ selectedLocationId });
};

export const setUseCurrentLocation = (useCurrentLocation: boolean) => {
  useSettingsStore.setState({ useCurrentLocation });
};

export const setLocationSortMode = (locationSortMode: LocationSortMode) => {
  useSettingsStore.setState({ locationSortMode });
};
//#endregion Actions
