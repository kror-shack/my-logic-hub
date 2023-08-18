import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import MainPage from "./MainPage";

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
