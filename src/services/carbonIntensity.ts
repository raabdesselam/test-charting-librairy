import { AnalyticsResponse } from "../types/analyticsResponse";
import { FuelStat } from "../types/fuelStats";
import { api } from "./baseApi";

export type FuelStatApiResponse = AnalyticsResponse<FuelStat>;
export const FuelStatsApi = {
  generation: async (): Promise<FuelStatApiResponse> => {
    const res = await api.get(
      `/generation`
    );

    if (res.data && "from" in res.data) {
      return res.data;
    } else {
      throw new Error("bad body");
    }
  },
};
