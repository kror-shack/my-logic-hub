import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import {
  addDeductionStep,
  removeOutermostBrackets,
  searchInArray,
  searchIndex,
  splitArray,
} from "../propositionalLogicHelperFunctions/propositionalLogicHelperFunction";

const simplifyAndOperation = (
  proposition: string[],
  knowledgeBase: string[][]
) => {
  const deductionStepsArr: DeductionStep[] = [];
  const modifiedProposition = removeOutermostBrackets(proposition);

  const [before, after] = splitArray(modifiedProposition, "&");
  if (before && after) {
    const modifiedBefore = removeOutermostBrackets(before);
    const modifiedAfter = removeOutermostBrackets(after);
    if (!searchInArray(knowledgeBase, before)) {
      addDeductionStep(
        deductionStepsArr,
        before,
        "Simplification",
        `${searchIndex(knowledgeBase, proposition)}`
      );
      knowledgeBase.push(modifiedBefore);
    }
    if (!searchInArray(knowledgeBase, after)) {
      addDeductionStep(
        deductionStepsArr,
        after,
        "Simplification",
        `${searchIndex(knowledgeBase, proposition)}`
      );
      knowledgeBase.push(modifiedAfter);
    }
    return { knowledgeBase, deductionStepsArr };
  }

  return { knowledgeBase, deductionStepsArr };
};

export default simplifyAndOperation;
