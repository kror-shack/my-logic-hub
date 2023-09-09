import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import VennCanvas from "./VennCanvas";
import "@testing-library/jest-dom/extend-expect";

/**
 * Use of jest canvas mock seems somewhat necessary
 */
describe.skip("VennCanvas", () => {
  afterEach(cleanup);
  const syllogisticFigure = {
    figure: "AAA-2",
    majorPremise: "All mortal are men",
    minorPremise: "Socrates is a man",
    majorTerm: "mortal",
    minorTerm: "socrates",
    middleTerm: "men",
    premise1: {
      subject: "mortal",
      predicate: "men",
      type: "A",
    },
    premise2: {
      subject: "socrates",
      predicate: "man",
      type: "A",
    },
    conc: {
      subject: "socrates",
      predicate: "mortal",
      type: "A",
    },
  };

  it("renders the canvas element", () => {
    render(<VennCanvas syllogisticFigure={syllogisticFigure} />);

    const canvas = screen.getByRole("canvas");
    expect(canvas).toBeInTheDocument();
  });

  type MockRenderSpyProps = {
    children: React.ReactNode;
  };

  const MockRenderSpy: React.FC<MockRenderSpyProps> = ({ children }) => {
    const renderSpy = jest.fn();
    renderSpy();
    return <>{children}</>;
  };

  it("memoizes the component", () => {
    const renderSpy = jest.fn();
    renderSpy.mockReturnValue(null);

    render(
      <MockRenderSpy>
        <VennCanvas syllogisticFigure={syllogisticFigure} />
      </MockRenderSpy>
    );

    expect(renderSpy).not.toHaveBeenCalled();
  });
});

export {};
