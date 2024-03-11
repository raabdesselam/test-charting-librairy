import React, { FC } from "react";
import { AnalyticsResponse } from "../types/analyticsResponse";
import { FuelStat } from "../types/fuelStats";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export interface EnergySourcePieChartAnalyticsProps extends Highcharts.Options {
  report: AnalyticsResponse<FuelStat>;
}

export const EnergySourcePieChartAnalytics: FC<EnergySourcePieChartAnalyticsProps> = ({
  report,
  ...props
}: EnergySourcePieChartAnalyticsProps) => {
  const data = report.generationmix.map((entry) => {
    return { name: entry.fuel, y: entry.perc };
  });

  const buildPieChartOption = (): Highcharts.Options => {
    return {
      chart: {
        type: "pie",
      },
      series: [
        {
          name: "perc",
          type: "pie",
          data: data,
        },
      ],
      credits: {
        enabled: false,
      },

      ...props,
    };
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={buildPieChartOption()} />
  );
};
