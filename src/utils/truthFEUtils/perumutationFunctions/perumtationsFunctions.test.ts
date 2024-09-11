import { AllDomains } from "../../../types/truthFETypes/truthFETypes";
import {
  filterDomainsConstants,
  generatePermutationsForDomain,
} from "./perumutationFunctions";

describe("generatePermutationsForDomain", () => {
  test("generates permutations for simple domains and input array", () => {
    const domains: AllDomains = { P: [], A: [] };
    const inputArray = [0, 1];
    const result = generatePermutationsForDomain(domains, inputArray);
    const expected = [
      { P: [], A: [] },
      { P: [], A: [0] },
      { P: [], A: [1] },
      { P: [], A: [0, 1] },
      { P: [0], A: [] },
      { P: [0], A: [0] },
      { P: [0], A: [1] },
      { P: [0], A: [0, 1] },
      { P: [1], A: [] },
      { P: [1], A: [0] },
      { P: [1], A: [1] },
      { P: [1], A: [0, 1] },
      { P: [0, 1], A: [] },
      { P: [0, 1], A: [0] },
      { P: [0, 1], A: [1] },
      { P: [0, 1], A: [0, 1] },
    ];

    expect(result).toEqual(expected);
  });

  test("handles domains with more keys", () => {
    const domains: AllDomains = { F: [], I: [], G: [] };
    const inputArray = [0, 1];
    const result = generatePermutationsForDomain(domains, inputArray);
    const expected = [
      { F: [], I: [], G: [] },
      { F: [], I: [], G: [0] },
      { F: [], I: [], G: [1] },
      { F: [], I: [], G: [0, 1] },
      { F: [], I: [0], G: [] },
      { F: [], I: [0], G: [0] },
      { F: [], I: [0], G: [1] },
      { F: [], I: [0], G: [0, 1] },
      { F: [], I: [1], G: [] },
      { F: [], I: [1], G: [0] },
      { F: [], I: [1], G: [1] },
      { F: [], I: [1], G: [0, 1] },
      { F: [], I: [0, 1], G: [] },
      { F: [], I: [0, 1], G: [0] },
      { F: [], I: [0, 1], G: [1] },
      { F: [], I: [0, 1], G: [0, 1] },
      { F: [0], I: [], G: [] },
      { F: [0], I: [], G: [0] },
      { F: [0], I: [], G: [1] },
      { F: [0], I: [], G: [0, 1] },
      { F: [0], I: [0], G: [] },
      { F: [0], I: [0], G: [0] },
      { F: [0], I: [0], G: [1] },
      { F: [0], I: [0], G: [0, 1] },
      { F: [0], I: [1], G: [] },
      { F: [0], I: [1], G: [0] },
      { F: [0], I: [1], G: [1] },
      { F: [0], I: [1], G: [0, 1] },
      { F: [0], I: [0, 1], G: [] },
      { F: [0], I: [0, 1], G: [0] },
      { F: [0], I: [0, 1], G: [1] },
      { F: [0], I: [0, 1], G: [0, 1] },
      { F: [1], I: [], G: [] },
      { F: [1], I: [], G: [0] },
      { F: [1], I: [], G: [1] },
      { F: [1], I: [], G: [0, 1] },
      { F: [1], I: [0], G: [] },
      { F: [1], I: [0], G: [0] },
      { F: [1], I: [0], G: [1] },
      { F: [1], I: [0], G: [0, 1] },
      { F: [1], I: [1], G: [] },
      { F: [1], I: [1], G: [0] },
      { F: [1], I: [1], G: [1] },
      { F: [1], I: [1], G: [0, 1] },
      { F: [1], I: [0, 1], G: [] },
      { F: [1], I: [0, 1], G: [0] },
      { F: [1], I: [0, 1], G: [1] },
      { F: [1], I: [0, 1], G: [0, 1] },
      { F: [0, 1], I: [], G: [] },
      { F: [0, 1], I: [], G: [0] },
      { F: [0, 1], I: [], G: [1] },
      { F: [0, 1], I: [], G: [0, 1] },
      { F: [0, 1], I: [0], G: [] },
      { F: [0, 1], I: [0], G: [0] },
      { F: [0, 1], I: [0], G: [1] },
      { F: [0, 1], I: [0], G: [0, 1] },
      { F: [0, 1], I: [1], G: [] },
      { F: [0, 1], I: [1], G: [0] },
      { F: [0, 1], I: [1], G: [1] },
      { F: [0, 1], I: [1], G: [0, 1] },
      { F: [0, 1], I: [0, 1], G: [] },
      { F: [0, 1], I: [0, 1], G: [0] },
      { F: [0, 1], I: [0, 1], G: [1] },
      { F: [0, 1], I: [0, 1], G: [0, 1] },
    ];

    expect(result).toEqual(expected);
  });

  // test("returns an empty result when inputArray is empty", () => {
  //   const domains: AllDomains = { P: [], A: [] };
  //   const inputArray: number[] = [];
  //   const result = generatePermutationsForDomain(domains, inputArray);

  //   expect(result).toEqual([]);
  // });

  // test("handles single-element input array", () => {
  //   const domains: AllDomains = { P: [], A: [] };
  //   const inputArray = [1];
  //   const result = generatePermutationsForDomain(domains, inputArray);

  //   expect(result).toEqual([{ P: [1], A: [undefined] }]);
  // });

  // test("handles empty domains object", () => {
  //   const domains: AllDomains = {};
  //   const inputArray = [0, 1];
  //   const result = generatePermutationsForDomain(domains, inputArray);

  //   expect(result).toEqual([]);
  // });
});

