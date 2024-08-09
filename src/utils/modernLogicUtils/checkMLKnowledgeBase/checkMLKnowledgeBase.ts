import {
  areStringArraysEqual,
  getOperator,
  searchInArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import {
  getSimplifiableExpressions,
  matchArrayLengthsByAddingEmptyStrings,
  removeEmptyArrays,
} from "../helperFunctions/helperFunction";
import { checkDisjunctionDerivation } from "../checkDisjunctionDerivation/checkDisjuntionDerivation";
import { checkConjunctionDerivation } from "../checkConjunctionDerivation/checkConjunctionDerivation";
import { checkConditionalDerivation } from "../checkConditionalDerivation/checkConditionalDerivation";
import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { checkBiConditionalDerivation } from "../checkBiConditionalDerivation/checkBiConditionalDerivation";
import expandMLKnowledgeBase from "../expandMLKnowledgeBase/expandMLKnowledgeBase";

const checkMLKnowledgeBase = (
  originalPremise: string[],
  localKnowledgeBase: string[][],
  allDeductionsArray: string[][],
  deductionStepsArr: ModernLogicDeductionStep[]
): boolean => {
  const premise = removeOutermostBrackets(originalPremise);

  // this is to keep the numbering of the premise from property in the same order
  // changing all the previous functions to account for the distiction between allDeductionsArr
  // and knowledgebase would be to introduce unnecessary complexity.
  const kbThatMatchesTheLengthOfAllDeductions =
    matchArrayLengthsByAddingEmptyStrings(
      allDeductionsArray,
      localKnowledgeBase
    );

  // expand the kb before checking if the premise exists
  // such that the assumptions can be used for expansion
  // which would not be possible if done in the main
  // getAnnotedProof function as is done in the
  // getDeductionSteps function
  let oldLengthOfDS = deductionStepsArr.length;
  let firstLengthOfDS = deductionStepsArr.length;
  do {
    oldLengthOfDS = deductionStepsArr.length;

    expandMLKnowledgeBase(
      getSimplifiableExpressions(kbThatMatchesTheLengthOfAllDeductions),
      kbThatMatchesTheLengthOfAllDeductions,
      deductionStepsArr
    );
  } while (oldLengthOfDS != deductionStepsArr.length);

  if (firstLengthOfDS != deductionStepsArr.length) {
    localKnowledgeBase = removeEmptyArrays(
      kbThatMatchesTheLengthOfAllDeductions
    );
    allDeductionsArray = [...localKnowledgeBase];
  }

  if (searchInArray(localKnowledgeBase, originalPremise)) {
    return true;
  }

  const operator = getOperator(premise);

  // if the proposition is not simplifiable
  if (!operator) {
    const elementExists = searchInArray(localKnowledgeBase, premise);
    if (elementExists) {
      return true;
    }
    return false;
  } else {
    if (operator === "|") {
      const isDerivable = checkDisjunctionDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
      if (isDerivable) return true;
    } else if (operator === "&") {
      const isDerivable = checkConjunctionDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
      if (isDerivable) return true;
    } else if (operator === "->") {
      const isDerivable = checkConditionalDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
      if (isDerivable) return true;
    } else if (operator === "<->") {
      const isDerivable = checkBiConditionalDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
      if (isDerivable) return true;
    }
  }
  return false;
};

export default checkMLKnowledgeBase;
