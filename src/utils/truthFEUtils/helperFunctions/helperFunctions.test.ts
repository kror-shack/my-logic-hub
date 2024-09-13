import { AllDomains } from "../../../types/truthFETypes/truthFETypes";
import {
  convertWffToTF,
  expandQuantifiedWff,
  negateRequiredTruthValues,
  evaluateExpandedLogicalExpression,
  createAllDomainsFromPredicates,
  getInstantiationThroughDomain,
  getAllConstants,
  getNameLetters,
  replaceNameLettersWithValues,
  expandAllQuantifiersToTF,
  getFreeVariables,
  addClosureIfNecessary,
} from "./helperFunctions";

describe("expandQuantifiedWff", () => {
  it('["a"] and "&"', () => {
    const expected = ["a", "&", "a"];
    expect(expandQuantifiedWff(["a"], "&")).toEqual(expected);
  });

  it("test 2", () => {
    const expected = [
      "(",
      "~Q",
      "->",
      "D",
      ")",
      "|",
      "(",
      "~Q",
      "->",
      "D",
      ")",
    ];
    expect(expandQuantifiedWff(["~Q", "->", "D"], "|")).toEqual(expected);
  });
});

describe("convertWffToTF", () => {
  const domains: AllDomains = {
    P: [0, 1],
    A: [2],
    W: [],
    J: [0],
  };

  it("should convert elements based on domain with numbers", () => {
    const expression = ["(", "P0", "->", "A0", ")", "->", "W0"];
    expect(convertWffToTF(expression, domains)).toEqual([
      "(",
      "T",
      "->",
      "F",
      ")",
      "->",
      "F",
    ]);
  });

  it("should handle elements with only letters and numbers", () => {
    const expression = ["P0", "A1", "J0"];
    expect(convertWffToTF(expression, domains)).toEqual(["T", "F", "T"]);
  });

  it("should handle an element with a letter and number not in the domain", () => {
    const expression = ["P2", "A0"];
    expect(convertWffToTF(expression, domains)).toEqual(["F", "F"]);
  });

  it("should return original elements that are not letters with numbers", () => {
    const expression = ["(", "P0", "->", "W", ")"];
    expect(convertWffToTF(expression, domains)).toEqual([
      "(",
      "T",
      "->",
      "F",
      ")",
    ]);
  });

  it("should handle an empty expression array", () => {
    const expression: string[] = [];
    expect(convertWffToTF(expression, domains)).toEqual([]);
  });

  it("should handle an expression with only operators and parentheses", () => {
    const expression = ["(", "->", ")", "&"];
    expect(convertWffToTF(expression, domains)).toEqual(["(", "->", ")", "&"]);
  });

  it("should handle letters not in the domains with or without numbers", () => {
    const expression = ["Z0", "X", "Y1"];
    expect(convertWffToTF(expression, domains)).toEqual(["F", "F", "F"]);
  });

  it("should handle letters with a number not in the domain", () => {
    const expression = ["P2"];
    expect(convertWffToTF(expression, domains)).toEqual(["F"]);
  });

  it("should handle letters without a number and not in the domain", () => {
    const expression = ["Q"];
    expect(convertWffToTF(expression, domains)).toEqual(["F"]);
  });
  it("should handle negations", () => {
    const expression = ["~P0"];
    expect(convertWffToTF(expression, domains)).toEqual(["~T"]);
  });
});

describe("negateRequiredTruthValues", () => {
  it("should remove negations and flip values", () => {
    const expression = ["~F", "->", "T"];
    expect(negateRequiredTruthValues(expression)).toEqual(["T", "->", "T"]);
  });

  it("should handle negation with multiple elements", () => {
    const expression = ["~T", "~F", "->", "T"];
    expect(negateRequiredTruthValues(expression)).toEqual([
      "F",
      "T",
      "->",
      "T",
    ]);
  });

  it("should return an empty array unchanged", () => {
    const expression: string[] = [];
    expect(negateRequiredTruthValues(expression)).toEqual([]);
  });
});

