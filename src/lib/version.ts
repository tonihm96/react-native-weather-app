import Constants from "expo-constants";

const FALLBACK_APP_VERSION = "v1.0.0";

export const VERSION = Constants.expoConfig?.version
  ? `v${Constants.expoConfig.version}`
  : FALLBACK_APP_VERSION;
