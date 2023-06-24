import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";

const checkWithConclusion = (
  knowledgeBase: string[][],
  conclusion: string[]
) => {
  const deductionStepsArr: DeductionStep[] = [];

  if (checkKnowledgeBase(conclusion, knowledgeBase, deductionStepsArr)) {
    return deductionStepsArr;
  }

  return false;
};

export default checkWithConclusion;
