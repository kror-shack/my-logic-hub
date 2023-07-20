import { convertStringToPropositionArr } from "./parsePropositionalInputHelpers";

describe("convert string to proposition", () => {
  it("handles unspaced negation", () => {
    const result = convertStringToPropositionArr("p -> ~q");
    const expected = ["p", "->", "~q"];
    expect(result).toEqual(expected);
  });
  it("handles spaced negation", () => {
    const result = convertStringToPropositionArr("p- > ~ q");
    const expected = ["p", "->", "~q"];
    expect(result).toEqual(expected);
  });

  it("handles double negation", () => {
    const result = convertStringToPropositionArr("p- > ~ ~ q");
    const expected = ["p", "->", "q"];
    expect(result).toEqual(expected);
  });

  it("handles triple negation", () => {
    const result = convertStringToPropositionArr("p- > ~ ~ ~ q");
    const expected = ["p", "->", "~q"];
    expect(result).toEqual(expected);
  });

  it("handles 5x negation", () => {
    const result = convertStringToPropositionArr("p- > ~ ~ ~ ~ ~ q");
    const expected = ["p", "->", "~q"];
    expect(result).toEqual(expected);
  });

  it("handles 6x negation", () => {
    const result = convertStringToPropositionArr("p- > ~ ~ ~ ~ ~ ~ q");
    const expected = ["p", "->", "q"];
    expect(result).toEqual(expected);
  });

  it("handles quantifiable expression", () => {
    const result = convertStringToPropositionArr("A^x->B^x");
    const expected = ["A^x", "->", "B^x"];
    expect(result).toEqual(expected);
  });
});

export {};
