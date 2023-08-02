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
});
