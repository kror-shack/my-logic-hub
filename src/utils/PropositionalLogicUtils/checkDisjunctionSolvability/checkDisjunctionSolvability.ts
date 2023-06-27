import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";
import {
  addDeductionStep,
  getBracketedNegation,
  searchInArray,
  searchIndex,
  splitArray,
} from "../propositionalLogicHelperFunctions/propositionalLogicHelperFunction";

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
