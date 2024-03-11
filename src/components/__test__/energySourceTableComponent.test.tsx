import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import renderer  from "react-test-renderer";
import "@testing-library/jest-dom";
import { EnergySourceTableComponent } from "../energySrouceTableComponent";
import { AnalyticsResponse } from "../../types/analyticsResponse";
import { FuelStat } from "../../types/fuelStats";

//https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), 
      removeListener: jest.fn(), 
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

afterAll(() => {
  cleanup();
});

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

test("table report should render correctly", () => {
  render(<EnergySourceTableComponent {...{ report: report }} />);
  const table = screen.getByRole("table");

  expect(table).toHaveTextContent("Energy Source");
  expect(table).toHaveTextContent("Percentage");
});


test("table report should match snapshot", () => {
  const tree = renderer.create(<EnergySourceTableComponent {...{ report: report }} />).toJSON();
  expect(tree).toMatchSnapshot()
});
