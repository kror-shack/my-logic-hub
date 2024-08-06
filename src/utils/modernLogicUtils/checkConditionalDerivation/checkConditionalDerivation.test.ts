import { checkConditionalDerivation } from "./checkConditionalDerivation";

describe("check conditional derivation", () => {
  it("test 1", () => {
    const expected = [["q"]];
    expect(
      checkConditionalDerivation(["p", "->", "q"], [], [["q"]], [["q"]])
    ).toEqual(true);
  });
  it("test 2", () => {
    expect(
      checkConditionalDerivation(["p", "->", "s"], [], [["r"]], [["r"]])
    ).toEqual(false);
  });
  it("test 3", () => {
    const expected = [["r"], ["r", "|", "s"]];
    expect(
      checkConditionalDerivation(
        ["p", "->", "(", "r", "|", "s", ")"],
        [],
        [["r"]],
        [["r"]]
      )
    ).toEqual(true);
  });
  it("test 4", () => {
    expect(
      checkConditionalDerivation(
        ["p", "->", "(", "r", "&", "s", ")"],
        [],
        [["r"], ["s"]],
        [["r"], ["s"]]
      )
    ).toEqual(true);
  });
  it("test 5", () => {
    expect(
      checkConditionalDerivation(
        ["p", "->", "(", "r", "->", "s", ")"],
        [],
        [["r"], ["s"]],
        [["r"], ["s"]]
      )
    ).toEqual(true);
  });
});
