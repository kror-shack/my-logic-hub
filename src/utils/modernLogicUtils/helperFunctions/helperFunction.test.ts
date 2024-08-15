import {
  existsInMLDS,
  getOperatorByIgnoringNegations,
  matchArrayLengthsByAddingEmptyStrings,
} from "./helperFunction";

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

  /**
   * Unused as of now, instead a function will be added before parsing symbolic
   * logic input such that it adds brackets around wff for correct processing with
   * negations present ~~p -> q = (~~p) -> q
   */
  describe.skip("getOperatorByIgnoringNegations", () => {
    test("should return -> for ~p->q", () => {
      expect(getOperatorByIgnoringNegations(["~", "p", "->", "q"])).toBe("->");
    });

    test("should return -> for ~~p->q", () => {
      expect(getOperatorByIgnoringNegations(["~", "~", "p", "->", "q"])).toBe(
        "->"
      );
    });

    test("should return ~ for ~(p->q)", () => {
      expect(
        getOperatorByIgnoringNegations(["~", "(", "p", "->", "q", ")"])
      ).toBe("~");
    });

    test("should return & for ~p&q", () => {
      expect(getOperatorByIgnoringNegations(["~", "p", "&", "q"])).toBe("&");
    });

    test("should return ~ for ~~(p->q)", () => {
      expect(
        getOperatorByIgnoringNegations(["~", "~", "(", "p", "->", "q", ")"])
      ).toBe("~");
    });
  });
});

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

  describe("existsInMLDS", () => {
    test("should return false if it does not exist", () => {
      const deductionStepsArr = [
        {
          obtained: ["~", "(", "p", "->", "q", ")", "->", "p"],
          rule: null,
          from: null,
          show: true,
          closed: null,
        },
        {
          obtained: ["~", "(", "p", "->", "q", ")"],
          rule: "ACD",
          from: null,
          show: false,
          closed: null,
        },
        {
          obtained: ["p"],
          rule: null,
          from: null,
          show: true,
          closed: null,
        },
        {
          obtained: ["~p"],
          rule: "AID",
          from: null,
          show: false,
          closed: null,
        },
      ];
      const premise = ["p", "->", "q"];
      const premiseObj = {
        rule: null,
        from: null,
        obtained: premise,
        show: true,
        closed: null,
      };
      expect(existsInMLDS(deductionStepsArr, premiseObj)).toBe(false);
    });
    test("should return true when the element does exist", () => {
      const deductionStepsArr = [
        {
          obtained: ["~", "(", "p", "->", "q", ")", "->", "p"],
          rule: null,
          from: null,
          show: true,
          closed: null,
        },
        {
          obtained: ["p", "->", "q"],
          rule: "ACD",
          from: null,
          show: false,
          closed: null,
        },
        {
          obtained: ["p"],
          rule: null,
          from: null,
          show: true,
          closed: null,
        },
        {
          obtained: ["~p"],
          rule: "AID",
          from: null,
          show: false,
          closed: null,
        },
      ];
      const premise = ["p", "->", "q"];
      const premiseObj = {
        obtained: premise,
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      };
      expect(existsInMLDS(deductionStepsArr, premiseObj)).toBe(true);
    });
  });
});
