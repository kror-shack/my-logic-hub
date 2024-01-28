import { DeductionStep } from "../../../types/propositionalLogicTypes/types";
import {
  addBracketsIfNecessary,
  addDeductionStep,
  getTopLevelNegation,
  searchInArray,
  searchIndex,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkKnowledgeBase from "../../sharedFunctions/checkKnowledgeBase/checkKnowledgeBase";
import getNegation from "../../sharedFunctions/getNegation/getNegation";

/**
 * Checks for contradiction
 *
 * This function checks for contradiction within the knowledge base by checking
 * if two contradictory premises exist or can be deduced from within the knoweldge base
 *
 * @param knowledgeBase - the knowledge base which is modified if applicable
 * @param deductionStepsArr - the deduction steps array which is modified if applicable.
 * @returns - true if a contradiction exists, otherwise false
 */

const checkForContradiction = (
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  for (let i = 0; i < knowledgeBase.length; i++) {
    const premise = knowledgeBase[i];
    const negatedPremise = getTopLevelNegation(premise);
    const bracketedPremise = addBracketsIfNecessary(premise);
    const obtained = [...bracketedPremise, "&", ...negatedPremise];

    if (searchInArray(knowledgeBase, negatedPremise)) {
      addDeductionStep(
        deductionStepsArr,
        obtained,
        "Conjunction",
        `${searchIndex(knowledgeBase, premise)}, ${searchIndex(
          knowledgeBase,
          negatedPremise
        )}`
      );
      knowledgeBase.push(obtained);
      return true;
    }

    if (checkKnowledgeBase(negatedPremise, knowledgeBase, deductionStepsArr)) {
      addDeductionStep(
        deductionStepsArr,
        obtained,
        "Conjunction",
        `${searchIndex(knowledgeBase, premise)}, ${searchIndex(
          knowledgeBase,
          negatedPremise
        )}`
      );
      knowledgeBase.push(obtained);
      return true;
    }
  }
  return false;
};

export default checkForContradiction;
