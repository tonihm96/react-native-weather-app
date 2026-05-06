import { setThemeMode, ThemeMode, useSettingsStore } from "@/stores/settings";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, RadioButton } from "react-native-paper";

const ThemeModeScreen = () => {
  const { t } = useTranslation();

  const currentThemeMode = useSettingsStore((s) => s.themeMode);

  const [newThemeMode, setNewThemeMode] = useState<ThemeMode>(currentThemeMode);

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
        <RadioButton.Group value={newThemeMode} onValueChange={setNewThemeMode}>
          <RadioButton.Item value="auto" label={t("Auto")} />
          <RadioButton.Item value="light" label={t("Claro")} />
          <RadioButton.Item value="dark" label={t("Escuro")} />
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
