import { getInputError } from "./getInputErrors";

describe("checkPropositionalInputForError", () => {
  it("should return an error message for quantifiers", () => {
    const input = "\u2203(x)(P)";
    const result = getInputError([input], false, input);
    expect(result).toEqual(
      "Error on premise 1:  Quantifiers are not within the scope of propositional logic. Please see First Order Predicate Logic Pages"
    );
  });
});

describe("checkQLInputForErrors", () => {
  it("should not allow variables with parantheses", () => {
    const input = "\u2203(x)";
    const result = getInputError([input], true, input);
    expect(result).toEqual(
      "Error on premise 1:  The quantifier and its variable must exist side by side"
    );
  });
});