describe("evaluateExpandedLogicalExpression", () => {
  it("should return true for all true operands with AND operator between them", () => {
    const expression = ["T", "&", "T", "&", "T"];
    expect(evaluateExpandedLogicalExpression(expression)).toBe(true);
  });

  it("should return false for any false operand with AND operator between them", () => {
    const expression = ["T", "&", "F", "&", "T"];
    expect(evaluateExpandedLogicalExpression(expression)).toBe(false);
  });

  it("should return true for at least one true operand with OR operator between them", () => {
    const expression = ["F", "|", "T", "|", "F"];
    expect(evaluateExpandedLogicalExpression(expression)).toBe(true);
  });

  it("should return false for all false operands with OR operator between them", () => {
    const expression = ["F", "|", "F", "|", "F"];
    expect(evaluateExpandedLogicalExpression(expression)).toBe(false);
  });

  it("should handle a large array of true operands with AND operators", () => {
    const expression = Array(1_000_000)
      .fill("T")
      .flatMap((val, i) => (i === 0 ? [val] : ["&", val]));
    expect(evaluateExpandedLogicalExpression(expression)).toBe(true);
  });
});

describe("createAllDomainsFromPredicates", () => {
  test("creates AllDomains object with uppercase letters as keys", () => {
    const strings = ["Hx", "Rx", "J"];
    const result: AllDomains = createAllDomainsFromPredicates(strings);

    expect(result).toEqual({
      H: [],
      R: [],
      J: [],
    });
  });

  test("handles strings with no uppercase letters", () => {
    const strings = ["jx"];
    const result: AllDomains = createAllDomainsFromPredicates(strings);

    expect(result).toEqual({});
  });
});

describe("getInstantiationThroughDomain function", () => {
  it("test 1 - implication in premise", () => {
    const stringArray = ["\u2203(k)", "Pk", "->", "Rk"];
    const updatedArray = getInstantiationThroughDomain(stringArray, ["0", "1"]);
    const expected = [
      "(",
      "P0",
      "->",
      "R0",
      ")",
      "|",
      "(",
      "P1",
      "->",
      "R1",
      ")",
    ];
    expect(updatedArray).toEqual(expected);
  });
  it("test 2 - one predicate", () => {
    const stringArray = ["\u2203(k)", "Pk"];
    const updatedArray = getInstantiationThroughDomain(stringArray, ["0", "1"]);
    const expected = ["P0", "|", "P1"];

    expect(updatedArray).toEqual(expected);
  });

  it.skip("test 3 - double quantifier", () => {
    const stringArray = ["\u2200(k)", "\u2200(y)", "(", "Pk", "&", "Py", ")"];
    const updatedArray = getInstantiationThroughDomain(stringArray, ["0"]);
    const expected = [
      "(",
      "∀(y)",
      "(",
      "P0",
      "&",
      "Py",
      ")",
      ")",
      "|",
      "(",
      "∀(y)",
      "(",
      "P0",
      "&",
      "Py",
      ")",
      ")",
    ];

    expect(updatedArray).toEqual(false);
  });
  it("test 3 - negated value in quantifier", () => {
    const stringArray = ["\u2200(k)", "~Pk"];
    const updatedArray = getInstantiationThroughDomain(stringArray, ["0", "1"]);
    const expected = ["~P0", "&", "~P1"];

    expect(updatedArray).toEqual(expected);
  });

  // it("should only deal with variables present in the quanifier", () => {
  //   const stringArray = ["\u2203(a)", "Aa + Bb", "Cc = Dd"];
  //   const constantValue = "K";
  //   const updatedArray = getInstantiationThroughDomain(
  //     stringArray,
  //     constantValue
  //   );

  //   expect(updatedArray).toEqual(["AK + Bb", "Cc = Dd"]);
  // });
});