describe("filterDomainsConstants", () => {
  test("maps all the constants to either T or F", () => {
    const nameLetters: string[] = [];
    const domains: AllDomains[] = [
      { P: [0], A: [0] },
      { P: [0], A: [1] },
      { P: [0], A: [] },
      { P: [1], A: [0] },
      { P: [1], A: [1] },
      { P: [1], A: [] },
      { P: [], A: [0] },
      { P: [], A: [1] },
      { P: [], A: [] },
    ];
    const constants = ["A"];
    const result = filterDomainsConstants(domains, constants, nameLetters);
    const expected = [
      { A: "T", P: [0] },
      { A: "F", P: [0] },
      { A: "T", P: [1] },
      { A: "F", P: [1] },
      { A: "T", P: [] },
      { A: "F", P: [] },
    ];
    expect(result).toEqual(expected);
  });
  test("test 2", () => {
    const nameLetters: string[] = [];

    const domains: AllDomains[] = [
      { P: [0], A: [0] },
      { P: [0], A: [1] },
      { P: [0], A: [] },
      { P: [1], A: [0] },
      { P: [1], A: [1] },
      { P: [1], A: [] },
      { P: [], A: [0] },
      { P: [], A: [1] },
      { P: [], A: [] },
    ];
    const constants = ["A"];
    const result = filterDomainsConstants(domains, constants, nameLetters);
    const expected = [
      { A: "T", P: [0] },
      { A: "F", P: [0] },
      { A: "T", P: [1] },
      { A: "F", P: [1] },
      { A: "T", P: [] },
      { A: "F", P: [] },
    ];
    expect(result).toEqual(expected);
  });

  test("test 3 - should map only one value to name letters", () => {
    const nameLetters: string[] = ["A"];

    const domains: AllDomains[] = [
      { P: [], A: [] },
      { P: [], A: [0] },
      { P: [], A: [1] },
      { P: [], A: [0, 1] },
      { P: [0], A: [] },
      { P: [0], A: [0] },
      { P: [0], A: [1] },
      { P: [0], A: [0, 1] },
      { P: [1], A: [] },
      { P: [1], A: [0] },
      { P: [1], A: [1] },
      { P: [1], A: [0, 1] },
      { P: [0, 1], A: [] },
      { P: [0, 1], A: [0] },
      { P: [0, 1], A: [1] },
      { P: [0, 1], A: [0, 1] },
    ];
    const constants: string[] = [];
    const result = filterDomainsConstants(domains, constants, nameLetters);
    const expected = [
      { P: [], A: [] },
      { P: [], A: 0 },
      { P: [], A: 1 },
      { P: [] },
      { P: [0], A: [] },
      { P: [0], A: 0 },
      { P: [0], A: 1 },
      { P: [0] },
      { P: [1], A: [] },
      { P: [1], A: 0 },
      { P: [1], A: 1 },
      { P: [1] },
      { P: [0, 1], A: [] },
      { P: [0, 1], A: 0 },
      { P: [0, 1], A: 1 },
      { P: [0, 1] },
    ];

    expect(result).toEqual(expected);
  });
});
