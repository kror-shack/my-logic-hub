import validateTruthTableInput from "./validateTruthTableInput";

describe("checkPropositionalInputForError", () => {
  it("should return an error message for quantifiers", () => {
    const input = "\u2203(x)(P)";
    const result = validateTruthTableInput(input);
    expect(result).toEqual(
      "Quantifiers are not within the scope of propositional logic. Please see First Order Predicate Logic Pages"
    );
  });
  it("should throw an error for mixed predicates without an operator betweeen them", () => {
    const input = "P -> (Qa & R)";
    const result = validateTruthTableInput(input);
    expect(result).toEqual(
      "The predicates Q and a must contain an operator between them. Note: case variations of the same alphabet will be treated as distinct predicates."
    );
  });
  it("should throw an error for empty premises", () => {
    const input = "";
    const result = validateTruthTableInput(input);
    expect(result).toEqual("No argument has been passed to the input.");
  });
  it("should throw an error for invalid element", () => {
    const input = "(P-> Q) -> R %";
    const result = validateTruthTableInput(input);
    expect(result).toEqual("Invalid element '%' found in the input string.");
  });
});

describe("should allow correct wffs", () => {
  it("should return an error message for quantifiers", () => {
    const input = "(~S&~H)->D";
    const result = validateTruthTableInput(input);
    expect(result).toEqual(false);
  });
  it("should not return an error message for lowercase letters", () => {
    const input = "~H->r";
    const result = validateTruthTableInput(input);
    expect(result).toEqual(false);
  });
  it("test 3", () => {
    const input = "( Q -> S ) | ( R & T) ";
    const result = validateTruthTableInput(input);
    expect(result).toEqual(false);
  });
  it("test 4", () => {
    const input = "(( Q -> S ) & ( R & T)) -> P";
    const result = validateTruthTableInput(input);
    expect(result).toEqual(false);
  });
});

export {};

export {};