describe("getAllConstants ", () => {
  it("test 1 - should get constants", () => {
    const stringArray = ["\u2203(k)", "Pk", "->", "R"];
    const updatedArray = getAllConstants(stringArray);
    const expected = ["R"];
    expect(updatedArray).toEqual(expected);
  });

  it("test 2 - should not get predicates constants", () => {
    const stringArray = ["\u2203(k)", "Pk", "->", "RA"];
    const updatedArray = getAllConstants(stringArray);
    expect(updatedArray).toEqual([]);
  });
});

describe("getNameLetters ", () => {
  it("test 1 - should get constants", () => {
    const stringArray = ["\u2203(k)", "Pk", "->", "PR"];
    const updatedArray = getNameLetters(stringArray);
    const expected = ["R"];
    expect(updatedArray).toEqual(expected);
  });

  it("test 2 - should not get predicates as name letters", () => {
    const stringArray = ["\u2203(k)", "Pk", "->", "Rx"];
    const updatedArray = getNameLetters(stringArray);
    expect(updatedArray).toEqual([]);
  });
  it("test 3 ", () => {
    const stringArray = ["F", "I"];
    const updatedArray = getNameLetters(stringArray);
    expect(updatedArray).toEqual([]);
  });
});

describe("replaceKeysWithValues", () => {
  const domains: AllDomains = {
    P: [0, 1],
    A: 0,
  };

  it("should convert elements based on domain with numbers", () => {
    const expression = ["(", "Px", "->", "Ax", ")", "->", "WA"];
    const expected = ["(", "Px", "->", "Ax", ")", "->", "W0"];
    expect(replaceNameLettersWithValues(expression, domains)).toEqual(expected);
  });
});

// describe("addClosureIfNecessary", () => {
//   test("should add universal quantifier outside existential quantifier for predicates", () => {
//     const inputArray = ["∃x", "(", "Ax", "&", "Ay", ")"];
//     const expected = ["∀y", "(", "∃x", "(", "Ax", "&", "Ay", ")", ")"];
//     const result = addClosureIfNecessary(inputArray);
//     expect(result).toEqual(false);
//   });

//   test("should not alter input without predicates inside existential quantifiers", () => {
//     const inputArray = ["∃x", "(", "Ax", "&", "Bz", ")"];
//     const expected = ["∃x", "(", "Ax", "&", "Bz", ")"];
//     const result = addClosureIfNecessary(inputArray);
//     expect(result).toEqual(false);
//   });
// });

