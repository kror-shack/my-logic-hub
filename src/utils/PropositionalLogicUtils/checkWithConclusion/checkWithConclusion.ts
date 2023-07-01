import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";

const checkWithConclusion = (
  knowledgeBase: string[][],
  conclusion: string[],
  deductionStepsArr: DeductionStep[] = []
) => {
  if (checkKnowledgeBase(conclusion, knowledgeBase, deductionStepsArr)) {
    return true;
  }

  return false;
};

export default checkWithConclusion;
