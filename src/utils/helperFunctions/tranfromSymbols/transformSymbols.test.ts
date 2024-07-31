import {
  transformSymbolsForDisplay,
  transformSymbolsForProcessing,
} from "./transformSymbols";

describe("transformSymbols", () => {
  it("transforms symbols correctly", () => {
    const input = "A & B | (C -> D) <-> ~E";
    const expectedOutput = "A ∧ B ∨ (C -> D) <-> ¬E";

    const transformedOutput = transformSymbolsForDisplay(input);
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

describe("transformSymbolsToDefault", () => {
  it("reverses symbols transformation correctly", () => {
    const transformedOutput = "∀x ∀y ( ( Axg ∧ Agy ) → Axy )";
    const expectedOriginalOutput = "∀x ∀y ( ( Axg & Agy ) → Axy )";

    const originalOutput = transformSymbolsForProcessing(transformedOutput);
    expect(originalOutput).toEqual(expectedOriginalOutput);
  });
  it("deals with multiple symbols", () => {
    const transformedOutput = "∀x ∀y ( ( Axg ∧∧∧∧∧∧∧∧∧∧∧ Agy ) → Axy )";
    const expectedOriginalOutput = "∀x ∀y ( ( Axg &&&&&&&&&&& Agy ) → Axy )";

    const originalOutput = transformSymbolsForProcessing(transformedOutput);
    expect(originalOutput).toEqual(expectedOriginalOutput);
  });
});

export {};
