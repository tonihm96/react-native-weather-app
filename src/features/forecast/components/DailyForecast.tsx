import { Surface, Text } from "react-native-paper";

interface DailyForecastProps {
  forecast?: DailyForecast;
  forecastUnits?: DailyForecastUnits;
}

const DailyForecast = ({ forecast, forecastUnits }: DailyForecastProps) => {
  if (!forecast || !forecastUnits) {
    return null;
  }

  return forecast.time.map((time, index) => (
    <Surface key={time}>
      <Text>{time}</Text>
      <Text>
        {forecast.weather_code[index]} {forecastUnits.weather_code}
      </Text>
      <Text>
        {forecast.temperature_2m_max[index]} {forecastUnits.temperature_2m_max}
      </Text>
      <Text>
        {forecast.temperature_2m_min[index]} {forecastUnits.temperature_2m_min}
      </Text>
      <Text>
        {forecast.precipitation_sum[index]} {forecastUnits.precipitation_sum}
      </Text>
      <Text>
        {forecast.precipitation_probability_max[index]}{" "}
        {forecastUnits.precipitation_probability_max}
      </Text>
      <Text>
        {forecast.wind_speed_10m_max[index]} {forecastUnits.wind_speed_10m_max}
      </Text>
      <Text>
        {forecast.wind_gusts_10m_max[index]} {forecastUnits.wind_gusts_10m_max}
      </Text>
      <Text>
        {forecast.sunrise[index]} {forecastUnits.sunrise}
      </Text>
      <Text>
        {forecast.sunset[index]} {forecastUnits.sunset}
      </Text>
    </Surface>
  ));
};

export default DailyForecast;
