import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import VennDiagramFooter from "./VennDiagramFooter";

describe("VennDiagramHeader", () => {
  it("displays the footer as 'Contact us'", () => {
    render(<VennDiagramFooter />);
    const footerElement = screen.getByText("Contact us");
    expect(footerElement).toBeInTheDocument();
  });
});
export {};
