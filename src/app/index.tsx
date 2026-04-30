import { useQuery } from "@tanstack/react-query";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import CurrentWeather from "@/features/forecast/components/CurrentWeather";
import CurrentWeatherCard from "@/features/forecast/components/CurrentWeatherCard";
import CurrentWeatherCardsContainer from "@/features/forecast/components/CurrentWeatherCardsContainer";
import CurrentWeatherContainer from "@/features/forecast/components/CurrentWeatherContainer";
import DailyForecast from "@/features/forecast/components/DailyForecast";
import HourlyForecast from "@/features/forecast/components/HourlyForecast";
import weatherQuery from "@/queries/weather";

const MOCK_COORDINATES = {
  latitude: -27.148023994688298,
  longitude: -51.48305952442542,
};

const ForecastScreen = () => {
  const {
    data: weather,
    refetch: refetchWeather,
    isRefetching: isRefetchingWeather,
  } = useQuery(weatherQuery({ ...MOCK_COORDINATES }));

  const onRefresh = () => {
    refetchWeather();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingWeather}
          onRefresh={onRefresh}
        />
      }
    >
      <CurrentWeatherContainer>
        <CurrentWeather
          temperature={weather?.current?.temperature_2m}
          temperatureUnit={weather?.current_units?.temperature_2m}
          apparentTemperature={weather?.current?.apparent_temperature}
          apparentTemperatureUnit={weather?.current_units?.apparent_temperature}
        />

        <Text>
          {weather?.current?.weather_code ?? 0}{" "}
          {weather?.current_units?.weather_code ?? "code"}
        </Text>
      </CurrentWeatherContainer>

      <CurrentWeatherCardsContainer>
        <CurrentWeatherCard
          label={`${weather?.current?.rain ?? 0} ${weather?.current_units?.rain ?? "mm"}`}
        />
        <CurrentWeatherCard
          label={`${weather?.current?.wind_speed_10m ?? 0} ${weather?.current_units?.wind_speed_10m ?? "km/h"}`}
        />
        <CurrentWeatherCard
          label={`${weather?.current?.cloud_cover ?? 0} ${weather?.current_units?.cloud_cover ?? "%"}`}
        />
      </CurrentWeatherCardsContainer>

      <ScrollView horizontal>
        <HourlyForecast
          forecast={weather?.hourly}
          forecastUnits={weather?.hourly_units}
        />
      </ScrollView>

      <ScrollView horizontal>
        <DailyForecast
          forecast={weather?.daily}
          forecastUnits={weather?.daily_units}
        />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ForecastScreen;
