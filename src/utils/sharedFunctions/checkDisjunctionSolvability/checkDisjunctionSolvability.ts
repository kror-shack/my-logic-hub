import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  getBracketedNegation,
  getSearchIndexInDS,
  getTopLevelNegation,
  searchInArray,
  searchInDS,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";

/**
 *
 * Simplify dijunctive statement
 *
 * This function checks for whether the dijunction, passed in as the premise param,
 * can be used to expand the knowledge base by checking in the knowledge base for the existence (implicit or explicit) of the negation of both wffs(before
 * and after the OR operator) and deducing the respective wff by using disjunctive syllogism.
 *
 * @param premise - the current wff
 * @param previousDeductionStepsArr - An array of all the deduction steps.
 * @returns - An updated deduction steps array if wff could be simplified/solved otherwise false.
 */
const checkDisjunctionSolvability = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  const [beforeDisj, afterDisj] = splitArray(premise, "|");

  const bracketedNegBeforeDisj = getTopLevelNegation(beforeDisj);

  const bracketedNegAfterDisj = getTopLevelNegation(afterDisj);

  // p | q with ~p
  const bracketedNegBeforeDisjDS = checkKnowledgeBase(
    bracketedNegBeforeDisj,
    deductionStepsArr
  );
  if (bracketedNegBeforeDisjDS && !searchInDS(deductionStepsArr, afterDisj)) {
    addDeductionStep(
      bracketedNegBeforeDisjDS,
      afterDisj,
      "Disjunctive Syllogism",
      `${getSearchIndexInDS(
        bracketedNegBeforeDisjDS,
        premise
      )},${getSearchIndexInDS(
        bracketedNegBeforeDisjDS,
        bracketedNegBeforeDisj
      )}`
    );
    return bracketedNegBeforeDisjDS;
  }
  const bracketedNegAfterDisjDS = checkKnowledgeBase(
    bracketedNegAfterDisj,
    deductionStepsArr
  );
  if (
    bracketedNegAfterDisjDS &&
    !searchInDS(bracketedNegAfterDisjDS, beforeDisj)
  ) {
    addDeductionStep(
      bracketedNegAfterDisjDS,
      beforeDisj,
      "Disjunctive Syllogism",
      `${getSearchIndexInDS(
        bracketedNegAfterDisjDS,
        premise
      )},${getSearchIndexInDS(bracketedNegAfterDisjDS, bracketedNegAfterDisj)}`
    );
    return bracketedNegAfterDisjDS;
  }

  return false;
};

export default checkDisjunctionSolvability;
