import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import SubmitButton from "./SubmitButton";

const handleSubmitMock = jest.fn();

function setupComponent() {
  render(<SubmitButton handleSubmit={handleSubmitMock} name="Submit" />);
}

describe("SubmitButton component", () => {
  it("renders with the correct button name", () => {
    setupComponent();
    const buttonElement = screen.getByText("Submit");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the handleSubmit function when clicked", async () => {
    setupComponent();

    const buttonElement = screen.getByText("Submit");
    const user = userEvent.setup();
    await user.click(buttonElement);

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  it.skip("prevents default behavior when clicked", async () => {
    setupComponent();
    setupComponent();
    setupComponent();

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });
});

export {};
