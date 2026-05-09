import {
  WindSpeedUnit,
  setWindSpeedUnit,
  useSettingsStore,
} from "@/stores/settings";
import { sizes } from "@/styles/sizes";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, List, RadioButton } from "react-native-paper";

const WindSpeedUnitScreen = () => {
  const { t } = useTranslation();

  const currentWindSpeedUnit = useSettingsStore((s) => s.windSpeedUnit);

  const [newWindSpeedUnit, setNewWindSpeedUnit] =
    useState<WindSpeedUnit>(currentWindSpeedUnit);

  const onValueChange = (value: string) => {
    setNewWindSpeedUnit(value as WindSpeedUnit);
  };

  const onDismiss = () => {
    router.back();
  };

  const onSave = () => {
    setWindSpeedUnit(newWindSpeedUnit);
    router.back();
  };

  return (
    <Dialog visible onDismiss={onDismiss}>
      <Dialog.Title>{t("Velocidade do vento")}</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group
          value={newWindSpeedUnit}
          onValueChange={onValueChange}
        >
          <List.Item
            left={() => <RadioButton value="kmh" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Km/h")}
            onPress={() => setNewWindSpeedUnit("kmh")}
          />
          <List.Item
            left={() => <RadioButton value="kn" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Kn")}
            onPress={() => setNewWindSpeedUnit("kn")}
          />
          <List.Item
            left={() => <RadioButton value="mph" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Mph")}
            onPress={() => setNewWindSpeedUnit("mph")}
          />
          <List.Item
            left={() => <RadioButton value="ms" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Ms")}
            onPress={() => setNewWindSpeedUnit("ms")}
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

export default WindSpeedUnitScreen;
