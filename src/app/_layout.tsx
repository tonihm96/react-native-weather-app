import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { Suspense, useEffect } from "react";
import { PaperProvider } from "react-native-paper";

import { useInit } from "@/core/init";
import queryClient from "@/lib/query-client";
import queryClientPersister, {
  dehydrateOptions,
} from "@/lib/query-client-persister";
import { useThemeMode } from "@/stores/settings";
import { darkTheme, lightTheme } from "@/styles/theme";

export { ErrorBoundary } from "expo-router";

// export const unstable_settings = {
//   initialRouteName: "(tabs)",
// };

SplashScreen.preventAutoHideAsync();

const DIALOG_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  presentation: "transparentModal",
  animation: "fade",
  contentStyle: {
    backgroundColor: "transparent",
  },
};

const App = () => {
  useInit();

  const themeMode = useThemeMode();
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.background);
  }, [theme.colors.background]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: queryClientPersister, dehydrateOptions }}
    >
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="settings/index" />
          <Stack.Screen name="settings/theme" options={DIALOG_SCREEN_OPTIONS} />
          <Stack.Screen
            name="settings/language"
            options={DIALOG_SCREEN_OPTIONS}
          />
        </Stack>
      </PaperProvider>
    </PersistQueryClientProvider>
  );
};

const RootLayout = () => {
  return (
    <Suspense>
      <App />
    </Suspense>
  );
};

export default RootLayout;
