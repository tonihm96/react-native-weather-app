import { useQuery } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { Icon, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import Text from "@/components/Text";
import WeatherIcon from "@/components/WeatherIcon";
import {
  useCurrentCoordinates,
  useCurrentLocationName,
} from "@/features/location/useCurrentCoordinates";
import DrawerContent from "@/features/locations/DrawerContent";
import { weatherQueries } from "@/features/weather/queries";
import { useSettingsStore } from "@/stores/settings";
import { sizes } from "@/styles/sizes";

const ForecastScreen = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const savedLocations = useSettingsStore((s) => s.savedLocations);
  const selectedLocationId = useSettingsStore((s) => s.selectedLocationId);
  const useCurrentLocation = useSettingsStore((s) => s.useCurrentLocation);

  const hasSetup = savedLocations.length > 0 || useCurrentLocation;

  const needsGPS = useCurrentLocation && selectedLocationId === null;

  const selectedLocation =
    selectedLocationId !== null
      ? savedLocations.find((l) => l.id === selectedLocationId)
      : null;
  const activeLocation = needsGPS ? null : (selectedLocation ?? savedLocations[0] ?? null);

  const { data: gpsCoords } = useCurrentCoordinates(needsGPS);
  const { data: gpsLocationName } = useCurrentLocationName(
    needsGPS ? gpsCoords : undefined,
  );

  const locationName = needsGPS
    ? (gpsLocationName ?? "Localização atual")
    : (activeLocation?.name ?? "—");

  const coordinates = needsGPS
    ? gpsCoords
    : activeLocation
      ? { latitude: activeLocation.lat, longitude: activeLocation.lng }
      : null;

  const {
    data: weather,
    refetch: refetchWeather,
    isRefetching: isRefetchingWeather,
  } = useQuery({
    ...weatherQueries.forecast(coordinates ?? { latitude: 0, longitude: 0 }),
    enabled: !!coordinates,
  });

  if (!hasSetup) {
    return <Redirect href="/onboarding/welcome" />;
  }

  if (needsGPS && !gpsCoords) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <Drawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      renderDrawerContent={() => (
        <DrawerContent onClose={() => setDrawerOpen(false)} />
      )}
    >
      <SafeAreaView>
        <IconButton icon="menu" onPress={() => setDrawerOpen(true)} />
      </SafeAreaView>

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingWeather}
            onRefresh={refetchWeather}
          />
        }
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: sizes.xs }}
        >
          <Icon source="map-marker" size={sizes.lg} />
          <Text>{locationName}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text variant="displayLarge">
              {weather?.current.temperature_2m}
              {weather?.current_units.temperature_2m}
            </Text>
            <Text variant="labelMedium">
              {weather?.current.apparent_temperature}
              {weather?.current_units.apparent_temperature}
            </Text>
          </View>

          <WeatherIcon
            code={weather?.current.weather_code!}
            size={sizes.xxxl}
          />
        </View>

        <ScrollView
          horizontal
          contentContainerStyle={{ gap: sizes.md }}
          showsHorizontalScrollIndicator={false}
        >
          {weather?.hourly.map((h) => (
            <View
              key={new Date(h.time).toISOString()}
              style={{ alignItems: "center" }}
            >
              <Text>
                {new Date(h.time).toLocaleTimeString([], {
                  hour: "numeric",
                  hourCycle: "h12",
                })}
              </Text>
              <WeatherIcon code={h.weather_code!} size={sizes.xl} />
              <Text variant="bodyMedium">
                {h.temperature_2m}
                {weather?.hourly_units.temperature_2m}
              </Text>
              <Text variant="bodyMedium">
                {h.precipitation_probability}
                {weather?.hourly_units.precipitation_probability}
              </Text>
            </View>
          ))}
        </ScrollView>

        {weather?.daily.map((d) => (
          <View
            key={new Date(d.time).toISOString()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text>
              {new Date(d.time).toLocaleDateString([], {
                weekday: "short",
                day: "numeric",
              })}
            </Text>
            <WeatherIcon code={d.weather_code!} size={sizes.xl} />
            <Text variant="bodyMedium">
              {d.precipitation_probability_max}
              {weather?.daily_units.precipitation_probability_max}
            </Text>
            <Text variant="bodyMedium">
              {d.temperature_2m_min}
              {weather?.daily_units.temperature_2m_min}
            </Text>
            <Text variant="bodyMedium">
              {d.temperature_2m_max}
              {weather?.daily_units.temperature_2m_max}
            </Text>
          </View>
        ))}
      </ScrollView>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default ForecastScreen;
