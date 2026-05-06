import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

import { useInit } from "@/core/init";
import queryClient from "@/lib/query-client";
import queryClientPersister, {
  dehydrateOptions,
} from "@/lib/query-client-persister";
import { useSettingsStore } from "@/stores/settings";
import { darkTheme, lightTheme } from "@/styles/theme";

export { ErrorBoundary } from "expo-router";

// export const unstable_settings = {
//   initialRouteName: "(tabs)",
// };

SplashScreen.preventAutoHideAsync();

const App = () => {
  useInit();

  const themeMode = useSettingsStore((s) => s.themeMode);
  const systemScheme = useColorScheme();
  const resolvedThemeMode =
    themeMode === "auto"
      ? systemScheme === "dark"
        ? "dark"
        : "light"
      : themeMode;
  const theme = resolvedThemeMode === "dark" ? darkTheme : lightTheme;

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
          <Stack.Screen
            name="settings/theme"
            options={{
              presentation: "transparentModal",
              animation: "fade",
              contentStyle: {
                backgroundColor: "transparent",
              },
            }}
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
