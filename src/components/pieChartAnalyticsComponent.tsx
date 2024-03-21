import React, { FC } from "react";
import { AnalyticsResponse } from "../types/analyticsResponse";
import { FuelStat } from "../types/fuelStats";
import { EChart, UseEChartsOptions } from "@kbox-labs/react-echarts";

export interface PieChartAnalyticsProps extends UseEChartsOptions {
  report: AnalyticsResponse<FuelStat>;
}

// this is a component, you can create an instance of this component every where in your app,
// like classes with c# .net, a FC: functional component needs parameters to be created
// Every component needs Props, like parameters in C#
// In this case we added the report as parameter, you can add others   
export const PieChartAnalytics: FC<PieChartAnalyticsProps> = ({
  report,
  ...props
}: PieChartAnalyticsProps) => {
  const data = report.generationmix.map((entry) => {
    return { name: entry.fuel, value: entry.perc };
  });

  return (
    <div style={{ width: "400", height: "400" }}>
      <EChart
        title={{
          text: "toto",
        }}
        style={{
          height: "100%",
          width: "100%",
        }}
        series={[
          {
            name: "Access From",
            radius: "50%",

            data: data,
            type: "pie",
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ]}
      />
    </div>
  );
};
