import { convertStringToPropositionArr } from "./parsePropositionalInputHelpers";

describe("convert string to proposition", () => {
  it("p -> ~q", () => {
    const result = convertStringToPropositionArr("p -> ~q");
    const expected = ["p", "->", "~q"];
    expect(result).toEqual(expected);
  });
  it("p -> ~ q", () => {
    const result = convertStringToPropositionArr("p- > ~ q");
    const expected = ["p", "->", "~q"];
    expect(result).toEqual(expected);
  });
});

export {};
