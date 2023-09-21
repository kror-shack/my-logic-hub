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

describe.skip("MainPage", () => {
  it("displays a popup on the first load", () => {
    const popup = screen.getByTestId("alertdialog"); // Replace with your popup's data-testid
    expect(popup).toBeInTheDocument();
    const popupContent = screen.getByText("something here");
    expect(popupContent).toBeInTheDocument();
    const okButton = screen.getByText("OK");
    expect(okButton).toBeInTheDocument();
  });

  it("hides the popup when OK button is clicked", () => {
    const popup = screen.getByTestId("popup"); // Replace with your popup's data-testid
    const okButton = screen.getByText("OK");

    fireEvent.click(okButton);
    expect(popup).not.toBeInTheDocument();
  });
});

// describe("MainPage", () => {
//   test("renders MainPage component", () => {
//     render(
//       <Router>
//         <MainPage />
//       </Router>
//     );

//     const headingElement = screen.getByText(/Main Page/i);
//     const vennDiagramButton = screen.getByText(/Venn Diagram Page/i);
//     const calculator2Button = screen.getByText(/Calculator 2/i);
//     const calculator3Button = screen.getByText(/Calculator 3/i);

//     expect(headingElement).toBeInTheDocument();
//     expect(vennDiagramButton).toBeInTheDocument();
//     expect(calculator2Button).toBeInTheDocument();
//     expect(calculator3Button).toBeInTheDocument();
//   });
// });

export {};
