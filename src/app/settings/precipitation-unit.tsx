import {
  PrecipitationUnit,
  setPrecipitationUnit,
  useSettingsStore,
} from "@/stores/settings";
import { sizes } from "@/styles/sizes";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, List, RadioButton } from "react-native-paper";

const PrecipitationUnitScreen = () => {
  const { t } = useTranslation();

  const currentPrecipitationUnit = useSettingsStore((s) => s.precipitationUnit);

  const [newPrecipitationUnit, setNewPrecipitationUnit] =
    useState<PrecipitationUnit>(currentPrecipitationUnit);

  const onValueChange = (value: string) => {
    setNewPrecipitationUnit(value as PrecipitationUnit);
  };

  const onDismiss = () => {
    router.back();
  };

  const onSave = () => {
    setPrecipitationUnit(newPrecipitationUnit);
    router.back();
  };

  return (
    <Dialog visible onDismiss={onDismiss}>
      <Dialog.Title>{t("Primeiro dia da semana")}</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group
          value={newPrecipitationUnit}
          onValueChange={onValueChange}
        >
          <List.Item
            left={() => <RadioButton value="inch" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Inch")}
            onPress={() => setNewPrecipitationUnit("inch")}
          />
          <List.Item
            left={() => <RadioButton value="mm" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("mm")}
            onPress={() => setNewPrecipitationUnit("mm")}
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

export default PrecipitationUnitScreen;
