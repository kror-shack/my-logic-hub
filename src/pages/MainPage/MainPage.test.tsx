import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MainPage from "./MainPage";
import {
  BrowserRouter,
  createMemoryRouter,
  MemoryRouter,
  Router,
  RouterProvider,
} from "react-router-dom";

function setupComponent() {
  render(
    <MemoryRouter>
      <MainPage firstRender={true} setFirstRender={() => {}} />
    </MemoryRouter>
  );
}

describe("MainPage", () => {
  it("displays a popup on the first load", () => {
    setupComponent();
    const popup = screen.getByTestId("alertdialog");
    expect(popup).toBeInTheDocument();
    const okButton = screen.getByText("OK");
    expect(okButton).toBeInTheDocument();
  });

  it("hides the popup when OK button is clicked", () => {
    setupComponent();

    const popup = screen.getByTestId("alertdialog");
    const okButton = screen.getByText("OK");

    fireEvent.click(okButton);
    expect(popup).not.toBeInTheDocument();
  });
});

export {};
