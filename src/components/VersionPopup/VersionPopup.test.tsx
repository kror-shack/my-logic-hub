import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import VersionPopup from "./VersionPopup";
import TruthTableBody from "../TruthTableBody/TruthTableBody";
import MainPage from "../../pages/MainPage/MainPage";

const onClose = () => {};

function setupComponent() {
  localStorage.clear();
  <MemoryRouter>
    <MainPage firstRender={true} setFirstRender={() => {}} />
    {/* <VersionPopup onClose={onClose} /> */}
  </MemoryRouter>;
}

describe("Version Popup", () => {
  it.skip("Renders the alert", () => {
    setupComponent();

    const alertHeading = screen.getByRole("heading", {
      name: /Welcome to the Beta Version!/i,
    });
    const alertMessage = screen.getByText(
      /Please note that this version is in its early stages of development and may have some rough edges. Your valuable feedback will help us improve the experience for everyone/i
    );
    const alertEnding = screen.getByText(
      / Thank you for being part of this exciting phase! best egards,/i
    );
    expect(alertMessage).toBeInTheDocument();
    expect(alertHeading).toBeInTheDocument();
    expect(alertEnding).toBeInTheDocument();
  });
});

export {};
