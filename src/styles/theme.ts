import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

import { fontConfig } from "./fonts";

export const darkTheme = {
  ...MD3DarkTheme,
  colors: { ...MD3DarkTheme.colors },
  fonts: fontConfig,
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: { ...MD3LightTheme.colors },
  fonts: fontConfig,
};
