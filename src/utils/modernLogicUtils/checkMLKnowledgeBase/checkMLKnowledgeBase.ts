import {
  areStringArraysEqual,
  getKbFromDS,
  getOperator,
  getSearchIndexInDS,
  getTopLevelNegation,
  getUsableKbFromDS,
  searchIfExistsAsShow,
  searchInArray,
  searchInDS,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import {
  addMLDeductionStep,
  closeDeductionStep,
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
import checkMLContradictionExploitation from "../checkMLContradictionExploitation/CheckMLContradictionExploitation";
import { execArgv } from "process";
import getDesiredConcFromAssumption from "../getDesiredConcFromAssumption/getDesiredConcFromAssumption";

const checkMLKnowledgeBase = (
  originalPremise: string[],
  previosDeductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules
): DeductionStep[] | false => {
  let deductionStepsArr = [...previosDeductionStepsArr];
  let oldDeductionStepLength = deductionStepsArr.length;

  const expandedAssumptionsSteps = expandAssumptions(
    deductionStepsArr,
    derivedRules
  );
  if (expandedAssumptionsSteps) deductionStepsArr = expandedAssumptionsSteps;

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

    return false;
  } else {
    if (operator === "~") {
      const doubleNegatedPremise = getDoubleNegation(premise[0]);

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

const expandAssumptions = (
  previosDeductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules
): DeductionStep[] | false => {
  const deductionStepsArr = [...previosDeductionStepsArr];
  const allAssumptions = deductionStepsArr.filter(
    (premise) =>
      premise.rule === "ACD" &&
      getOperator(premise.obtained) &&
      getOperator(premise.obtained) === "->"
  );
  console.log("🚀 ~ allAssumptions:", allAssumptions);

  for (let i = 0; i < allAssumptions.length; i++) {
    const premise = allAssumptions[i].obtained;
    const operator = getOperator(premise);
    if (!operator || operator !== "->") continue;
    const [antecedent, consequent] = splitArray(premise, "->");
    const beforeOperator = getOperator(antecedent);
    if (beforeOperator === "->") {
      if (
        !searchIfExistsAsShow(deductionStepsArr, antecedent) &&
        !searchInDS(deductionStepsArr, consequent)
      ) {
        addMLDeductionStep(deductionStepsArr, antecedent, null, null, true);
        const beforeDS = checkConditionalDerivation(
          antecedent,
          deductionStepsArr,
          derivedRules
        );
        if (beforeDS) {
          /**
           * SHOULD NOT BE NEEDED AS THE NEXT CALL TO CHECK ML KNOWLEDGE BASE SHOULD ALREADY EXPAND IT.
           * ADDING IT HERE MEANS THAT THE CHECK FOR THE CONCLUSION IS FOR SOME REASON ENDING HERE
           * MOVING THE CALL TO THIS FUNCTION BEFORE THE EXPANSION OF THE KB FIXES THIS ISSUE
           */
          addMLDeductionStep(
            beforeDS,
            consequent,
            "Modus Ponens",
            `${getSearchIndexInDS(beforeDS, antecedent)}, ${getSearchIndexInDS(
              beforeDS,
              premise
            )}`
          );
          closeDeductionStep(deductionStepsArr, antecedent);
          return beforeDS;
        }
      }
    }
  }
  return false;
};
