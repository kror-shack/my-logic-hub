import checkQLInputForErrors from "./checkQLInputForErrors";

describe("checkQLInputForErrors", () => {
  it("should return false for valid input", () => {
    const input = "p ∧ q -> r";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(false);
  });

  it("should return an error message for negation without variable", () => {
    const input = "~ -> p";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Negation must be followed by a variable or a bracket"
    );
  });

  it("should return an error message for unmatched closing bracket", () => {
    const input = "p ∧ q ∨ r)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Closing bracket ')' without matching opening bracket '('"
    );
  });

  it("should return an error message for invalid operator placement", () => {
    const input = "(p ->) q";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual("Invalid placement of operator '->'");
  });

  it("should return an error message for unallowed element", () => {
    const input = "p # q";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual("Invalid element '#' found in the input string");
  });

  it("should not allow variables with parantheses", () => {
    const input = "\u2203(x)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "The quantifier and its variable must exist side by side"
    );
  });

  it("should not allow predicates within quantifier scope", () => {
    const input = "\u2203Px(p)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Predicates cannot exist as variables within quantifiers"
    );
  });

  it("should not allow quantifiers within quantifier scope", () => {
    const input = "\u2203\u2200p";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Quantifiers cannot exist as variables within quantifiers"
    );
  });

  it("should not allow two predicates side by side", () => {
    const input = "PPx -> Qr";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Predicates P and P cannot exist side by side without an operator between them."
    );
  });

  it("should not allow two variables for a quantifier", () => {
    const input = "\u2203xp";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Please consider using different quantifiers for different variables. Eg:- \u2200x \u2200y instead of \u2200xy"
    );
  });

  it("should only allow for quantifier scoped within brackets", () => {
    const input = "\u2203xPx";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Please consider enclosing the scope of the quantifier within parantheses i.e. ∃x(Px)"
    );
  });

  it("should allow correct wff", () => {
    const input = "∃x(Px ∧ ∀y(Py -> Axy))";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(false);
  });
});

export {};
