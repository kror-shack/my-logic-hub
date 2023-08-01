import { convertQuantifableStringToPropositonArr } from "./parseQuantifiableInputHelpers";

describe("convert string to proposition", () => {
  it("handles unspaced negation", () => {
    const result = convertQuantifableStringToPropositonArr(
      " \u2200(x) p^x -> ~q^x"
    );
    const expected = ["forall[x]", "p^x", "->", "~q^x"];
    expect(result).toEqual(expected);
  });
});
