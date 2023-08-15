import checkQLInputForErrors from "./checkQLInputForErrors";

describe("checkQLInputForErrors", () => {
  it("should return true for valid input", () => {
    const input = "p & q -> r";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(true);
  });

  it("should return an error message for negation without variable", () => {
    const input = "~ -> p";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Negation must be followed by a variable or a bracket"
    );
  });

  it("should return an error message for unmatched closing bracket", () => {
    const input = "p & q | r)";
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

  it("should not allow variables without parantheses", () => {
    const input = "\u2203x";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "The variables of quantifiers must be contained within paranthese eg: ∃(x)"
    );
  });

  it("should not allow predicates within quantifier scope", () => {
    const input = "\u2203(Px)(p)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Predicates cannot exist as variables within quantifiers"
    );
  });

  it("should not allow quantifiers within quantifier scope", () => {
    const input = "\u2203(\u2200)(p)";
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

  it.only("should allow correct wff", () => {
    const input = "∃(x)(Px & ∀(y)(Py -> Axy))";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(true);
  });
});

export {};

export {};
