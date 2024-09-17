import { argumentIsFromSamples } from "./helperFunctions";

describe("argumentIsFromSamples", () => {
  it("should return true for a sample Propositional Logic argument", () => {
    const argument = [
      "( ¬ Q -> P ) ∧ (R -> T )",
      " ¬ ( ¬P -> S )",
      " (¬ U ∨ R ) ∧ U ",
      " ¬B -> ¬T ",
      "T -> Y",
      "¬K -> ¬Y",
      "( ¬ ( B -> ¬Q ) ∧ ( ¬ S ∧ T ) )∧ ( X ∨ K )",
    ];
    expect(argumentIsFromSamples(argument)).toBe(true);
  });

  it("should return true for a sample Quantificational Logic argument", () => {
    const argument = [
      "\u2200x \u2200y ( ( Axg ∧ Agy ) -> Axy )",
      "\u2200x ( Px -> Agx )",
      "\u2203x ( Px ∧ Axg )",
      "\u2203x ( Px ∧ \u2200y ( Py -> Axy ) )",
    ];
    expect(argumentIsFromSamples(argument)).toBe(true);
  });

  it("should return true for a sample PL Indirect Proof argument", () => {
    const argument = [
      "(S ∨ R) -> (¬P -> Q)",
      "¬S -> ¬(T -> Q)",
      "R -> ¬T",
      "¬P",
      "¬R -> Q",
      "S -> ¬Q",
      "¬S -> T",
      "(T -> R) ∧ ¬S",
    ];
    expect(argumentIsFromSamples(argument)).toBe(true);
  });

  it("should return true for a sample Counter Model argument", () => {
    const argument = [
      "\u2200x \u2203y(Fx <-> Gy)",
      "\u2203y \u2200x(Fx <-> Gy)",
    ];
    expect(argumentIsFromSamples(argument)).toBe(true);
  });

  it("should ignore spaces difference", () => {
    const argument = [
      "\u2200x \u2203y(Fx    <-> Gy)",
      "\u2203y \u2200x(Fx <-> Gy)",
    ];
    expect(argumentIsFromSamples(argument)).toBe(true);
  });

  it("should return true for a sample PL Tree argument", () => {
    const argument = ["P ∨ ( Q ∧ R )", "( P ∨ Q ) ∧ ( P ∨ R )"];
    expect(argumentIsFromSamples(argument)).toBe(true);
  });

  it("should return true for the sample Truth Table argument", () => {
    const argument = "(P -> Q) -> P";
    expect(argumentIsFromSamples(argument)).toBe(true);
  });

  it("should return true for a sample Venn Diagram argument", () => {
    const argument = [
      "All men are mortal.",
      "Socrates is a man.",
      "Therefore, Socrates is mortal.",
    ];
    expect(argumentIsFromSamples(argument)).toBe(true);
  });

  it("should return false for a non-matching argument", () => {
    const argument = ["A -> B", "C -> D"];
    expect(argumentIsFromSamples(argument)).toBe(false);
  });
});
