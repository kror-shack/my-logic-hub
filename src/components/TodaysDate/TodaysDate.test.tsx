import React from "react";
import { render, screen } from "@testing-library/react";
import TodaysDate from "./TodaysDate";
import "@testing-library/jest-dom/extend-expect";

describe("Todays Date", () => {
  test("TodaysDate displays the current date in the expected format", () => {
    const mockDate = new Date("2022-09-06T12:00:00");
    const realDate = Date;

    global.Date = mockDate.constructor as DateConstructor;

    render(<TodaysDate />);

    const expectedDateFormat = /\d{2}\/\d{2}\/\d{2}/;

    const dateElement = screen.getByText(expectedDateFormat);

    expect(dateElement).toBeInTheDocument();

    global.Date = realDate;
  });
});

export {};
