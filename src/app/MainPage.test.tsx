import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MainPage from "./page";

function setupComponent() {
  render(<MainPage />);
}

describe("MainPage", () => {
  setupComponent();

  it("displays a popup on the first load that closes onClick", () => {
    const popup = screen.getByTestId("alertdialog");
    expect(popup).toBeInTheDocument();
    const okButton = screen.getByText("OK");
    expect(okButton).toBeInTheDocument();
    fireEvent.click(okButton);
    expect(popup).not.toBeInTheDocument();
  });
});

export {};
