import { DeductionStep } from "../../../types/propositionalLogicTypes/types";
import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";

/**
 * Check if a conclusion can be deduced from the knowledge base.
 *
 * This function checks if a given conclusion can be deduced from the provided knowledge base.
 *
 * @param knowledgeBase - The knowledge base containing relevant information.
 * @param  conclusion - The conclusion to be checked.
 * @returns - `true` if the conclusion can be deduced, `false` otherwise.
 */
const checkWithConclusion = (
  conclusion: string[],
  deductionStepsArr: DeductionStep[] = []
) => {
  const deductionSteps = checkKnowledgeBase(conclusion, deductionStepsArr);
  console.log("🚀 ~ deductionSteps:", deductionSteps);
  if (deductionStepsArr) return deductionSteps;
  return false;
};

export default checkWithConclusion;
