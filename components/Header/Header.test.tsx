import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

function setupComponent(heading: string, home = false) {
  render(<Header heading={heading} home={home} />);
}

describe("Header", () => {
  it("checks that that it displays the correct heading", () => {
    setupComponent("Logic Venn");
    const paragraph = screen.getByRole("heading", { name: "Logic Venn" });
    expect(paragraph).toBeInTheDocument();
  });
  it("checks that it displays home button on calculator page", () => {
    setupComponent("Logic Venn");
    const homeButton = screen.getByRole("link", { name: /home/i });
    expect(homeButton).toBeInTheDocument();
  });
  it("checks that it does not display home button on main page", () => {
    setupComponent("Main Page", true);
    const homeButton = screen.queryByRole("link", { name: /home/i });
    expect(homeButton).not.toBeInTheDocument();
  });
});

export {};
