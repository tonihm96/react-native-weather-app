import { useTranslation } from "react-i18next";
import { List, Switch } from "react-native-paper";

import { setUseCurrentLocation, useSettingsStore } from "@/stores/settings";

const UseCurrentLocationSettingListItem = () => {
  const { t } = useTranslation();

  const useCurrentLocation = useSettingsStore((s) => s.useCurrentLocation);

  return (
    <List.Item
      title={t("Usar localização atual")}
      right={() => (
        <Switch
          value={useCurrentLocation}
          onChange={() => setUseCurrentLocation(!useCurrentLocation)}
        />
      )}
      onPress={() => setUseCurrentLocation(!useCurrentLocation)}
    />
  );
};

export default UseCurrentLocationSettingListItem;
