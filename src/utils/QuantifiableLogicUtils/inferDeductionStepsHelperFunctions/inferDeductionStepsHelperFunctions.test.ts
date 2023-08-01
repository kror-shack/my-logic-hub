import { getInstantiation } from "./inferDeductionStepsHelperFunctions";

describe("getInstantiation function", () => {
  it('should replace the letter after the power symbol "^" with the provided constant', () => {
    const stringArray = ["forall[k]", "P^k", "Q^k", "R^k"];
    const constantValue = "x";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual(["P^x", "Q^x", "R^x"]);
  });

  it("should only deal with variables present in the quanifier", () => {
    const stringArray = ["forall[a]", "A^a + B^b", "C^c = D^d"];
    const constantValue = "K";
    const updatedArray = getInstantiation(stringArray, constantValue);

    expect(updatedArray).toEqual(["A^K + B^b", "C^c = D^d"]);
  });
});
