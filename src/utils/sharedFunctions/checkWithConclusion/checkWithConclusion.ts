import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";

/**
 * Check if a conclusion can be deduced from the knowledge base.
 *
 * This function checks if a given conclusion can be deduced from the provided knowledge base.
 *
 * @param conclusion - The conclusion to be checked.
 * @param deductionStepsArr - An array of all the deduction steps .
 * @returns - returns the deductions steps if the conc can be derived otherwise false.
 */
const checkWithConclusion = (
  conclusion: string[],
  deductionStepsArr: DeductionStep[] = [],
  derivedRules: DerivedRules
) => {
  const deductionSteps = checkKnowledgeBase(
    conclusion,
    deductionStepsArr,
    derivedRules
  );
  if (deductionStepsArr) return deductionSteps;
  return false;
};

export default checkWithConclusion;
