import { queryOptions } from "@tanstack/react-query";

import weatherMock from "@/mock/weather.json";
import openMeteoApi from "@/services/open-meteo";

interface WeatherQueryParams {
  latitude: number;
  longitude: number;
  timezone?: Timezone;
  temperature_unit?: TemperatureUnit;
  wind_speed_unit?: WindSpeedUnit;
  precipitation_unit?: PrecipitationUnit;
  timeformat?: Timeformat;
}

const weatherQuery = (params: WeatherQueryParams) => {
  return queryOptions({
    queryKey: ["forecast", params],
    queryFn: async () => {
      const {
        latitude,
        longitude,
        precipitation_unit = "mm",
        temperature_unit = "celsius",
        timeformat = "iso8601",
        timezone = "auto",
        wind_speed_unit = "kmh",
      } = params;

      const weatherApiParams: WeatherAPIParams = {
        timezone,
        temperature_unit,
        wind_speed_unit,
        precipitation_unit,
        timeformat,
        latitude,
        longitude,
        current: [
          "temperature_2m",
          "apparent_temperature",
          "weather_code",
          "relative_humidity_2m",
          "cloud_cover",
          "wind_speed_10m",
          "wind_direction_10m",
          "wind_gusts_10m",
          "rain",
          "precipitation",
          "pressure_msl",
          "is_day",
        ],
        hourly: [
          "temperature_2m",
          "weather_code",
          "precipitation_probability",
          "precipitation",
          "apparent_temperature",
          "is_day",
          "wind_speed_10m",
          "visibility",
        ],
        daily: [
          "weather_code",
          "temperature_2m_max",
          "temperature_2m_min",
          "precipitation_sum",
          "precipitation_probability_max",
          "wind_speed_10m_max",
          "wind_gusts_10m_max",
          "sunrise",
          "sunset",
          "uv_index_max",
        ],
      };

      console.log(
        openMeteoApi.getUri({
          url: "/forecast",
          params: weatherApiParams,
        }),
      );

      await new Promise((resolve) => setTimeout(resolve, 500));

      return weatherMock as WeatherAPIResponse;

      const { data } = await openMeteoApi.get<WeatherAPIResponse>("/forecast", {
        params: weatherApiParams,
      });

      console.log(JSON.stringify(data));

      return data;
    },
  });
};

export default weatherQuery;
