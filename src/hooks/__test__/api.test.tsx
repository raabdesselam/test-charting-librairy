import React from "react";
import { renderHook, waitFor, cleanup } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGenerateApi } from "../api";
import nock from "nock";
import { AnalyticsResponse } from "../../types/analyticsResponse";
import { FuelStat } from "../../types/fuelStats";

afterAll(() => {
  cleanup();
});

test("generation api should handle correctly 200 ok", async () => {
  const report: AnalyticsResponse<FuelStat> = {
    from: "2019-08-12T12:30Z",
    to: "2019-08-12T13:00Z",
    generationmix: [
      {
        fuel: "biomass",
        perc: 29.8,
      },
      {
        fuel: "coal",
        perc: 70.2,
      },
    ],
  };

  nock("https://api.carbonintensity.org.uk")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get("/generation")
    .reply(200, {
      data: report,
    });

  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const { result} = renderHook(() => useGenerateApi(), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual(report);
});


test("generation api should handle error", async () => {
  
  nock("https://api.carbonintensity.org.uk")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get("/generation")
    .replyWithError('error');

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const { result } = renderHook(() => useGenerateApi(), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(false));


});

