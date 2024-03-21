import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flex } from "antd";
import { PieChartAnalytics } from "./components/pieChartAnalyticsComponent";
import { useGenerateApi } from "./hooks/api";
import { LineChartAnalysisComponent } from "./components/lineChartAnalysisComponent";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainApp />
    </QueryClientProvider>
  );
};

const MainApp: FC = () => {
  const { status, data, error, isFetching } = useGenerateApi();

  if (isFetching) return <h3>Loading...</h3>;
  if (status == "error") return <span>Error: {error.message}</span>;
  if (!data) return <h3>Something goes wrong, please reload.</h3>;

  return (
    <div>
      <h1>GB Fuel type power generation production</h1>
      <h3>Data from the past 30 minutes</h3>
      <Flex justify="space-evenly">
        <LineChartAnalysisComponent {...{}} />
        {/* here you call yor component with parameter */}

        <PieChartAnalytics
          {...{
            report: data,
            title: {
              text: "Current mix of energy generation",
            },
          }}
        />
      </Flex>
    </div>
  );
};

export { App };
