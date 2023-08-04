import parseSymbolicLogicInput from "./parseSymbolicLogicInput";

describe("convert string to proposition", () => {
  it("test 1", () => {
    const result = parseSymbolicLogicInput(" \u2200(x) Px -> ~Qx");
    const expected = ["\u2200(x)", "Px", "->", "~Qx"];
    expect(result).toEqual(expected);
  });
  it("test 2", () => {
    const result = parseSymbolicLogicInput("\u2200(x) Px -> Qx");
    const expected = ["\u2200(x)", "Px", "->", "Qx"];
    expect(result).toEqual(expected);
  });
  it("test 3", () => {
    const result = parseSymbolicLogicInput("\u2200(x) Px -> \u2200(y)(Qy)");
    const expected = ["\u2200(x)", "Px", "->", "\u2200(y)", "(", "Qy", ")"];
    expect(result).toEqual(expected);
  });
});
