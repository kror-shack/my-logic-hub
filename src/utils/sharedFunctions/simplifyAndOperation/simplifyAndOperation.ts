import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";

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
