export const samplePropositionalLogicArg = [
  "( ¬ Q -> P ) ∧ (R -> T )",
  " ¬ ( ¬P -> S )",
  " (¬ U ∨ R ) ∧ U ",
  " ¬B -> ¬T ",
  "T -> Y",
  "¬K -> ¬Y",
  "( ¬ ( B -> ¬Q ) ∧ ( ¬ S ∧ T ) )∧ ( X ∨ K )",
];

export const sampleQuantificationalLogicArg = [
  "\u2200x \u2200y ( ( Axg ∧ Agy ) -> Axy )",
  "\u2200x ( Px -> Agx )",
  "\u2203x ( Px ∧ Axg )",
  "\u2203x ( Px ∧ \u2200y ( Py -> Axy ) )",
];

export const samplePLIndirectProofArg = [
  "(S ∨ R) -> (¬P -> Q)",
  "¬S -> ¬(T -> Q)",
  "R -> ¬T",
  "¬P",
  "¬R -> Q",
  "S -> ¬Q",
  "¬S -> T",
  "(T -> R) ∧ ¬S",
];

export const sampleCounterModelArg = [
  "\u2200x \u2203y(Fx <-> Gy)",
  "\u2203y \u2200x(Fx <-> Gy)",
];

export const samplePLTreeArgument = ["P ∨ ( Q ∧ R )", "( P ∨ Q ) ∧ ( P ∨ R )"];

export const sampleTruthTableArgument = "(P -> Q) -> P";

export const sampleVennDiagramArg = [
  "All men are mortal.",
  "Socrates is a man.",
  "Therefore, Socrates is mortal.",
];
