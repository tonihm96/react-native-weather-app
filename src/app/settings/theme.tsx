import { setThemeMode, ThemeMode, useSettingsStore } from "@/stores/settings";
import { sizes } from "@/styles/sizes";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, List, RadioButton } from "react-native-paper";

const ThemeModeScreen = () => {
  const { t } = useTranslation();

  const currentThemeMode = useSettingsStore((s) => s.themeMode);

  const [newThemeMode, setNewThemeMode] = useState<ThemeMode>(currentThemeMode);

  const onValueChange = (value: string) => {
    setNewThemeMode(value as ThemeMode);
  };

  const onDismiss = () => {
    router.back();
  };

  const onSave = () => {
    setThemeMode(newThemeMode);
    router.back();
  };

  return (
    <Dialog visible onDismiss={onDismiss}>
      <Dialog.Title>{t("Tema")}</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group value={newThemeMode} onValueChange={onValueChange}>
          <List.Item
            left={() => <RadioButton value="auto" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Auto")}
            onPress={() => setNewThemeMode("auto")}
          />
          <List.Item
            left={() => <RadioButton value="light" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Claro")}
            onPress={() => setNewThemeMode("light")}
          />
          <List.Item
            left={() => <RadioButton value="dark" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Escuro")}
            onPress={() => setNewThemeMode("dark")}
          />
        </RadioButton.Group>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>{t("Cancelar")}</Button>
        <Button onPress={onSave}>{t("Salvar")}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ThemeModeScreen;
