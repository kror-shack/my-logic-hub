import { matchArrayLengthsByAddingEmptyStrings } from "./helperFunction";

describe("matchArrays", () => {
  test("should match elements and insert empty arrays when there is no match", () => {
    const first = [["1"], ["2"], ["2.1"], ["2.2"], ["3"]];
    const second = [["2"], ["3"]];
    const expected = [[""], ["2"], [""], [""], ["3"]];
    expect(matchArrayLengthsByAddingEmptyStrings(first, second)).toEqual(
      expected
    );
  });

  test("should match all elements correctly when all elements are present in the second array", () => {
    const first = [["1"], ["2"], ["3"]];
    const second = [["1"], ["2"], ["3"]];
    const expected = [["1"], ["2"], ["3"]];
    expect(matchArrayLengthsByAddingEmptyStrings(first, second)).toEqual(
      expected
    );
  });
  test("test 3", () => {
    const first = [
      ["p", "->", "(", "(", "p", "->", "q", ")", "->", "q", ")"],
      ["p"],
      ["(", "p", "->", "q", ")", "->", "q"],
      ["p", "->", "q"],
      ["q"],
    ];
    const second = [["p"], ["p", "->", "q"]];
    const expected = [[""], ["p"], [""], ["p", "->", "q"], [""]];

    expect(matchArrayLengthsByAddingEmptyStrings(first, second)).toEqual(
      expected
    );
  });
});
