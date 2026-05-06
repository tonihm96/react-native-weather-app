import { queryOptions } from "@tanstack/react-query";

import weatherApi from "@/services/weather";
import {
  PrecipitationUnit,
  TemperatureUnit,
  Timeformat,
  Timezone,
  WeatherAPIParams,
  WindSpeedUnit,
} from "@/types/weather/params";
import {
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
  WeatherAPIResponse,
} from "@/types/weather/response";

export interface WeatherQueryParams {
  latitude?: number; // change to required prop later
  longitude?: number; // change to required prop later
  timezone?: Timezone;
  temperature_unit?: TemperatureUnit;
  wind_speed_unit?: WindSpeedUnit;
  precipitation_unit?: PrecipitationUnit;
  timeformat?: Timeformat;
}

const parseWeather = (data: WeatherAPIResponse) => {
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    generationtime_ms: data.generationtime_ms,
    utc_offset_seconds: data.utc_offset_seconds,
    timezone: data.timezone,
    timezone_abbreviation: data.timezone_abbreviation,
    elevation: data.elevation,
    current_units: data.current_units,
    current: parseCurrent(data.current),
    hourly_units: data.hourly_units,
    hourly: parseHourly(data.hourly),
    daily_units: data.daily_units,
    daily: parseDaily(data.daily),
  };
};

const parseCurrent = (current: CurrentWeather) => {
  return {
    time: new Date(current.time),
    interval: current.interval,
    temperature_2m: current.temperature_2m,
    apparent_temperature: current.apparent_temperature,
    weather_code: current.weather_code,
    relative_humidity_2m: current.relative_humidity_2m,
    cloud_cover: current.cloud_cover,
    wind_speed_10m: current.wind_speed_10m,
    wind_direction_10m: current.wind_direction_10m,
    wind_gusts_10m: current.wind_gusts_10m,
    rain: current.rain,
    precipitation: current.precipitation,
    pressure_msl: current.pressure_msl,
    is_day: current.is_day,
  };
};

const parseHourly = (hourly: HourlyForecast) => {
  return hourly.time.map((time, i) => ({
    time: new Date(time),
    temperature_2m: hourly.temperature_2m.at(i),
    weather_code: hourly.weather_code.at(i),
    precipitation_probability: hourly.precipitation_probability.at(i),
    precipitation: hourly.precipitation.at(i),
    apparent_temperature: hourly.apparent_temperature.at(i),
    is_day: hourly.is_day.at(i),
    wind_speed_10m: hourly.wind_speed_10m.at(i),
    visibility: hourly.visibility.at(i),
  }));
};

const parseDaily = (daily: DailyForecast) => {
  return daily.time.map((time, i) => ({
    time: new Date(time),
    weather_code: daily.weather_code.at(i),
    temperature_2m_max: daily.temperature_2m_max.at(i),
    temperature_2m_min: daily.temperature_2m_min.at(i),
    precipitation_sum: daily.precipitation_sum.at(i),
    precipitation_probability_max: daily.precipitation_probability_max.at(i),
    wind_speed_10m_max: daily.wind_speed_10m_max.at(i),
    wind_gusts_10m_max: daily.wind_gusts_10m_max.at(i),
    sunrise: daily.sunrise.at(i),
    sunset: daily.sunset.at(i),
    uv_index_max: daily.uv_index_max.at(i),
  }));
};

const weatherQueryKey = (params: WeatherQueryParams) => {
  return ["forecast", params] as const;
};

const MOCK_COORDINATES = {
  latitude: -27.148023994688298,
  longitude: -51.48305952442542,
};

export const weatherQuery = (params: WeatherQueryParams = {}) => {
  return queryOptions({
    queryKey: weatherQueryKey(params),
    queryFn: async () => {
      console.log("running main weather query");

      const {
        latitude = MOCK_COORDINATES.latitude,
        longitude = MOCK_COORDINATES.longitude,
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

      // await new Promise((resolve) => setTimeout(resolve, 500));

      // return parseWeather(weatherMock);
      const { data: weather } = await weatherApi.get<WeatherAPIResponse>(
        "/forecast",
        { params: weatherApiParams },
      );

      return parseWeather(weather);
    },
  });
};
