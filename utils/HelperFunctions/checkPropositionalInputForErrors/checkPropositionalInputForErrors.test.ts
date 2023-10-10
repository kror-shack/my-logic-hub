import checkPropositionalInputForErrors from "./checkPropositionalInputForErrors";

describe("checkPropositionalInputForError", () => {
  it("should return an error message for quantifiers", () => {
    const input = "\u2203(x)(P)";
    const result = checkPropositionalInputForErrors(input);
    expect(result).toEqual(
      "Quantifiers are not within the scope of propositional logic. Please see First Order Predicate Logic Pages"
    );
  });
  it("should return an error message for lowercase letters", () => {
    const input = "P -> (Qa & R)";
    const result = checkPropositionalInputForErrors(input);
    expect(result).toEqual(
      "Use of lowercase letters as predicates is not recommended."
    );
  });
});

describe("should allow correct wffs", () => {
  it("should return an error message for quantifiers", () => {
    const input = "(~S&~H)->D";
    const result = checkPropositionalInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("should return an error message for lowercase letters", () => {
    const input = "~H->R";
    const result = checkPropositionalInputForErrors(input);
    expect(result).toEqual(false);
  });
});

export {};
