import {
  addDeductionStep,
  areStringArraysEqual,
  convertDisjunctionToImp,
  convertImplicationToDisjunction,
  getNegatedBiconditionalCasesToExist,
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { DeductionStep } from "../../../types/sharedTypes";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import { pushLocallyDeducedPremise } from "../helperFunctions/helperFunction";
import { checkDisjunctionDerivation } from "../checkDisjunctionDerivation/checkDisjuntionDerivation";
import { checkConjunctionDerivation } from "../checkConjunctionDerivation/checkConjunctionDerivation";
import { checkConditionalDerivation } from "../checkConditionalDerivation/checkConditionalDerivation";
import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { checkBiConditionalDerivation } from "../checkBiConditionalDerivation/checkBiConditionalDerivation";

const checkMLKnowledgeBase = (
  originalPremise: string[],
  localKnowledgeBase: string[][],
  allDeductionsArray: string[][],
  deductionStepsArr: ModernLogicDeductionStep[]
): boolean => {
  const premise = removeOutermostBrackets(originalPremise);
  console.log("🚀 ~ premise:", premise);

  if (searchInArray(localKnowledgeBase, originalPremise)) {
    return true;
  }

  const operator = getOperator(premise);

  // if the proposition is not simplifiable
  if (!operator) {
    console.log("🚀 ~ operator:", operator);

    const elementExists = searchInArray(localKnowledgeBase, premise);
    if (elementExists) {
      console.log(localKnowledgeBase);
      return true;
    }
    console.log("returning false");
    return false;
  } else if (operator === "~")
    return false; //since it is not further simlifiable
  else {
    if (operator === "|") {
      return checkDisjunctionDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
    } else if (operator === "&") {
      return checkConjunctionDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
    } else if (operator === "->") {
      return checkConditionalDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
    } else if (operator === "<->") {
      return checkBiConditionalDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
    }
  }

  return false;
};

export default checkMLKnowledgeBase;
