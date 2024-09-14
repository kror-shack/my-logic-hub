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
  it("test 3", () => {
    const inputArray = ["0"];
    const expectedPermutations = [["0", "0"]];

    const permutations = generatePermutations(inputArray, 2);

    expect(permutations).toEqual(expectedPermutations);
  });

  it("test 4", () => {
    const inputArray = ["0", "1", "2"];
    const expectedPermutations = [
      ["0", "0", "0"],
      ["0", "0", "1"],
      ["0", "0", "2"],
      ["0", "1", "0"],
      ["0", "1", "1"],
      ["0", "1", "2"],
      ["0", "2", "0"],
      ["0", "2", "1"],
      ["0", "2", "2"],
      ["1", "0", "0"],
      ["1", "0", "1"],
      ["1", "0", "2"],
      ["1", "1", "0"],
      ["1", "1", "1"],
      ["1", "1", "2"],
      ["1", "2", "0"],
      ["1", "2", "1"],
      ["1", "2", "2"],
      ["2", "0", "0"],
      ["2", "0", "1"],
      ["2", "0", "2"],
      ["2", "1", "0"],
      ["2", "1", "1"],
      ["2", "1", "2"],
      ["2", "2", "0"],
      ["2", "2", "1"],
      ["2", "2", "2"],
    ];
    const permutations = generatePermutations(inputArray, 3);

    expect(permutations).toEqual(expectedPermutations);
  });
});
