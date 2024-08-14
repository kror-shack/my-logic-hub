import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  getSearchIndexInDS,
  searchInArray,
  searchInDS,
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
 * @param previousDeductionStepsArr - An array of all the deductions steps.
 * @returns - An updated deduction steps array if wff could be simplified otherwise false.
 */
const simplifyAndOperation = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];

  const [before, after] = splitArray(premise, "&");

  if (before && after) {
    const modifiedBefore = removeOutermostBrackets(before);
    const modifiedAfter = removeOutermostBrackets(after);
    if (!searchInDS(deductionStepsArr, before)) {
      addDeductionStep(
        deductionStepsArr,
        modifiedBefore,
        "Simplification",
        `${getSearchIndexInDS(deductionStepsArr, premise)}`
      );
    }
    if (!searchInDS(deductionStepsArr, after)) {
      addDeductionStep(
        deductionStepsArr,
        modifiedAfter,
        "Simplification",
        `${getSearchIndexInDS(deductionStepsArr, premise)}`
      );
    }
    return deductionStepsArr;
  }
  return false;
};

export default simplifyAndOperation;
