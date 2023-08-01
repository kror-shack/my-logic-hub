import inferDeductionSteps from "./inferDeductionSteps"; // Replace this with the correct path to your function

describe("inferDeductionSteps function", () => {
  // it("test - 1", () => {
  //   const premiseArr = [
  //     ["forall[x]", "A^x", "->", "~B^x"],
  //     ["forsome[x]", "C^x", "&", "A^x"],
  //   ];
  //   const conclusionArr = ["forsome[x]", "C^x", "&", "~B^x"];
  //   const result = inferDeductionSteps(premiseArr, conclusionArr);
  //   expect(result).toEqual(true);
  // });
  // it("test - 2 --invalid", () => {
  //   const premiseArr = [
  //     ["forall[x]", "D^x", "->", "~E^x"],
  //     ["forall[x]", "E^x", "->", "F^x"],
  //   ];
  //   const conclusionArr = ["forsome[x]", "F^x", "->", "~D^x"];
  //   const result = inferDeductionSteps(premiseArr, conclusionArr);
  //   expect(result).toEqual(false);
  // });
  // it("test - 3", () => {
  //   const premiseArr = [
  //     ["forall[x]", "H^x", "->", "(", "E^x", "&", "D^x", ")"],
  //     ["forall[x]", "H^x", "&", "S^x"],
  //   ];
  //   const conclusionArr = ["forsome[x]", "E^x", "&", "S^x"];
  //   const result = inferDeductionSteps(premiseArr, conclusionArr);
  //   expect(result).toEqual(true);
  // });
  // it("test - 4", () => {
  //   const premiseArr = [
  //     ["forall[x]", "H^x", "->", "(", "E^x", "&", "D^x", ")"],
  //     ["forall[x]", "H^x", "&", "S^x"],
  //   ];
  //   const conclusionArr = ["forsome[x]", "E^x", "&", "S^x"];
  //   const result = inferDeductionSteps(premiseArr, conclusionArr);
  //   expect(result).toEqual(true);
  // });
});
