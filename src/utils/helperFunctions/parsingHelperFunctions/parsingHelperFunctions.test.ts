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

  it("test 1", () => {
    const result = convertPremiseToArray(" \u2200x Px -> ~Qx");
    const expected = ["\u2200(x)", "P", "x", "->", "~Q", "x"];
    expect(result).toEqual(expected);
  });
  it("test 2", () => {
    const result = convertPremiseToArray("\u2200x Px -> Qx");
    const expected = ["\u2200(x)", "P", "x", "->", "Q", "x"];
    expect(result).toEqual(expected);
  });

  it("handles double negation when removeNegations is set to true", () => {
    const result = convertPremiseToArray("~~p- > q", true);
    const expected = ["~~p", "->", "q"];
    expect(result).toEqual(expected);
  });

  it("handles wffs when removeNegations is set to true", () => {
    const result = convertPremiseToArray("(p->(p->q))->(p->q)", true);
    const expected = [
      "(",
      "p",
      "->",
      "(",
      "p",
      "->",
      "q",
      ")",
      ")",
      "->",
      "(",
      "p",
      "->",
      "q",
      ")",
    ];
    expect(result).toEqual(expected);
  });
  it("handles wffs when removeNegations is set to true -2", () => {
    const result = convertPremiseToArray("((p->q)->q)->((q->p)->p)", true);
    const expected = [
      "(",
      "(",
      "p",
      "->",
      "q",
      ")",
      "->",
      "q",
      ")",
      "->",
      "(",
      "(",
      "q",
      "->",
      "p",
      ")",
      "->",
      "p",
      ")",
    ];

    expect(result).toEqual(expected);
  });
  it("handles single negation when removeNegations is set to true ", () => {
    const result = convertPremiseToArray("~(p->~q)", true);
    const expected = ["~", "(", "p", "->", "~q", ")"];

    expect(result).toEqual(expected);
  });
});

export {};
