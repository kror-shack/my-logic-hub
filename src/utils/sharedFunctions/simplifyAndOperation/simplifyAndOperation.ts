import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";

/**
 * Get simplification of an conjunctive Statement
 *
 * This function splits up the operand before and after the AND operator.
 *
 * @param premise - The current wff
 * @param knowledgeBase - The knowledge base
 * @returns - An object containing the updated knowledge base and an array of deduction steps.
 */
const simplifyAndOperation = (premise: string[], knowledgeBase: string[][]) => {
  const deductionStepsArr: DeductionStep[] = [];

  const [before, after] = splitArray(premise, "&");

  if (before && after) {
    const modifiedBefore = removeOutermostBrackets(before);
    const modifiedAfter = removeOutermostBrackets(after);
    if (!searchInArray(knowledgeBase, before)) {
      addDeductionStep(
        deductionStepsArr,
        modifiedBefore,
        "Simplification",
        `${searchIndex(knowledgeBase, premise)}`
      );
      knowledgeBase.push(modifiedBefore);
    }
    if (!searchInArray(knowledgeBase, after)) {
      addDeductionStep(
        deductionStepsArr,
        modifiedAfter,
        "Simplification",
        `${searchIndex(knowledgeBase, premise)}`
      );
      knowledgeBase.push(modifiedAfter);
    }
    return { knowledgeBase, deductionStepsArr };
  }

  return { knowledgeBase, deductionStepsArr };
};

export default simplifyAndOperation;
