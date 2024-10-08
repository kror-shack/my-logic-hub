import parseSymbolicLogicInput from "./parseSymbolicLogicInput";

describe("convert string to proposition", () => {
  it("test 1", () => {
    const result = parseSymbolicLogicInput(" \u2200x Px -> ~Qx");
    const expected = ["\u2200(x)", "Px", "->", "~Qx"];
    expect(result).toEqual(expected);
  });
  it("test 2", () => {
    const result = parseSymbolicLogicInput("\u2200x Px -> Qx");
    const expected = ["\u2200(x)", "Px", "->", "Qx"];
    expect(result).toEqual(expected);
  });
  it("test 3", () => {
    const result = parseSymbolicLogicInput("\u2200x Px -> \u2200y(Qy)");
    const expected = ["\u2200(x)", "Px", "->", "\u2200(y)", "(", "Qy", ")"];
    expect(result).toEqual(expected);
  });
  it("test 4", () => {
    const result = parseSymbolicLogicInput("\u2200x Px -> \u2200y(Qy)");
    const expected = ["\u2200(x)", "Px", "->", "\u2200(y)", "(", "Qy", ")"];
    expect(result).toEqual(expected);
  });

  it("test 5", () => {
    const result = parseSymbolicLogicInput("WA");
    const expected = ["WA"];
    expect(result).toEqual(expected);
  });
  it("test 6", () => {
    const result = parseSymbolicLogicInput("∀x ~∃y(Fx <-> Gy)");
    const expected = ["∀(x)", "~", "∃(y)", "(", "Fx", "<->", "Gy", ")"];
    expect(result).toEqual(expected);
  });
  it("test 7", () => {
    const result = parseSymbolicLogicInput("∃y ~∀x(Fx <-> Gy)");
    const expected = ["∃(y)", "~", "∀(x)", "(", "Fx", "<->", "Gy", ")"];
    expect(result).toEqual(expected);
  });
});
