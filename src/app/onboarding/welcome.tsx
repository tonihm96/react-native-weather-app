import * as Location from "expo-location";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";
import Text from "@/components/Text";
import { setUseCurrentLocation, useSettingsStore } from "@/stores/settings";
import { sizes } from "@/styles/sizes";

type Step = "choice" | "gps-rationale" | "gps-requesting" | "gps-denied";

const WelcomeScreen = () => {
  const [step, setStep] = useState<Step>("choice");
  const [canAskAgain, setCanAskAgain] = useState(true);

  const savedLocations = useSettingsStore((s) => s.savedLocations);

  // Quando o usuário volta da tela de busca com uma localização salva,
  // o onboarding está completo — redireciona para a tela principal.
  useFocusEffect(
    useCallback(() => {
      if (savedLocations.length > 0) {
        router.replace("/");
      }
    }, [savedLocations.length]),
  );

  const requestGPS = async () => {
    setStep("gps-requesting");
    const result = await Location.requestForegroundPermissionsAsync();
    if (result.status === "granted") {
      setUseCurrentLocation(true);
      router.replace("/");
    } else {
      setCanAskAgain(result.canAskAgain ?? true);
      setStep("gps-denied");
    }
  };

  if (step === "choice") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text variant="displaySmall">Qwik Cast</Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Para começar, escolha como quer adicionar sua localização.
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            mode="contained"
            icon="crosshairs-gps"
            onPress={() => setStep("gps-rationale")}
          >
            Usar minha localização
          </Button>
          <Button
            mode="outlined"
            icon="magnify"
            onPress={() => router.push("/location-search")}
          >
            Adicionar cidade
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (step === "gps-rationale") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text variant="titleLarge">Sua localização</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            O Qwik Cast usa sua localização para exibir o clima próximo a você.
            Não compartilhamos seus dados com ninguém.
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button mode="contained" onPress={requestGPS}>
            Permitir acesso
          </Button>
          <Button mode="text" onPress={() => setStep("choice")}>
            Voltar
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (step === "gps-requesting") {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  // gps-denied
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="titleLarge">Permissão negada</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {canAskAgain
            ? "Não foi possível acessar sua localização. Você pode adicionar uma cidade manualmente."
            : "A permissão foi negada permanentemente. Ative-a nas configurações do aparelho ou adicione uma cidade."}
        </Text>
      </View>
      <View style={styles.buttons}>
        {!canAskAgain && (
          <Button mode="outlined" onPress={() => Linking.openSettings()}>
            Abrir configurações
          </Button>
        )}
        <Button
          mode="contained"
          icon="magnify"
          onPress={() => router.push("/location-search")}
        >
          Adicionar cidade
        </Button>
        {canAskAgain && (
          <Button mode="text" onPress={() => setStep("gps-rationale")}>
            Tentar novamente
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { alignItems: "center", justifyContent: "center" },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: sizes.lg,
    gap: sizes.md,
  },
  subtitle: { opacity: 0.7, marginTop: sizes.sm },
  buttons: { padding: sizes.lg, gap: sizes.sm },
});

export default WelcomeScreen;
