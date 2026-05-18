import * as Location from "expo-location";
import { useTranslation } from "react-i18next";
import { Alert, Linking } from "react-native";
import { List, Switch } from "react-native-paper";

import { setUseCurrentLocation, useSettingsStore } from "@/stores/settings";

const UseCurrentLocationSettingListItem = () => {
  const { t } = useTranslation();
  const useCurrentLocation = useSettingsStore((s) => s.useCurrentLocation);

  const handleToggle = async () => {
    if (useCurrentLocation) {
      setUseCurrentLocation(false);
      return;
    }

    const { status, canAskAgain } =
      await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      setUseCurrentLocation(true);
      return;
    }

    if (!canAskAgain) {
      Alert.alert(
        t("Permissão negada"),
        t(
          "A permissão de localização foi negada permanentemente. Ative-a nas configurações do aparelho.",
        ),
        [
          { text: t("Cancelar"), style: "cancel" },
          {
            text: t("Configurações"),
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    } else {
      Alert.alert(
        t("Permissão negada"),
        t("Permita o acesso à localização para usar essa função."),
      );
    }
  };

  return (
    <List.Item
      title={t("Usar localização atual")}
      right={() => (
        <Switch value={useCurrentLocation} onValueChange={handleToggle} />
      )}
      onPress={handleToggle}
    />
  );
};

export default UseCurrentLocationSettingListItem;
