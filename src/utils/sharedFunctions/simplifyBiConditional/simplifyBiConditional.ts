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
 * @param knowledgeBase - the knowledge base
 * @returns - An object containing the updated knowledge base and an array of deduction steps.
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
    }
  }

  return deductionStepsArr;
};

export default simplifyBiConditional;
