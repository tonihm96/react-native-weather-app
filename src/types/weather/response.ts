export interface WeatherAPIResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentWeatherUnits;
  current: CurrentWeather;
  hourly_units: HourlyForecastUnits;
  hourly: HourlyForecast;
  daily_units: DailyForecastUnits;
  daily: DailyForecast;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  relative_humidity_2m: number;
  cloud_cover: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  rain: number;
  precipitation: number;
  pressure_msl: number;
  is_day: number;
}

export interface CurrentWeatherUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  apparent_temperature: string;
  weather_code: string;
  relative_humidity_2m: string;
  cloud_cover: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
  rain: string;
  precipitation: string;
  pressure_msl: string;
  is_day: string;
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
}

export interface DailyForecastUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_sum: string;
  precipitation_probability_max: string;
  wind_speed_10m_max: string;
  wind_gusts_10m_max: string;
  sunrise: string;
  sunset: string;
  uv_index_max: string;
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
  precipitation: number[];
  apparent_temperature: number[];
  is_day: number[];
  wind_speed_10m: number[];
  visibility: number[];
}

export interface HourlyForecastUnits {
  time: string;
  temperature_2m: string;
  weather_code: string;
  precipitation_probability: string;
  precipitation: string;
  apparent_temperature: string;
  is_day: string;
  wind_speed_10m: string;
  visibility: string;
}
