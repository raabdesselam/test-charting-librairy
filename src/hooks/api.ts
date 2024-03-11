import { useQuery } from "@tanstack/react-query";
import { FuelStatApiResponse, FuelStatsApi } from "../services/carbonIntensity";

export const useGenerateApi = () => {
  return useQuery<FuelStatApiResponse, Error>({
    queryKey: ["energy-stats"],
    queryFn: async () => {
      return await FuelStatsApi.generation();
    },
    throwOnError: false,
    staleTime: Infinity,
  });
};
