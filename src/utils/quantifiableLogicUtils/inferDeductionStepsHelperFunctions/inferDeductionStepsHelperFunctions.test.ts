import { getInstantiation } from "./inferDeductionStepsHelperFunctions";

describe("getInstantiation function", () => {
  it('should replace the letter after the power symbol "^" with the provided constant', () => {
    const stringArray = ["\u2203(k)", "Pk", "Qk", "Rk"];
    const constantValue = "x";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual(["Px", "Qx", "Rx"]);
  });

  it("should only deal with variables present in the quanifier", () => {
    const stringArray = ["\u2203(a)", "Aa + Bb", "Cc = Dd"];
    const constantValue = "K";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual(["AK + Bb", "Cc = Dd"]);
  });

  it("should deal with multiple variables present", () => {
    const stringArray = ["\u2203(a)", "Axa + Bb", "Cxc = Dd"];
    const constantValue = "B";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual(["AxB + Bb", "Cxc = Dd"]);
  });

  it("test 4", () => {
    const stringArray = ["\u2203(x)", "Ax", "->", "~Bx"];
    const constantValue = "a";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual(["Aa", "->", "~Ba"]);
  });

  it("test 5", () => {
    const stringArray = ["\u2203(x)", "Gx", "&", "Axf"];
    const constantValue = "a";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual(["Ga", "&", "Aaf"]);
  });

  it("test 6", () => {
    const stringArray = [
      "\u2200(x)",
      "Wx",
      "->",
      "\u2200(y)",
      "(",
      "Gy",
      "->",
      "Axy",
      ")",
    ];
    const constantValue = "a";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual([
      "Wa",
      "->",
      "\u2200(y)",
      "(",
      "Gy",
      "->",
      "Aay",
      ")",
    ]);
  });
  it("test 7", () => {
    const stringArray = ["\u2203(y)", "(", "Py", "->", "Ayy", ")"];
    const constantValue = "g";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual(["Pg", "->", "Agg"]);
  });

  it("test 8", () => {
    const stringArray = ["\u2203(y)", "(", "Py", "->", "Ayy", ")"];
    const constantValue = "0";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual(["P0", "->", "A00"]);
  });

  it("test 9", () => {
    const stringArray = [
      "\u2203(y)",
      "(",
      "(",
      "Py",
      "->",
      "Ay",
      ")",
      "->",
      "Wy",
      ")",
    ];
    const constantValue = "0";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual(["(", "P0", "->", "A0", ")", "->", "W0"]);
  });
});
