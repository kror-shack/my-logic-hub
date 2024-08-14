import { DeductionStep } from "../../../types/propositionalLogicTypes/types";
import {
  addBracketsIfNecessary,
  addDeductionStep,
  getKbFromDS,
  getTopLevelNegation,
  searchInArray,
  searchInDS,
  getSearchIndexInDS,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkKnowledgeBase from "../../sharedFunctions/checkKnowledgeBase/checkKnowledgeBase";
import getNegation from "../../sharedFunctions/getNegation/getNegation";

/**
 * Checks for contradiction
 *
 * This function checks for contradiction within the knowledge base by checking
 * if two contradictory premises exist or can be deduced from within the knoweldge base
 *
 * @param previousDeductionStepsArr - An array of all the deductions steps
 * @returns - An array of deduction steps if wff could be simplied otherwise false.
 */

const checkForContradiction = (previousDeductionStepsArr: DeductionStep[]) => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  const knowledgeBase = getKbFromDS(deductionStepsArr);
  for (let i = 0; i < knowledgeBase.length; i++) {
    const premise = knowledgeBase[i];
    const negatedPremise = getTopLevelNegation(premise);
    const bracketedPremise = addBracketsIfNecessary(premise);
    const obtained = [...bracketedPremise, "&", ...negatedPremise];

    if (searchInDS(deductionStepsArr, negatedPremise)) {
      addDeductionStep(
        deductionStepsArr,
        obtained,
        "Conjunction",
        `${getSearchIndexInDS(
          deductionStepsArr,
          premise
        )}, ${getSearchIndexInDS(deductionStepsArr, negatedPremise)}`
      );
      return deductionStepsArr;
    }

    const negatedPremiseSteps = checkKnowledgeBase(
      negatedPremise,
      deductionStepsArr
    );
    if (negatedPremiseSteps) {
      addDeductionStep(
        negatedPremiseSteps,
        obtained,
        "Conjunction",
        `${getSearchIndexInDS(
          negatedPremiseSteps,
          premise
        )}, ${getSearchIndexInDS(negatedPremiseSteps, negatedPremise)}`
      );
      return negatedPremiseSteps;
    }
  }
  return false;
};

export default checkForContradiction;
