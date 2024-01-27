import checkInputForErrors from "./checkInputForError";

describe("checkInputForErrors", () => {
  it("should return error for invalid wff", () => {
    const input = "P ∧ Q -> R";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "The expression is ambiguous and requires parentheses to clarify the logical grouping."
    );
  });

  it("should return an error message for negation without variable", () => {
    const input = "¬ -> P";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "Negation must be followed by a variable or a bracket"
    );
  });

  it("should return an error message for unmatched closing bracket", () => {
    const input = "P) ∧ Q ∨ R";
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
    expect(result).toEqual("Invalid element '#' found in the input string.");
  });

  it("should not allow two predicates side by side", () => {
    const input = "S -> QR";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "The predicates Q and R must contain an operator between them. Uppercase alphabets are treated as predicates whereas lowercase letters are treated as consants, and variables."
    );
  });

  it("should not allow two predicates side by side -- 2", () => {
    const input = "SS -> Q";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "The predicates S and S must contain an operator between them. Uppercase alphabets are treated as predicates whereas lowercase letters are treated as consants, and variables."
    );
  });

  it("should not allow two predicates side by side -- 3", () => {
    const input = "¬PS";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "The predicates P and S must contain an operator between them. Uppercase alphabets are treated as predicates whereas lowercase letters are treated as consants, and variables."
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
  it("should throw error for empty brackets", () => {
    const input = "()f";
    const result = checkInputForErrors(input);
    expect(result).toEqual("Parantheses must contains wffs between them.");
  });
  it("should throw error for invalid placement", () => {
    const input = "\u2203x (Gx & Axf)k";
    const result = checkInputForErrors(input);
    expect(result).toEqual("Invalid placement of predicate 'k'");
  });
  it("should throw error for invalid placement -2", () => {
    const input = "\u2203x (Gx & Axf)K";
    const result = checkInputForErrors(input);
    expect(result).toEqual("Invalid placement of predicate 'K'");
  });
  it("should throw error for backslash", () => {
    const input = "\\k";
    const result = checkInputForErrors(input);
    expect(result).toEqual("Invalid element '\\' found in the input string.");
  });
});

describe("should allow correct wffs", () => {
  it("test 1", () => {
    const input = "(S ∨ R) -> (¬P -> Q)";
    const result = checkInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("test 2", () => {
    const input = "∃x(Px ∧ ∀y(Py -> Axy))";
    const result = checkInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("test 3", () => {
    const input = "\u2200x(Wx->\u2200y(Gy -> Axy))";
    const result = checkInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("test 4", () => {
    const input = "\u2203x (Gx & Axf)";
    const result = checkInputForErrors(input);
    expect(result).toEqual(false);
  });
});

export {};
