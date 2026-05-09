import {
  PressureUnit,
  setPressureUnit,
  useSettingsStore,
} from "@/stores/settings";
import { sizes } from "@/styles/sizes";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, List, RadioButton } from "react-native-paper";

const PressureUnitScreen = () => {
  const { t } = useTranslation();

  const currentPressureUnit = useSettingsStore((s) => s.pressureUnit);

  const [newPressureUnit, setNewPressureUnit] =
    useState<PressureUnit>(currentPressureUnit);

  const onValueChange = (value: string) => {
    setNewPressureUnit(value as PressureUnit);
  };

  const onDismiss = () => {
    router.back();
  };

  const onSave = () => {
    setPressureUnit(newPressureUnit);
    router.back();
  };

  return (
    <Dialog visible onDismiss={onDismiss}>
      <Dialog.Title>{t("Pressão atmosférica")}</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group
          value={newPressureUnit}
          onValueChange={onValueChange}
        >
          <List.Item
            left={() => <RadioButton value="hPa" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("hPa")}
            onPress={() => setNewPressureUnit("hPa")}
          />
          <List.Item
            left={() => <RadioButton value="inHg" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("inHg")}
            onPress={() => setNewPressureUnit("inHg")}
          />
          <List.Item
            left={() => <RadioButton value="mmHg" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("mmHg")}
            onPress={() => setNewPressureUnit("mmHg")}
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

export default PressureUnitScreen;
