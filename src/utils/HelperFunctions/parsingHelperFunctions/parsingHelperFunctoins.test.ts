import { convertPremiseToArray } from "./parsingHelperFunctions";

describe("convert string to proposition", () => {
  it("handles unspaced negation", () => {
    const result = convertPremiseToArray("p -> ~q");
    const expected = ["p", "->", "~q"];
    expect(result).toEqual(expected);
  });
  it("handles spaced negation", () => {
    const result = convertPremiseToArray("p- > ~ q");
    const expected = ["p", "->", "~q"];
    expect(result).toEqual(expected);
  });

  it("handles double negation", () => {
    const result = convertPremiseToArray("p- > ~ ~ q");
    const expected = ["p", "->", "q"];
    expect(result).toEqual(expected);
  });

  it("handles triple negation", () => {
    const result = convertPremiseToArray("p- > ~ ~ ~ q");
    const expected = ["p", "->", "~q"];
    expect(result).toEqual(expected);
  });

  it("handles 5x negation", () => {
    const result = convertPremiseToArray("p- > ~ ~ ~ ~ ~ q");
    const expected = ["p", "->", "~q"];
    expect(result).toEqual(expected);
  });

  it("handles 6x negation", () => {
    const result = convertPremiseToArray("p- > ~ ~ ~ ~ ~ ~ q");
    const expected = ["p", "->", "q"];
    expect(result).toEqual(expected);
  });

  //   it("handles quantifiable expression", () => {
  //     const result = convertPremiseToArray("A^x->B^x");
  //     const expected = ["A^x", "->", "B^x"];
  //     expect(result).toEqual(expected);
  //   });

  it("test 1", () => {
    const result = convertPremiseToArray(" \u2200(x) Px -> ~Qx");
    const expected = ["\u2200(x)", "P", "x", "->", "~Q", "x"];
    expect(result).toEqual(expected);
  });
  it("test 2", () => {
    const result = convertPremiseToArray("\u2200(x) Px -> Qx");
    const expected = ["\u2200(x)", "P", "x", "->", "Q", "x"];
    expect(result).toEqual(expected);
  });
});

export {};
