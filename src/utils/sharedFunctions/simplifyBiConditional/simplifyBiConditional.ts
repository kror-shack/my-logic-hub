import { DeductionStep } from "../../../types/sharedTypes";
import {
  addBracketsIfNecessary,
  addDeductionStep,
  getSearchIndexInDS,
  searchInArray,
  searchInDS,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";

/**
 * Get simplication of a BiConditional Statement.
 *
 * This function simplifies a BiConditional into two material implication wffs
 * joined by a conjunction.
 *
 * @param premise - the current wff
 * @param previousDeductionStepsArr - An array of all the deductions steps
 * @returns - An array of deduction step if wff could be simplied otherwise false.
 */
const simplifyBiConditional = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];

  const [before, after] = splitArray(premise, "<->");

  if (before && after) {
    let modifiedBefore = removeOutermostBrackets(before);
    let modifiedAfter = removeOutermostBrackets(after);
    modifiedBefore = addBracketsIfNecessary(modifiedBefore);
    modifiedAfter = addBracketsIfNecessary(modifiedAfter);
    const modifiedPremise = [
      ...["(", ...modifiedBefore, "->", ...modifiedAfter, ")"],
      "&",
      ...["(", ...modifiedAfter, "->", ...modifiedBefore, ")"],
    ];
    if (!searchInDS(deductionStepsArr, modifiedPremise)) {
      addDeductionStep(
        deductionStepsArr,
        modifiedPremise,
        "Biconditional Elimination",
        `${getSearchIndexInDS(deductionStepsArr, premise)}`
      );
      return deductionStepsArr;
    }
  }

  return false;
};

export default simplifyBiConditional;