describe("expandAllQuantifiersToTF", () => {
  test("test 1", () => {
    const inputArray = [
      "\u2200(y)",
      "(",
      "\u2203(x)",
      "(",
      "Ax",
      "&",
      "Ay",
      ")",
      ")",
    ];
    const result = expandAllQuantifiersToTF(inputArray, ["0", "1"]);
    const expected = [
      "(",
      "(",
      "(",
      "A0",
      "&",
      "A0",
      ")",
      "|",
      "(",
      "A1",
      "&",
      "A0",
      ")",
      ")",

      ")",
      "&",
      "(",
      "(",
      "(",
      "A0",
      "&",
      "A1",
      ")",
      "|",
      "(",
      "A1",
      "&",
      "A1",
      ")",
      ")",
      ")",
    ];

    expect(result).toEqual(expected);
  });
  test("test 2 - single quantified predicate", () => {
    const inputArray = ["\u2203(y)", "Fy"];
    const result = expandAllQuantifiersToTF(inputArray, ["0", "1"]);
    const expected = ["F0", "|", "F1"];
    expect(result).toEqual(expected);
  });
  test("test 3 - quantified expression with operator", () => {
    const inputArray = ["\u2203(y)", "(", "Ay", "&", "Ay", ")"];
    const result = expandAllQuantifiersToTF(inputArray, ["0", "1"]);
    const expected = [
      "(",
      "A0",
      "&",
      "A0",
      ")",
      "|",
      "(",
      "A1",
      "&",
      "A1",
      ")",
    ];

    expect(result).toEqual(expected);
  });

  test("test 4", () => {
    const inputArray = ["PA", "->", "\u2203(x)", "Ax"];
    const result = expandAllQuantifiersToTF(inputArray, ["0", "1"]);
    const expected = ["PA", "->", "(", "A0", "|", "A1", ")"];
    expect(result).toEqual(expected);
  });

  test("test 5", () => {
    const inputArray = ["\u2203(x)", "Ax", "->", "PA"];
    const result = expandAllQuantifiersToTF(inputArray, ["0", "1"]);
    const expected = ["(", "A0", "|", "A1", ")", "->", "PA"];
    expect(result).toEqual(expected);
  });
  test("test 6", () => {
    const inputArray = [
      "\u2200(x)",
      "(",
      "Wx",
      "->",
      "\u2200(y)",
      "(",
      "Py",
      "->",
      "Ay",
      ")",
    ];
    const result = expandAllQuantifiersToTF(inputArray, ["0", "1"]);
    const expected = [
      "(",
      "(",
      "W0",
      "->",
      "(",
      "(",
      "P0",
      "->",
      "A0",
      ")",
      "&",
      "(",
      "P1",
      "->",
      "A1",
      ")",
      ")",
      "&",
      "(",
      "W1",
      "->",
      "(",
      "(",
      "P0",
      "->",
      "A0",
      ")",
      "&",
      "(",
      "P1",
      "->",
      "A1",
      ")",
      ")",
      ")",
    ];
    expect(result).toEqual(expected);
  });
  test("test 7", () => {
    const inputArray = ["∀(x)", "(", "∃(y)", "(", "Fx", "<->", "~Fy", ")", ")"];
    const result = expandAllQuantifiersToTF(inputArray, ["0"]);
    const expected = ["(", "F0", "<->", "~F0", ")"];
    expect(result).toEqual(expected);
  });
  test("test 7", () => {
    const inputArray = ["∀(x)", "(", "∃(y)", "(", "Fx", "<->", "~Fy", ")", ")"];
    const result = expandAllQuantifiersToTF(inputArray, ["0", "1"]);
    const expected = [
      "(",
      "(",
      "(",
      "F0",
      "<->",
      "~F0",
      ")",
      "|",
      "(",
      "F0",
      "<->",
      "~F1",
      ")",
      ")",
      ")",
      "&",
      "(",
      "(",
      "(",
      "F1",
      "<->",
      "~F0",
      ")",
      "|",
      "(",
      "F1",
      "<->",
      "~F1",
      ")",
      ")",
      ")",
    ];
    expect(result).toEqual(expected);
  });
});

describe("addClosureIfNecessary", () => {
  test("returns the same array if there are no free variables", () => {
    const input = ["∃(x)", "Ax", "->", "PA"];
    const expected = ["∃(x)", "Ax", "->", "PA"];
    expect(addClosureIfNecessary(input)).toEqual(expected);
  });

  test("adds universal quantifiers for free variables not quantified by the existential quantifier", () => {
    const input = ["∃(x)", "(", "Ax", "->", "Py", ")"];
    const expected = ["∀(y)", "(", "∃(x)", "(", "Ax", "->", "Py", ")", ")"];
    expect(addClosureIfNecessary(input)).toEqual(expected);
  });
});

describe("getFreeVariables", () => {
  test("return empty array if there are no free variables", () => {
    const input = ["∀(y)", "(", "∃(x)", "(", "Ax", "&", "Ay", ")", ")"];
    expect(getFreeVariables(input)).toEqual([]);
  });

  test("returns the free variables containing the free variables", () => {
    const input = ["∀(y)", "(", "∃(x)", "(", "Ax", "&", "At", ")", ")"];
    const expected = ["t"];
    expect(getFreeVariables(input)).toEqual(expected);
  });
  test("test 3", () => {
    const input = ["\u2203(y)", "(", "Fx", "<->", "~Fy", ")"];
    const expected = ["x"];
    expect(getFreeVariables(input)).toEqual(expected);
  });
});
