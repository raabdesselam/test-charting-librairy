import { EChart } from "@kbox-labs/react-echarts";

import * as React from "react";
export type LineChartAnalysisComponentProps = {};
export const LineChartAnalysisComponent: React.FC<
  LineChartAnalysisComponentProps
> = (props: LineChartAnalysisComponentProps) => {
  const data1 = [
    ["2022-10-17", 300],
    ["2022-10-18", 100],
    ["2022-10-19", 200],
    ["2022-10-20", 400],
  ];

  const data2 = [
    ["2022-10-17", 600 ],
    ["2022-10-18", 100 ],
    ["2022-10-19", 400 ],
    ["2022-10-20", 900 ],
  ];

  return (
    <div style={{ width: "400", height: "400" }}>
      <EChart
        style={{
          height: "100%",
          width: "100%",
        }}
        tooltip={{
          trigger: "axis",
        }}
        xAxis={{
          type: "category",
        }}
        yAxis={{
          type: "value",
          boundaryGap: [0, "30%"],
        }}
        series={[
          {
            name: "s1",

            data: data1,
            type: "line",
            
          },
          {
            name: "s2",

            data: data2,
            type: "line",
            
          },
        ]}
      />
    </div>
  );
};
