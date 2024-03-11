import React, { FC } from "react";
import { Table, TableProps } from "antd";
import { AnalyticsResponse } from "../types/analyticsResponse";
import { FuelStat } from "../types/fuelStats";

export interface EnergySourceTableComponentProps extends TableProps {
  report: AnalyticsResponse<FuelStat>;
}

export const EnergySourceTableComponent: FC<EnergySourceTableComponentProps> = ({
  report,
  ...props
}) => {
  const columns = [
    {
      title: "Energy Source",
      dataIndex: "energySource",
      key: "energySource",
    },
    {
      title: "Percentage(%)",
      dataIndex: "percentage",
      key: "percentage",
    },
  ];

  const dataSource = report.generationmix.map((entry) => {
    return {
      key: entry.fuel,
      energySource: entry.fuel,
      percentage: entry.perc,
    };
  });

  return <Table dataSource={dataSource} columns={columns} {...props} />;
};
