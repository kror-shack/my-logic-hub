import React from "react";
import { render, screen } from "@testing-library/react";
import VennDiagramHeader from "./VennDiagramHeader";
import "@testing-library/jest-dom/extend-expect";

describe("VennDiagramHeader", () => {
  it("displays the header as 'Venn Digram Calculator'", () => {
    render(<VennDiagramHeader />);
    const headerElement = screen.getByText("Venn Digram Calculator");
    expect(headerElement).toBeInTheDocument();
  });
});
export {};
