import {
  areStringArraysEqual,
  getKbFromDS,
  getOperator,
  getSearchIndexInDS,
  getTopLevelNegation,
  getUsableKbFromDS,
  searchInArray,
  searchInDS,
  searchIndex,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import {
  addMLDeductionStep,
  getDoubleNegation,
  getSimplifiableExpressions,
  matchArrayLengthsByAddingEmptyStrings,
  removeEmptyArrays,
} from "../helperFunctions/helperFunction";
import { checkConditionalDerivation } from "../checkConditionalDerivation/checkConditionalDerivation";
import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { checkBiConditionalDerivation } from "../checkBiConditionalDerivation/checkBiConditionalDerivation";
import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";

const checkMLKnowledgeBase = (
  originalPremise: string[],
  previosDeductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules
): DeductionStep[] | false => {
  let deductionStepsArr = [...previosDeductionStepsArr];
  let oldDeductionStepLength = deductionStepsArr.length;

  /**
   * knowlede base expansion
   */
  do {
    oldDeductionStepLength = deductionStepsArr.length;
    const simplifiableExpressions = getSimplifiableExpressions(
      getUsableKbFromDS(deductionStepsArr)
    );

    const expandedSteps = expandKnowledgeBase(
      simplifiableExpressions,
      deductionStepsArr,
      derivedRules
    );
    if (expandedSteps) deductionStepsArr = expandedSteps;
  } while (deductionStepsArr.length !== oldDeductionStepLength);

  const premise = removeOutermostBrackets(originalPremise);

  if (searchInDS(deductionStepsArr, premise)) {
    return deductionStepsArr;
  }

  const operator = getOperator(premise);

  // if the proposition is not simplifiable
  if (!operator) {
    const elementExists = searchInDS(deductionStepsArr, premise);
    if (elementExists) {
      return deductionStepsArr;
    }
    if (premise[0][0] === "~") {
      //TODO: check the return value from get double negation
      const doubleNegatedPremise = getDoubleNegation(premise[0]);
      console.log("🚀 ~ doubleNegatedPremise:", doubleNegatedPremise);

      //search in array instead of backward chaining for any negations > 2 with be
      //simplifed in the expand kb function before reaching here
      if (searchInDS(deductionStepsArr, doubleNegatedPremise)) {
        addMLDeductionStep(
          deductionStepsArr,
          premise,
          "Double Negation",
          getSearchIndexInDS(deductionStepsArr, premise)
        );

        return deductionStepsArr;
      }
    }

    /**
     * IMPORTANT: HAVE TO REFACTOR IT!
     */
    // if (
    //   checkMLContradictionExploitation(
    //     premise,
    //     localKnowledgeBase,
    //     deductionStepsArr,
    //     allDeductionsArray
    //   )
    // )
    //   return true;
    return false;
  } else {
    if (operator === "~") {
      const doubleNegatedPremise = getDoubleNegation(premise[0]);
      console.log("🚀 ~ doubleNegatedPremise:", doubleNegatedPremise);

      //search in array instead of backward chaining for any negations > 2 with be
      //simplifed in the expand kb function before reaching here
      if (searchInDS(deductionStepsArr, doubleNegatedPremise)) {
        addMLDeductionStep(
          deductionStepsArr,
          premise,
          "Double Negation",
          getSearchIndexInDS(deductionStepsArr, premise)
        );

        return deductionStepsArr;
      }
    }
    if (operator === "->") {
      console.log("checking if it goes to", premise);
      console.log(deductionStepsArr);
      const conditionalDS = checkConditionalDerivation(
        premise,
        deductionStepsArr,
        derivedRules
      );
      if (conditionalDS) return conditionalDS;
    }
    //   if (operator === "|") {
    //     const disjuDS = checkDisjunctionDerivation(
    //       premise,
    //       deductionStepsArr,
    //       localKnowledgeBase,
    //       allDeductionsArray
    //     );
    //     if (isDerivable) return true;
    //   } else if (operator === "&") {
    //     const isDerivable = checkConjunctionDerivation(
    //       premise,
    //       deductionStepsArr,
    //       localKnowledgeBase,
    //       allDeductionsArray
    //     );
    //     if (isDerivable) return true;
    //   } else if (operator === "->") {
    //     console.log("checking if it goes to", premise);
    //     const isDerivable = checkConditionalDerivation(
    //       premise,
    //       deductionStepsArr,
    //       localKnowledgeBase,
    //       allDeductionsArray
    //     );
    //     if (isDerivable) return true;
    //   } else if (operator === "<->") {
    //     const isDerivable = checkBiConditionalDerivation(
    //       premise,
    //       deductionStepsArr,
    //       localKnowledgeBase,
    //       allDeductionsArray
    //     );
    //     if (isDerivable) return true;
    //   }
    // }
  }
  return false;
};

export default checkMLKnowledgeBase;
