import { convertQuantifableStringToPropositonArr } from "./parseQuantifiableInputHelpers";

describe("convert string to proposition", () => {
  it("test 1", () => {
    const result = convertQuantifableStringToPropositonArr(
      " \u2200(x) Px -> ~Qx"
    );
    const expected = ["\u2200(x)", "P", "x", "->", "~Q", "x"];
    expect(result).toEqual(expected);
  });
  it("test 2", () => {
    const result =
      convertQuantifableStringToPropositonArr("\u2200(x) Px -> Qx");
    const expected = ["\u2200(x)", "P", "x", "->", "Q", "x"];
    expect(result).toEqual(expected);
  });
});
