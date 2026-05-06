import geocodingApi from "@/services/geocoding";
import { queryOptions } from "@tanstack/react-query";

const geocodingQueryKey = () => {
  return ["geocoding"] as const;
};

export const geocodingQuery = () => {
  return queryOptions({
    queryKey: geocodingQueryKey(),
    queryFn: async () => {
      const { data: geocoding } = await geocodingApi.get(
        "/search",
        // { params },
      );

      return geocoding;
    },
  });
};
