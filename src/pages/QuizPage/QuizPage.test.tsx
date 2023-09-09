import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import QuizPage from "./QuizPage";

function setupComponent() {
  render(
    <MemoryRouter>
      <QuizPage />
    </MemoryRouter>
  );
}

describe("Quiz Page", () => {
  it.only("checks that it renders the header", () => {
    setupComponent();
    const homeButton = screen.getByRole("link", { name: /home/i });
    expect(homeButton).toBeInTheDocument();
    const heading = screen.getByRole("heading", {
      name: /quiz page/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("checks that it has two different texts", () => {
    setupComponent();
    const texts = screen.getAllByRole("text");
    expect(texts).toHaveLength(2);
  });

  it("checks that it has a form", () => {
    setupComponent();
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  it("checks that it has two radio buttons", () => {
    setupComponent();
    const radio1 = screen.getByLabelText("Option 1");
    const radio2 = screen.getByLabelText("Option 2");
    expect(radio1).toBeInTheDocument();
    expect(radio2).toBeInTheDocument();
  });

  it("checks that it has a submit button", () => {
    setupComponent();
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
  });
});

export {};
