import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import {
  addToSimplifiableExpressions,
  getKbFromDS,
  getOperator,
  searchIndex,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../helperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";
import { checkBiConditionalDerivation } from "../checkBiConditionalDerivation/checkBiConditionalDerivation";
import { checkConditionalDerivation } from "../checkConditionalDerivation/checkConditionalDerivation";
const getAnnotatedDerivation = (
  conclusionString: string,
  argument?: string[]
): DeductionStep[] | false => {
  const conclusion = parseSymbolicLogicInput(conclusionString, true);

  let simplifiableExpressions: string[][] = [];
  let deductionStepsArr: DeductionStep[] = [];
  let oldDeductionStepsLength = deductionStepsArr.length;
  let oldSimplifiableExpLength = simplifiableExpressions.length;

  const derivedRules: DerivedRules = {
    isDeMorganAllowed: false,
    isMaterialImpAllowed: false,
    isHypSyllAllowed: false,
    isCommutationAllowed: false,
  };

  // Case 1: if premises are given
  if (argument) {
    // for (let i = 0; i < argument.length; i++) {
    //   const premise = argument[i];
    //   const premiseArr = parseSymbolicLogicInput(premise);
    //   if (getOperator(premiseArr)) {
    //     simplifiableExpressions.push(premiseArr);
    //   }
    //   knowledgeBase.push(premiseArr);
    // }
    // expandMLKnowledgeBase(
    //   simplifiableExpressions,
    //   knowledgeBase,
    //   deductionStepsArr
    // );
    // const localKnowledgeBase = knowledgeBase;
    // const allDeductionsArr = knowledgeBase;

    // return getAnnotatedDerivationSteps(
    //   operator,
    //   conclusion,
    //   deductionStepsArr,
    //   localKnowledgeBase,
    //   allDeductionsArr
    // );
    return false;
  }
  // Case 2 : Testing Theorums
  else {
    return getAnnotatedDerivationSteps(
      conclusion,
      deductionStepsArr,
      derivedRules
    );
  }
};

export default getAnnotatedDerivation;

/**
 * TODO: before passing the args for annotated derivations,
 * add brackets wherever necessary
 */

// The current version opens and closes with the same type of
// proof i.e., if while generating the contradiction steps for Show R
// R itself is found, it will not close the show R statement unless a contradiction
// including or excluding R is found
const getAnnotatedDerivationSteps = (
  conclusion: string[],
  deductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules
) => {
  const operator = getOperator(conclusion);
  if (operator === "->") {
    const conditionalDerivationSteps = checkConditionalDerivation(
      conclusion,
      deductionStepsArr,
      derivedRules
    );
    console.log(conditionalDerivationSteps);
    if (conditionalDerivationSteps) return conditionalDerivationSteps;
  } else if (operator === "<->") {
    const biConditionalSteps = checkBiConditionalDerivation(
      conclusion,
      deductionStepsArr,
      derivedRules
    );
    console.log(biConditionalSteps);
    if (biConditionalSteps) return biConditionalSteps;
  }

  return false;
};
