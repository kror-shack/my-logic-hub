import { useEffect, useState } from "react";

type Props = {
  rule: string;
};

/**
 * This component renders the definition of a deduction rule.
 *
 * @component
 * @param Props - The component's props
 * @param Props.rule -The fitch style natural deduction rule name.
 * @returns -A JSX element with the standard definition of the provided rule
 */
const DeductionalRuleInfo = ({ rule }: Props) => {
  const getRuleInfo = (rule: string) => {
    switch (rule) {
      case "Modus Ponens":
        return "If we have 'A implies B' (A → B) and we have 'A', then we can infer 'B'.";

      case "Modus Tollens":
        return "If we have 'A implies B' (A → B) and we have 'not B', then we can infer 'not A'.";

      case "Disjunctive Syllogism":
        return "If we have 'A or B' (A ∨ B) and we have 'not A', then we can infer 'B'.";

      case "Addition":
        return "If we have 'A', then we can infer 'A or B' (A ∨ B) for any 'B'.";

      case "Simplification":
        return "If we have 'A and B' (A ∧ B), then we can infer 'A' or 'B'.";

      case "Conjunction":
        return "If we have 'A' and we have 'B', then we can infer 'A and B' (A ∧ B).";

      case "Material Implication":
        return "If we have '~ A' or 'B', then we can infer 'A implies B' (A → B) and vice versa.";

      case "Hypothetical Syllogism":
        return "If we have 'A → B' and 'B → C', then we can infer 'A → C' in a logical sequence.";

      case "Transposition":
        return "If we have 'A → B', we can derive the contrapositive '¬B → ¬A' in a logical sequence.";

      case "Assuming the contradiction":
        return "To prove a proposition 'P', assume its negation '¬P' and derive a contradiction, showing that '¬P' cannot hold. This implies that 'P' must be true.";

      case "-R Contradiction":
        return "In a proof by contradiction, after assuming '¬P' and deriving a contradiction, the contradiction is reiterated to conclude that the original proposition 'P' must be true.";

      case "DeMorgan Theorem":
        return "DeMorgan's Law states that for any propositions 'A' and 'B', the negation of 'A AND B' is equivalent to 'NOT A OR NOT B', and the negation of 'A OR B' is equivalent to 'NOT A AND NOT B'.";

      case "Universal Instantiation":
        return "Universal Instantiation (UI) is a rule of inference that allows you to instantiate a universally quantified formula by substituting a specific value for the universally quantified variable. For any proposition 'P(x)', if you have '∀x P(x)', then you can infer 'P(a)', where 'a' is any specific value within the universe of discourse.";

      case "Existential Instantiation":
        return "Existential Instantiation (EI) is a rule of inference that allows you to instantiate an existentially quantified formula by replacing the existentially quantified variable with a specific value. For any proposition 'P(x)', if you have '∃x P(x)', then you can infer 'P(a)', where 'a' is a specific value that satisfies the existentially quantified formula.";

      case "Universal Generalization":
        return "Universal Generalization (UG) is a rule of inference that allows you to introduce a universally quantified formula by generalizing from a specific instance. If you have 'P(a)', where 'a' is a specific value, then you can infer '∀x P(x)', which asserts that the proposition 'P' holds for all possible values of 'x' within the universe of discourse.";

      case "Existential Generalization":
        return "Existential Generalization (EG) is a rule of inference that allows you to introduce an existentially quantified formula. If you have 'P(a)', where 'a' is a specific value, then you can infer '∃x P(x)', which asserts that there exists at least one value of 'x' such that the proposition 'P' holds.";
    }
  };
  const ruleInfo = getRuleInfo(rule);

  return <p>{ruleInfo}</p>;
};

export default DeductionalRuleInfo;
