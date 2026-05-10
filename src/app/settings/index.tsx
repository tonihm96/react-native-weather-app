import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { List, Switch } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { setUseCurrentLocation, useSettingsStore } from "@/stores/settings";

const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const useCurrentLocation = useSettingsStore((s) => s.useCurrentLocation);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <List.Subheader>{t("Geral")}</List.Subheader>
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
      <List.Subheader>{t("Aparência")}</List.Subheader>
      <List.Item
        title={t("Tema")}
        onPress={() => router.navigate("/settings/theme")}
      />
      <List.Subheader>{t("Localização")}</List.Subheader>
      <List.Item
        title={t("Idioma")}
        onPress={() => router.navigate("/settings/language")}
      />
      <List.Item
        title={t("Formato de hora")}
        onPress={() => router.navigate("/settings/time-format")}
      />
      <List.Subheader>{t("Unidades")}</List.Subheader>
      <List.Item
        title={t("Unidade de temperatura")}
        onPress={() => router.navigate("/settings/temperature-unit")}
      />
      <List.Item
        title={t("Velocidade do vento")}
        onPress={() => router.navigate("/settings/wind-speed-unit")}
      />
      <List.Item
        title={t("Precipitação")}
        onPress={() => router.navigate("/settings/precipitation-unit")}
      />
      <List.Item
        title={t("Pressão atmosférica")}
        onPress={() => router.navigate("/settings/pressure-unit")}
      />
      <List.Subheader>{t("Sobre")}</List.Subheader>
      <List.Item title={t("Versão")} description="1.0.0" />
      <List.Item title={t("Licenças")} />
      <List.Item title={t("Privacidade")} />
      <List.Item title={t("Termos de serviço")} />
    </ScrollView>
  );
};

export default SettingsScreen;
