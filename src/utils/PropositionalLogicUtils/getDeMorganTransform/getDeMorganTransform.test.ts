import getDeMorganTransform from "./getDeMorganTransform";

describe("getDeMorganTransform function", () => {
  it("should return the correct De Morgan expression for a negation inside parentheses", () => {
    const inputArray = ["~", "(", "P", "|", "Q", ")"];
    const expectedResult = ["~P", "&", "~Q"];

    const result = getDeMorganTransform(inputArray);

    expect(result).toEqual(expectedResult);
  });

  //   it.only("should return the correct De Morgan expression for multiple conditions", () => {
  //     const inputArray = [
  //       "(",
  //       "P",
  //       "&",
  //       "Q",
  //       ")",
  //       "|",
  //       "(",
  //       "R",
  //       "|",
  //       "~",
  //       "S",
  //       ")",
  //     ];
  //     const expectedResult = [
  //       "(",
  //       "P",
  //       "|",
  //       "Q",
  //       ")",
  //       "&",
  //       "(",
  //       "R",
  //       "|",
  //       "~",
  //       "S",
  //       ")",
  //     ];

  //     const result = getDeMorganTransform(inputArray);

  //     expect(result).toEqual(expectedResult);
  //   });

  //   it("should handle nested negations correctly", () => {
  //     const inputArray = ["~", "(", "~", "(", "P", "&", "Q", ")", ")"];
  //     const expectedResult = ["~", "(", "~", "(", "P", "&", "Q", ")", ")"];

  //     const result = getDeMorganTransform(inputArray);

  //     expect(result).toEqual(expectedResult);
  //   });

  //   it("should handle complex expressions", () => {
  //     const inputArray = ["~", "(", "P", "&", "(", "~", "Q", "|", "R", ")", ")"];
  //     const expectedResult = [
  //       "~",
  //       "(",
  //       "P",
  //       "&",
  //       "(",
  //       "~",
  //       "Q",
  //       "|",
  //       "R",
  //       ")",
  //       ")",
  //     ];

  //     const result = getDeMorganTransform(inputArray);

  //     expect(result).toEqual(expectedResult);
  //   });
});
