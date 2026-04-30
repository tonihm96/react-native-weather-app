import { Surface, Text } from "react-native-paper";

interface HourlyForecastProps {
  forecast?: HourlyForecast;
  forecastUnits?: HourlyForecastUnits;
}

const HourlyForecast = ({ forecast, forecastUnits }: HourlyForecastProps) => {
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
        {forecast.temperature_2m[index]} {forecastUnits.temperature_2m}
      </Text>
      <Text>
        {forecast.precipitation_probability[index]}{" "}
        {forecastUnits.precipitation_probability}
      </Text>
      <Text>
        {forecast.precipitation[index]} {forecastUnits.precipitation}
      </Text>
      <Text>
        {forecast.apparent_temperature[index]}{" "}
        {forecastUnits.apparent_temperature}
      </Text>
      <Text>
        {forecast.is_day[index]} {forecastUnits.is_day}
      </Text>
      <Text>
        {forecast.wind_speed_10m[index]} {forecastUnits.wind_speed_10m}
      </Text>
      <Text>
        {forecast.visibility[index]} {forecastUnits.visibility}
      </Text>
    </Surface>
  ));
};

export default HourlyForecast;
