import { queryOptions } from "@tanstack/react-query";

import weatherApi from "@/services/weather";
import { Timezone, WeatherAPIParams } from "@/types/weather/params";
import {
  DailyForecast,
  HourlyForecast,
  WeatherAPIResponse,
} from "@/types/weather/response";

export interface WeatherQueryParams {
  latitude: number;
  longitude: number;
  timezone?: Timezone;
}

const PRECIPITATION_UNIT = "mm";
const TEMPERATURE_UNIT = "celsius";
const TIME_FORMAT = "iso8601";
const WIND_SPEED_UNIT = "kmh";

const parseWeather = (data: WeatherAPIResponse) => {
  return {
    ...data,
    hourly: parseHourly(data.hourly),
    daily: parseDaily(data.daily),
  };
};

const parseHourly = (hourly: HourlyForecast) => {
  return hourly.time.map((time, i) => ({
    time: time,
    temperature_2m: hourly.temperature_2m[i],
    weather_code: hourly.weather_code[i],
    precipitation_probability: hourly.precipitation_probability[i],
    precipitation: hourly.precipitation[i],
    apparent_temperature: hourly.apparent_temperature[i],
    is_day: hourly.is_day[i],
    wind_speed_10m: hourly.wind_speed_10m[i],
    visibility: hourly.visibility[i],
  }));
};

const parseDaily = (daily: DailyForecast) => {
  return daily.time.map((time, i) => ({
    time: time,
    weather_code: daily.weather_code[i],
    temperature_2m_max: daily.temperature_2m_max[i],
    temperature_2m_min: daily.temperature_2m_min[i],
    precipitation_sum: daily.precipitation_sum[i],
    precipitation_probability_max: daily.precipitation_probability_max[i],
    wind_speed_10m_max: daily.wind_speed_10m_max[i],
    wind_gusts_10m_max: daily.wind_gusts_10m_max[i],
    sunrise: daily.sunrise[i],
    sunset: daily.sunset[i],
    uv_index_max: daily.uv_index_max[i],
  }));
};

const weatherQueryKey = (params: WeatherQueryParams) => {
  return ["forecast", params] as const;
};

export const weatherQuery = (params: WeatherQueryParams) => {
  return queryOptions({
    queryKey: weatherQueryKey(params),
    queryFn: async () => {
      const { latitude, longitude, timezone = "auto" } = params;

      const weatherApiParams: WeatherAPIParams = {
        timezone,
        temperature_unit: TEMPERATURE_UNIT,
        wind_speed_unit: WIND_SPEED_UNIT,
        precipitation_unit: PRECIPITATION_UNIT,
        timeformat: TIME_FORMAT,
        latitude,
        longitude,
        past_hours: 24, // max: 24
        forecast_hours: 24, // max: 24
        past_days: 1,
        forecast_days: 7,
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

      const { data: weather } = await weatherApi.get<WeatherAPIResponse>(
        "/forecast",
        { params: weatherApiParams },
      );

      return parseWeather(weather);
    },
  });
};
