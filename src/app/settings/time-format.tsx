import { setTimeFormat, TimeFormat, useSettingsStore } from "@/stores/settings";
import { sizes } from "@/styles/sizes";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, List, RadioButton } from "react-native-paper";

const TimeFormatScreen = () => {
  const { t } = useTranslation();

  const currentTimeFormat = useSettingsStore((s) => s.timeFormat);

  const [newTimeFormat, setNewTimeFormat] =
    useState<TimeFormat>(currentTimeFormat);

  const onValueChange = (value: string) => {
    setNewTimeFormat(value as TimeFormat);
  };

  const onDismiss = () => {
    router.back();
  };

  const onSave = () => {
    setTimeFormat(newTimeFormat);
    router.back();
  };

  return (
    <Dialog visible onDismiss={onDismiss}>
      <Dialog.Title>{t("Formato de hora")}</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group value={newTimeFormat} onValueChange={onValueChange}>
          <List.Item
            left={() => <RadioButton value="12h" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("12 horas")}
            onPress={() => setNewTimeFormat("12h")}
          />
          <List.Item
            left={() => <RadioButton value="24h" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("24 horas")}
            onPress={() => setNewTimeFormat("24h")}
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

export default TimeFormatScreen;
