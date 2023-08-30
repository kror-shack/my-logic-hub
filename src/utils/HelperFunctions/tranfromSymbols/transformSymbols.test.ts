import {
  transformSymbolsForInput,
  transformSymbolsForProcessing,
} from "./transformSymbols";

describe("transformSymbols", () => {
  it("transforms symbols correctly", () => {
    const input = "A & B | (C -> D) <-> ~E";
    const expectedOutput = "A ∧ B ∨ (C -> D) <-> ¬E";

    const transformedOutput = transformSymbolsForInput(input);
    expect(transformedOutput).toEqual(expectedOutput);
  });
});

describe("reverseTransformSymbols", () => {
  it("reverses symbols transformation correctly", () => {
    const transformedOutput = "A ∧ B ∨ (C -> D) <-> ¬E";
    const expectedOriginalOutput = "A & B | (C -> D) <-> ~E";

    const originalOutput = transformSymbolsForProcessing(transformedOutput);
    expect(originalOutput).toEqual(expectedOriginalOutput);
  });
  it("returns unchanged array if no symbol needs to be changed", () => {
    const transformedOutput = "A & B | (C -> D) <-> ~E";
    const expectedOriginalOutput = "A & B | (C -> D) <-> ~E";

    const originalOutput = transformSymbolsForProcessing(transformedOutput);
    expect(originalOutput).toEqual(expectedOriginalOutput);
  });
});

export {};
