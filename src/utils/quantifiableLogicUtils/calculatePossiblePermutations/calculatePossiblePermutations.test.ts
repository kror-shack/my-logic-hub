import { generatePermutations } from "./calculatePossiblePermutations";

describe("generatePermutations", () => {
  it("should generate all possible permutations while keeping the length", () => {
    const inputArray = ["a", "b"];
    const expectedPermutations = [
      ["a", "a"],
      ["a", "b"],
      ["b", "a"],
      ["b", "b"],
    ];

    const permutations = generatePermutations(inputArray, 2);

    expect(permutations).toEqual(expectedPermutations);
  });
  it("test 2", () => {
    const inputArray = ["a", "b"];
    const expectedPermutations = [["a"], ["b"]];

    const permutations = generatePermutations(inputArray, 1);

    expect(permutations).toEqual(expectedPermutations);
  });
});
