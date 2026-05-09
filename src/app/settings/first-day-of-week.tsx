import {
  FirstDayOfWeek,
  setFirstDayOfWeek,
  useSettingsStore,
} from "@/stores/settings";
import { sizes } from "@/styles/sizes";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, List, RadioButton } from "react-native-paper";

const FirstDayOfWeekScreen = () => {
  const { t } = useTranslation();

  const currentFirstDayOfWeek = useSettingsStore((s) => s.firstDayOfWeek);

  const [newFirstDayOfWeek, setNewFirstDayOfWeek] = useState<FirstDayOfWeek>(
    currentFirstDayOfWeek,
  );

  const onValueChange = (value: string) => {
    setNewFirstDayOfWeek(value as FirstDayOfWeek);
  };

  const onDismiss = () => {
    router.back();
  };

  const onSave = () => {
    setFirstDayOfWeek(newFirstDayOfWeek);
    router.back();
  };

  return (
    <Dialog visible onDismiss={onDismiss}>
      <Dialog.Title>{t("Primeiro dia da semana")}</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group
          value={newFirstDayOfWeek}
          onValueChange={onValueChange}
        >
          <List.Item
            left={() => <RadioButton value="sunday" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Domingo")}
            onPress={() => setNewFirstDayOfWeek("sunday")}
          />
          <List.Item
            left={() => <RadioButton value="monday" />}
            style={{ paddingBlock: sizes.xxs }}
            contentStyle={{ paddingLeft: sizes.xs }}
            title={t("Segunda-feira")}
            onPress={() => setNewFirstDayOfWeek("monday")}
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

export default FirstDayOfWeekScreen;
