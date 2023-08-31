import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ReportIssuePage from "./ReportIssuePage";
import { MemoryRouter } from "react-router-dom";

describe("Report Issue Page", () => {
  it("displays user input form", () => {
    render(
      <MemoryRouter>
        <ReportIssuePage />
      </MemoryRouter>
    );
    const submitButton = screen.getByRole("button", { name: /report/i });

    fireEvent.click(submitButton);

    const errorMessage = screen.queryByRole("alert");
    expect(errorMessage).toBeInTheDocument();
    // const popupContent = screen.getByText("something here");
    // expect(popupContent).toBeInTheDocument();

    // const okButton = screen.getByText("OK");
    // expect(okButton).toBeInTheDocument();
  });

  it.skip("hides the popup when OK button is clicked", () => {
    const popup = screen.getByTestId("popup"); // Replace with your popup's data-testid
    const okButton = screen.getByText("OK");

    fireEvent.click(okButton);
    expect(popup).not.toBeInTheDocument();
  });
});

export {};
