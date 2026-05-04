import { useQuery } from "@tanstack/react-query";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import WeatherIcon from "@/components/WeatherIcon";
import weatherQuery from "@/queries/weather";
import { sizes } from "@/styles/sizes";
import { Icon, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_LOCATION_NAME = "Joaçaba";

const ForecastScreen = () => {
  const {
    data: weather,
    refetch: refetchWeather,
    isRefetching: isRefetchingWeather,
  } = useQuery(weatherQuery());

  const hourlyTimes = weather?.hourly.map((h) => h.time.getTime()) ?? [];
  const dailyTimes = weather?.daily.map((d) => d.time.getTime()) ?? [];

  const maxHourlyDate = Math.max(...hourlyTimes);
  const minHourlyDate = Math.min(...hourlyTimes);

  const maxDailyDate = Math.max(...dailyTimes);
  const minDailyDate = Math.min(...dailyTimes);

  const maxHourly = new Date(maxHourlyDate);
  const minHourly = new Date(minHourlyDate);
  const maxDaily = new Date(maxDailyDate);
  const minDaily = new Date(minDailyDate);

  console.log({
    hourlyTimesLength: hourlyTimes.length,
    dailyTimesLength: dailyTimes.length,
    maxHourly,
    minHourly,
    maxDaily,
    minDaily,
  });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingWeather}
          onRefresh={refetchWeather}
        />
      }
    >
      <SafeAreaView
        style={{ flexDirection: "row", alignItems: "center", gap: sizes.xs }}
      >
        <Icon source="map-marker" size={sizes.lg} />
        <Text>{MOCK_LOCATION_NAME}</Text>
      </SafeAreaView>

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

        <WeatherIcon code={weather?.current.weather_code!} size={sizes.xxxl} />
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{ gap: sizes.md }}
        showsHorizontalScrollIndicator={false}
      >
        {weather?.hourly.map((h) => (
          <View key={h.time.toISOString()}>
            <Text>
              {h.time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ForecastScreen;
