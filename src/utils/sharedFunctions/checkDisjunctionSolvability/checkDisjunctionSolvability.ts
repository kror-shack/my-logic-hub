import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  getBracketedNegation,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
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
 * @param knowledgeBase - the knowlede base
 * @returns -  An object containing the (updated if applicable) knowledge base and an array of deduction steps.
 */
const checkDisjunctionSolvability = (
  premise: string[],
  knowledgeBase: string[][]
) => {
  const deductionStepsArr: DeductionStep[] = [];
  const [beforeDisj, afterDisj] = splitArray(premise, "|");
  const bracketedNegBeforeDisj = getBracketedNegation(beforeDisj);
  const bracketedNegAfterDisj = getBracketedNegation(afterDisj);

  // p | q with ~p
  if (
    checkKnowledgeBase(
      bracketedNegBeforeDisj,
      knowledgeBase,
      deductionStepsArr
    ) &&
    !searchInArray(knowledgeBase, afterDisj)
  ) {
    addDeductionStep(
      deductionStepsArr,
      afterDisj,
      "Disjunctive Syllogism",
      `${searchIndex(knowledgeBase, premise)},${searchIndex(
        knowledgeBase,
        bracketedNegBeforeDisj
      )}`
    );
    knowledgeBase.push(afterDisj);
  } else if (
    checkKnowledgeBase(
      bracketedNegAfterDisj,
      knowledgeBase,
      deductionStepsArr
    ) &&
    !searchInArray(knowledgeBase, beforeDisj)
  ) {
    addDeductionStep(
      deductionStepsArr,
      beforeDisj,
      "Disjunctive Syllogism",
      `${searchIndex(knowledgeBase, premise)},${searchIndex(
        knowledgeBase,
        bracketedNegAfterDisj
      )}`
    );
    knowledgeBase.push(beforeDisj);
  }

  return {
    deductionStepsArr,
    knowledgeBase,
  };
};

export default checkDisjunctionSolvability;
