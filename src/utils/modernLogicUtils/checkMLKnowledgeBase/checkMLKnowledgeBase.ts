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
  markUnusableDeductionSteps,
  matchArrayLengthsByAddingEmptyStrings,
  removeEmptyArrays,
} from "../helperFunctions/helperFunction";
import checkConditionalDerivation from "../checkConditionalDerivation/checkConditionalDerivation";
import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";
import checkMLContradictionExploitation from "../checkMLContradictionExploitation/CheckMLContradictionExploitation";
import { execArgv } from "process";
import getDesiredConcFromAssumption from "../getDesiredConcFromAssumption/getDesiredConcFromAssumption";
import checkKnowledgeBase from "../../sharedFunctions/checkKnowledgeBase/checkKnowledgeBase";
import checkConjunctionDerivation from "../checkConjunctionDerivation/checkConjunctionDerivation";
// The skip contradiction param ensures that the contradiction exploitation
// does not run inside of its self which may lead to potential infinite loops
// and incorrect contradictions as if the premise is P and ~P is assumed as the contradiction
// then on the next run the contradiction of ~P will be taken as P.
const checkMLKnowledgeBase = (
  originalPremise: string[],
  previosDeductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules,
  skipContradictionSteps: boolean
): DeductionStep[] | false => {
  console.log("🚀 ~ originalPremise:", originalPremise);
  // A try at optimizing the steps so that it does not add redundant steps and runs
  // twice if it is not deducable by itself
  // might add it so that it runs twice
  // first normally
  // then with expansion with inference rules
  // and finally with expansion with inference rules and assumptions
  let deductionStepsArr = [...previosDeductionStepsArr];

  const existsInKbDS = checkMKKbPrimaryLogic(
    originalPremise,
    deductionStepsArr,
    derivedRules,
    skipContradictionSteps
  );
  if (existsInKbDS) return existsInKbDS;

  const expandedAssumptionsSteps = expandAssumptions(
    deductionStepsArr,
    derivedRules,
    skipContradictionSteps
  );
  if (expandedAssumptionsSteps) deductionStepsArr = expandedAssumptionsSteps;
  return checkMKKbPrimaryLogic(
    originalPremise,
    deductionStepsArr,
    derivedRules,
    skipContradictionSteps
  );
};

export default checkMLKnowledgeBase;

const checkMKKbPrimaryLogic = (
  originalPremise: string[],
  previosDeductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules,
  skipContradictionSteps: boolean
) => {
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

  const withoutAssumptionsDS = checkKnowledgeBase(
    originalPremise,
    deductionStepsArr,
    derivedRules
  );
  if (withoutAssumptionsDS) return withoutAssumptionsDS;

  const operator = getOperator(premise);

  // if the proposition is not simplifiable
  if (!operator) {
    const elementExists = searchInDS(deductionStepsArr, premise);
    if (elementExists) {
      return deductionStepsArr;
    }
    // if (premise[0][0] === "~") {
    //   //TODO: check the return value from get double negation
    //   const doubleNegatedPremise = getDoubleNegation(premise[0]);

    //   //search in array instead of backward chaining for any negations > 2 with be
    //   //simplifed in the expand kb function before reaching here
    //   if (searchInDS(deductionStepsArr, doubleNegatedPremise)) {
    //     console.log(premise);
    //     addMLDeductionStep(
    //       deductionStepsArr,
    //       premise,
    //       "Double Negation",
    //       getSearchIndexInDS(deductionStepsArr, premise)
    //     );
    //     return deductionStepsArr;
    //   }
    // }
  } else {
    if (operator === "~") {
      // // const doubleNegatedPremise = getDoubleNegation(premise[0]);
      // // //search in array instead of backward chaining for any negations > 2 with be
      // // //simplifed in the expand kb function before reaching here
      // // if (searchInDS(deductionStepsArr, doubleNegatedPremise)) {
      // //   addMLDeductionStep(
      // //     deductionStepsArr,
      // //     premise,
      // //     "Double Negation",
      // //     getSearchIndexInDS(deductionStepsArr, premise)
      // //   );
      // //   return deductionStepsArr;
      // // }
    }
    if (operator === "->") {
      const conditionalDS = checkConditionalDerivation(
        premise,
        deductionStepsArr,
        derivedRules,
        skipContradictionSteps
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
    //   }
    else if (operator === "&") {
      const conjunctionSteps = checkConjunctionDerivation(
        premise,
        deductionStepsArr,
        derivedRules
      );
      if (conjunctionSteps) return conjunctionSteps;
    }
    // else if (operator === "->") {
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
  if (!skipContradictionSteps) {
    const contradictionSteps = checkMLContradictionExploitation(
      originalPremise,
      deductionStepsArr,
      derivedRules
    );
    if (contradictionSteps) return contradictionSteps;
  }
  return false;
};

const expandAssumptions = (
  previosDeductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules,
  skipContradictionSteps: boolean
): DeductionStep[] | false => {
  const deductionStepsArr = [...previosDeductionStepsArr];
  const allAssumptions = deductionStepsArr.filter(
    (premise) =>
      premise.rule === "ACD" &&
      getOperator(premise.obtained) &&
      getOperator(premise.obtained) === "->"
  );

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
        const beforeDS = checkConditionalDerivation(
          antecedent,
          deductionStepsArr,
          derivedRules,
          skipContradictionSteps
        );
        if (beforeDS && !searchInDS(beforeDS, consequent)) {
          /**
           * SHOULD NOT BE NEEDED AS THE NEXT CALL TO CHECK ML KNOWLEDGE BASE SHOULD ALREADY EXPAND IT.
           * ADDING IT HERE MEANS THAT THE CHECK FOR THE CONCLUSION IS FOR SOME REASON ENDING HERE
           * MOVING THE CALL TO THIS FUNCTION BEFORE THE EXPANSION OF THE KB FIXES THIS ISSUE
           */

          addMLDeductionStep(deductionStepsArr, antecedent, null, null, true);

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
          return markUnusableDeductionSteps(beforeDS);
        }
      }
    }
  }
  return false;
};
