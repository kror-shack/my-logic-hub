import parseQuantifiableInput from "./parseQuantifiableInput";

describe("convert string to proposition", () => {
  it("test 1", () => {
    const result = parseQuantifiableInput(" \u2200(x) Px -> ~Qx");
    const expected = ["\u2200(x)", "Px", "->", "~Qx"];
    expect(result).toEqual(expected);
  });
  it("test 2", () => {
    const result = parseQuantifiableInput("\u2200(x) Px -> Qx");
    const expected = ["\u2200(x)", "Px", "->", "Qx"];
    expect(result).toEqual(expected);
  });
});

export {};
