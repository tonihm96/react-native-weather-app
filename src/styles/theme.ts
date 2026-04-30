import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native";

import { fontConfig } from "./fonts";

const { DarkTheme, LightTheme } = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
  reactNavigationLight: NavigationLightTheme,
});

export const darkTheme = {
  ...DarkTheme,
  ...MD3DarkTheme,
  colors: { ...DarkTheme.colors, ...MD3DarkTheme.colors },
  fonts: fontConfig,
};

export const lightTheme = {
  ...LightTheme,
  ...MD3LightTheme,
  colors: { ...LightTheme.colors, ...MD3LightTheme.colors },
  fonts: fontConfig,
};
