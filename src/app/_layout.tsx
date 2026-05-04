import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

import { SettingsProvider } from "@/contexts/settings";
import { useInit } from "@/core/init";
import queryClient from "@/lib/query-client";
import queryClientPersister from "@/lib/query-client-persister";
import { darkTheme, lightTheme } from "@/styles/theme";

export { ErrorBoundary } from "expo-router";

// export const unstable_settings = {
//   initialRouteName: "(tabs)",
// };

SplashScreen.preventAutoHideAsync();

const App = () => {
  const { settings } = useInit();

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: queryClientPersister }}
    >
      <PaperProvider theme={theme}>
        <SettingsProvider init={settings}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.background },
            }}
          />
        </SettingsProvider>
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
