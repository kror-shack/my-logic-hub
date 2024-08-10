import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  getBracketedNegation,
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";
import getNegation from "../../sharedFunctions/getNegation/getNegation";
import { checkConditionalDerivation } from "../checkConditionalDerivation/checkConditionalDerivation";
import checkMLContradictionExploitation from "../checkMLContradictionExploitation/CheckMLContradictionExploitation";
import checkMLKnowledgeBase from "../checkMLKnowledgeBase/checkMLKnowledgeBase";
import expandMLKnowledgeBase from "../expandMLKnowledgeBase/expandMLKnowledgeBase";
import {
  addMLDeductionStep,
  closeDeductionStep,
  existsInMLDS,
  getNegationWithoutDeMorgan,
  pushLocallyDeducedPremise,
} from "../helperFunctions/helperFunction";

export const checkInDirectDerivation = (
  premise: string[],
  deductionStepsArr: ModernLogicDeductionStep[],
  knowledgeBase: string[][],
  allDeductionsArr: string[][]
) => {
  const localKnowledgeBase = knowledgeBase;
  const negatedPremise = getNegationWithoutDeMorgan(premise); //since DeMorgan is not allowed
  const mlItem: ModernLogicDeductionStep = {
    rule: "AID",
    from: null,
    obtained: negatedPremise,
    closed: null,
    show: false,
  };

  //if the it is running with the negation of the same premise, it should not
  // go in the loop again
  if (existsInMLDS(deductionStepsArr, mlItem)) return false;
  addMLDeductionStep(deductionStepsArr, negatedPremise, "AID", null);

  if (
    checkMLContradictionExploitation(
      premise,
      localKnowledgeBase,
      deductionStepsArr,
      allDeductionsArr
    )
  ) {
    closeDeductionStep(deductionStepsArr, premise);
    pushLocallyDeducedPremise(premise, localKnowledgeBase, allDeductionsArr);

    return true;
  } else {
    const operator = getOperator(negatedPremise);
    if (!operator) return false;
    if (operator === "->") {
      return checkConditionalDerivation(
        negatedPremise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArr
      );
    }
  }
  return false;
};
