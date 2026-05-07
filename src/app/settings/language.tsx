import {
  setLanguage,
  TranslationLanguage,
  useSettingsStore,
} from "@/stores/settings";
import { sizes } from "@/styles/sizes";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, List, RadioButton } from "react-native-paper";

const LanguageScreen = () => {
  const { t } = useTranslation();

  const currentLanguage = useSettingsStore((s) => s.language);

  const [newLanguage, setNewLanguage] =
    useState<TranslationLanguage>(currentLanguage);

  const onValueChange = (value: string) => {
    setNewLanguage(value as TranslationLanguage);
  };

  const onDismiss = () => {
    router.back();
  };

  const onSave = () => {
    setLanguage(newLanguage);
    router.back();
  };

  return (
    <Dialog visible onDismiss={onDismiss}>
      <Dialog.Title>{t("Idioma")}</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group value={newLanguage} onValueChange={onValueChange}>
          <List.Item
            left={() => <RadioButton value="auto" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Auto")}
            onPress={() => setNewLanguage("auto")}
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

export default LanguageScreen;
