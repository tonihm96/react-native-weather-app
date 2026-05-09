import {
  TemperatureUnit,
  setTemperatureUnit,
  useSettingsStore,
} from "@/stores/settings";
import { sizes } from "@/styles/sizes";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, List, RadioButton } from "react-native-paper";

const TemperatureUnitScreen = () => {
  const { t } = useTranslation();

  const currentTemperatureUnit = useSettingsStore((s) => s.temperatureUnit);

  const [newTemperatureUnit, setNewTemperatureUnit] = useState<TemperatureUnit>(
    currentTemperatureUnit,
  );

  const onValueChange = (value: string) => {
    setNewTemperatureUnit(value as TemperatureUnit);
  };

  const onDismiss = () => {
    router.back();
  };

  const onSave = () => {
    setTemperatureUnit(newTemperatureUnit);
    router.back();
  };

  return (
    <Dialog visible onDismiss={onDismiss}>
      <Dialog.Title>{t("Primeiro dia da semana")}</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group
          value={newTemperatureUnit}
          onValueChange={onValueChange}
        >
          <List.Item
            left={() => <RadioButton value="celsius" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Celsius")}
            onPress={() => setNewTemperatureUnit("celsius")}
          />
          <List.Item
            left={() => <RadioButton value="fahrenheit" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Fahrenheit")}
            onPress={() => setNewTemperatureUnit("fahrenheit")}
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

export default TemperatureUnitScreen;
