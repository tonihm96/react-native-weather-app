import {
  focusManager,
  onlineManager,
  QueryClient,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { AppState, Platform } from "react-native";

const FIVE_MINUTES = 1000 * 60 * 5;

export const setupQueryClientOnlineManager = () => {
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

export const setupQueryClientFocusManager = () => {
  // refetch on app focus
  AppState.addEventListener("change", (status) => {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: FIVE_MINUTES, gcTime: Infinity },
  },
});

export default queryClient;
