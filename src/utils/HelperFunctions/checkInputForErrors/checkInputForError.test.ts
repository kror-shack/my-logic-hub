import checkInputForErrors from "./checkInputForError";

describe("checkInputForErrors", () => {
  it("should return false for valid input", () => {
    const input = "P ∧ Q -> R";
    const result = checkInputForErrors(input);
    expect(result).toEqual(false);
  });

  it("should return an error message for negation without variable", () => {
    const input = "¬ -> P";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "Negation must be followed by a variable or a bracket"
    );
  });

  it("should return an error message for unmatched closing bracket", () => {
    const input = "P ∧ Q ∨ R)";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "Closing bracket ')' without matching opening bracket '('"
    );
  });

  it("should return an error message for invalid operator placement", () => {
    const input = "(P ->) Q";
    const result = checkInputForErrors(input);
    expect(result).toEqual("Invalid placement of operator '->'");
  });

  it("should return an error message for unallowed element", () => {
    const input = "P # Q";
    const result = checkInputForErrors(input);
    expect(result).toEqual("Invalid element '#' found in the input string");
  });

  it("should return an error message for quantifiers", () => {
    const input = "\u2203(x)(P)";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "Quantifiers are not within the scope of propositional logic. Please see First Order Predicate Logic Pages"
    );
  });

  it("should not allow two predicates side by side", () => {
    const input = "S -> QR";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "The predicates Q and R must contain an operator between them"
    );
  });

  it("should not allow two predicates side by side -- 2", () => {
    const input = "SS -> Q";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "The predicates S and S must contain an operator between them"
    );
  });

  it("should not allow two predicates side by side -- 3", () => {
    const input = "¬PS";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "The predicates P and S must contain an operator between them"
    );
  });

  it("should not allow two operators ¬ at the end", () => {
    const input = "S->¬";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "Negation must be followed by a variable or a bracket"
    );
  });

  it("should not allow two lower case letters for predicates", () => {
    const input = "S -> q";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "Use of lowercase letters as predicates is not recommended."
    );
  });
  it("should not allow empty premises", () => {
    const input = "";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "Empty premises serve no purpose. Consider removing them."
    );
  });

  it("should not allow two operatars next to one another", () => {
    const input = "(S ∨∨ R) -> (¬P -> Q)";
    const result = checkInputForErrors(input);
    expect(result).toEqual("Invalid placement of operator '∨'");
  });
});

export {};
