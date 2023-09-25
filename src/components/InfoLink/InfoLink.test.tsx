import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InfoLink from "./InfoLink";
import { MemoryRouter } from "react-router-dom";

function setupComponent() {
  render(
    <MemoryRouter>
      <InfoLink url="" />
    </MemoryRouter>
  );
}

// Mock setTimeout to control time-based operations
jest.useFakeTimers();

describe("InfoLink component", () => {
  it("renders without scrolling initially", () => {
    setupComponent();
    const linkElement = screen.getByText("info");
    expect(linkElement).toBeInTheDocument();
  });

  it("hides the link while scrolling", () => {
    setupComponent();
    const linkElement = screen.queryByText("info");
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(linkElement).not.toBeInTheDocument();
  });
});

export {};
