import checkForContradiction from "./checkForContradiction";

describe("getDeductionSteps", () => {
  it("test 1", () => {
    expect(checkForContradiction([["p"], ["~p"]], [])).toEqual(true);
  });
  it("test 2 --null test", () => {
    expect(checkForContradiction([["p"], ["~q"]], [])).toEqual(false);
  });
});
