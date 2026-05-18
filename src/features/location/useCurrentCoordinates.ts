import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";

export const useCurrentCoordinates = (enabled: boolean) => {
  return useQuery({
    queryKey: ["current-location-coords"],
    queryFn: async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("location-permission-denied");
      }
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      return { latitude: coords.latitude, longitude: coords.longitude };
    },
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useCurrentLocationName = (
  coords: { latitude: number; longitude: number } | null | undefined,
) => {
  return useQuery({
    queryKey: ["current-location-name", coords],
    queryFn: async () => {
      if (!coords) return null;
      const [result] = await Location.reverseGeocodeAsync(coords);
      return (
        result?.city ??
        result?.district ??
        result?.subregion ??
        "Localização atual"
      );
    },
    enabled: !!coords,
    staleTime: 60 * 60 * 1000,
  });
};
