import {
  focusManager,
  onlineManager,
  QueryClient,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { AppState, Platform } from "react-native";

const FIVE_MINUTES = 1000 * 60 * 5;
const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const setupOnlineManager = () => {
  // ensure queries run when device is online
  onlineManager.setEventListener((setOnline) => {
    // flag to ensure that the initial state is only set once
    let initialised = false;

    const eventSubscription = Network.addNetworkStateListener((state) => {
      initialised = true;
      setOnline(!!state.isConnected);
    });

    Network.getNetworkStateAsync()
      .then((state) => {
        if (!initialised) {
          setOnline(!!state.isConnected);
        }
      })
      .catch(() => {
        // getNetworkStateAsync can reject on some platforms/SDK versions
      });

    return eventSubscription.remove;
  });
};

export const setupAppFocusManager = () => {
  // refetch on app focus
  AppState.addEventListener("change", (status) => {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: FIVE_MINUTES, gcTime: TWENTY_FOUR_HOURS },
  },
});

export default queryClient;
