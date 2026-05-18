import { queryOptions } from "@tanstack/react-query";

import geocodingApi from "@/services/geocoding";
import weatherApi from "@/services/weather";

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  country_code?: string;
  timezone: string;
  country?: string;
  admin1?: string;
  admin2?: string;
}

interface GeocodingSearchResponse {
  results?: GeocodingResult[];
  generationtime_ms: number;
}

interface LocationCurrentWeatherResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
  current_units: {
    temperature_2m: string;
  };
}

export const locationQueries = {
  all: () => ["locations"] as const,

  search: (name: string) =>
    queryOptions({
      queryKey: [...locationQueries.all(), "search", name],
      queryFn: async () => {
        const { data } = await geocodingApi.get<GeocodingSearchResponse>(
          "/search",
          { params: { name, count: 10, language: "pt" } },
        );
        return data.results ?? [];
      },
      enabled: name.trim().length >= 2,
      staleTime: 5 * 60 * 1000,
    }),

  currentWeather: (params: { latitude: number; longitude: number }) =>
    queryOptions({
      queryKey: [...locationQueries.all(), "current-weather", params],
      queryFn: async () => {
        const { data } =
          await weatherApi.get<LocationCurrentWeatherResponse>("/forecast", {
            params: {
              latitude: params.latitude,
              longitude: params.longitude,
              current: ["temperature_2m", "weather_code"],
              timezone: "auto",
              temperature_unit: "celsius",
              timeformat: "iso8601",
            },
          });
        return data;
      },
      staleTime: 5 * 60 * 1000,
    }),
};
