import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReportIssuePage from "./page";
import userEvent from "@testing-library/user-event";

function setupComponent() {
  render(<ReportIssuePage />);
}

describe("Report Issue Page", () => {
  it("checks if it displays all feilds", async () => {
    setupComponent();
    const emailLabel = screen.getByText("Email:");
    const input = screen.getByPlaceholderText("If you'd like to be updated.");
    const radioLabel = screen.getByText(
      "Q) Which page did the issue occur on?"
    );

    const radioPLCalc = screen.getByRole("radio", { name: "PL Calculator" });
    const radioQLCalc = screen.getByRole("radio", {
      name: "QL Calculator",
    });
    const radioSemantic = screen.getByRole("radio", {
      name: "Semantic Tableaux",
    });
    // const radioQLIndirect = screen.getByRole("radio", {
    //   name: "QL Indirect Proof",
    // });
    const radioPLIndirect = screen.getByRole("radio", {
      name: "PL Indirect Proof",
    });
    const radioVennWizard = screen.getByRole("radio", {
      name: "Logic Venn",
    });
    const radioTruthTable = screen.getByRole("radio", {
      name: "Truth Table Generator",
    });
    const radioOther = screen.getByRole("radio", { name: "Other" });
    const RadioSecondlabel = screen.getByText(
      "Q) Was the issue technical or logical?"
    );
    const technicalRadioButton = screen.getByRole("radio", {
      name: "Technical",
    });
    const logicalRadioButton = screen.getByRole("radio", {
      name: "Logical",
    });
    const textarea = screen.getByPlaceholderText(
      "Please describe the issue that you are facing in detail."
    );
    const submitButton = screen.getByRole("button", { name: "Report" });

    expect(submitButton).toBeInTheDocument();
    expect(screen.getByRole("heading").textContent).toMatch(/report issue/i);
    const textAreaLabel = screen.getByText("Describe the issue:");
    expect(emailLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(emailLabel).toHaveAttribute("for", "user_email");
    expect(input).toHaveAttribute("id", "user_email");
    expect(input).toHaveAttribute("type", "email");
    expect(radioLabel).toBeInTheDocument();
    expect(radioPLCalc).toBeInTheDocument();
    expect(radioQLCalc).toBeInTheDocument();
    expect(radioSemantic).toBeInTheDocument();
    // expect(radioQLIndirect).toBeInTheDocument();
    expect(radioPLIndirect).toBeInTheDocument();
    expect(radioVennWizard).toBeInTheDocument();
    expect(radioTruthTable).toBeInTheDocument();
    expect(radioOther).toBeInTheDocument();
    expect(radioPLCalc).toBeRequired();
    expect(RadioSecondlabel).toBeInTheDocument();
    expect(technicalRadioButton).toBeInTheDocument();
    expect(logicalRadioButton).toBeInTheDocument();
    expect(technicalRadioButton).toBeRequired();
    expect(textAreaLabel).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("name", "message");
    expect(textarea).toHaveAttribute("rows", "4");
    expect(textarea).toHaveAttribute(
      "placeholder",
      "Please describe the issue that you are facing in detail."
    );
    expect(textarea).toBeRequired();
  });

  it("checks basic user interactions", async () => {
    setupComponent();
    const emailInput = screen.getByPlaceholderText(
      "If you'd like to be updated."
    );
    const user = userEvent.setup();
    const technicalRadioButton = screen.getByRole("radio", {
      name: "Technical",
    });
    const radioPLCalc = screen.getByRole("radio", {
      name: "PL Calculator",
    });
    const radioFOLCalc = screen.getByRole("radio", {
      name: "QL Calculator",
    });

    const textarea = screen.getByPlaceholderText(
      "Please describe the issue that you are facing in detail."
    );
    await user.type(emailInput, "example@example.com");
    await user.click(radioPLCalc);
    await userEvent.click(technicalRadioButton);
    await userEvent.type(textarea, "This is a test description.");
    expect(emailInput).toHaveValue("example@example.com");
    expect(radioPLCalc).toBeChecked();
    expect(radioFOLCalc).not.toBeChecked();
    expect(technicalRadioButton).toBeChecked();
    expect(textarea).toHaveValue("This is a test description.");
  });

  it("does not send the email with the missing data", async () => {
    setupComponent();

    const user = userEvent.setup();

    const logicalRadioButton = screen.getByRole("radio", { name: "Logical" });
    user.click(logicalRadioButton);

    const textarea = screen.getByRole("textbox", { name: "form message" });

    user.type(textarea, "This is a test description.");
    const sendEmail = jest.fn();
    const submitButton = screen.getByRole("button", { name: /report/i });
    user.click(submitButton);
    expect(sendEmail).not.toHaveBeenCalled();
  });
});

export {};
