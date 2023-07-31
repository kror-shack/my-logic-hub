import { useEffect, useState } from "react";

type Props = {
  rule: string;
};

const DeductionalRuleInfo = ({ rule }: Props) => {
  const [ruleInfo, setRuleInfo] = useState<string>();

  useEffect(() => {
    switch (rule) {
      case "Modus Ponens":
        setRuleInfo(
          "If we have 'A implies B' (A → B) and we have 'A', then we can infer 'B'."
        );
        break;
      case "Modus Tollens":
        setRuleInfo(
          "If we have 'A implies B' (A → B) and we have 'not B', then we can infer 'not A'."
        );
        break;

      case "Disjunctive Syllogism":
        setRuleInfo(
          "If we have 'A or B' (A ∨ B) and we have 'not A', then we can infer 'B'."
        );
        break;
      case "Addition":
        setRuleInfo(
          "If we have 'A', then we can infer 'A or B' (A ∨ B) for any 'B'."
        );
        break;
      case "Simplification":
        setRuleInfo(
          "If we have 'A and B' (A ∧ B), then we can infer 'A' or 'B'."
        );
        break;
      case "Conjunction":
        setRuleInfo(
          "If we have 'A' and we have 'B', then we can infer 'A and B' (A ∧ B)."
        );
        break;
      case "Material Implication":
        setRuleInfo(
          "If we have '~ A' or 'B', then we can infer 'A implies B' (A → B) and vice versa."
        );
        break;
      case "Hypothetical Syllogism":
        setRuleInfo(
          "If we have 'A → B' and 'B → C', then we can infer 'A → C' in a logical sequence."
        );
        break;

      case "DeMorgan Theorem":
        setRuleInfo(
          "DeMorgan's Law states that for any propositions 'A' and 'B', the negation of 'A AND B' is equivalent to 'NOT A OR NOT B', and the negation of 'A OR B' is equivalent to 'NOT A AND NOT B'."
        );
        break;
    }
  }, [rule]);

  return <div className="rule-info">{ruleInfo && <p>{ruleInfo}</p>}</div>;
};

export default DeductionalRuleInfo;
