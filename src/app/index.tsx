import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import Text from "@/components/Text";
import WeatherIcon from "@/components/WeatherIcon";
import { weatherQuery } from "@/queries/weather";
import { sizes } from "@/styles/sizes";

const MOCK_LOCATION_NAME = "Joaçaba";

const MOCK_COORDINATES = {
  latitude: -27.148023994688298,
  longitude: -51.48305952442542,
};

const ForecastScreen = () => {
  const {
    data: weather,
    refetch: refetchWeather,
    isRefetching: isRefetchingWeather,
  } = useQuery(
    weatherQuery({
      ...MOCK_COORDINATES,
    }),
  );

  return (
    <>
      <SafeAreaView>
        <IconButton icon="cog" onPress={() => router.push("/settings")} />
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
          <Text>{MOCK_LOCATION_NAME}</Text>
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
            <View key={h.time.toISOString()} style={{ alignItems: "center" }}>
              <Text>
                {/* format time as 1AM, 2AM, Now */}
                {h.time.toLocaleTimeString([], {
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
            key={d.time.toISOString()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text>
              {d.time.toLocaleDateString([], {
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ForecastScreen;
