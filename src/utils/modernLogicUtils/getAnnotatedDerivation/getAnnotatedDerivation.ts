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
  console.log("here");

  let simplifiableExpressions: string[][] = [];
  let deductionStepsArr: DeductionStep[] = [];
  let oldDeductionStepsLength = deductionStepsArr.length;
  let oldSimplifiableExpLength = simplifiableExpressions.length;

  const derivedRules: DerivedRules = {
    isDeMorganAllowed: true,
    isMaterialImpAllowed: true,
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
    do {
      console.log("doing");
      const deductionSteps = getAnnotatedDerivationSteps(
        conclusion,
        deductionStepsArr,
        derivedRules
      );
      if (deductionSteps) return deductionSteps;
      if (
        oldDeductionStepsLength !== deductionStepsArr.length ||
        oldSimplifiableExpLength !== simplifiableExpressions.length
      ) {
        oldDeductionStepsLength = deductionStepsArr.length;
        oldSimplifiableExpLength = simplifiableExpressions.length;
        const deductionSteps = getAnnotatedDerivationSteps(
          conclusion,
          deductionStepsArr,
          derivedRules
        );
        if (deductionSteps) return deductionSteps;
        const expandedSteps = expandKnowledgeBase(
          simplifiableExpressions,
          deductionStepsArr,
          derivedRules
        );
        if (expandedSteps) deductionStepsArr = expandedSteps;
        const knowledgeBase = getKbFromDS(deductionStepsArr);
        addToSimplifiableExpressions(knowledgeBase, simplifiableExpressions);
      } else {
        // breaks out of the loop if no new element is added to the knowledge base that can
        // be simplified to reach the deductions steps
        break;
      }
    } while (true);

    return getAnnotatedDerivationSteps(
      conclusion,
      deductionStepsArr,
      derivedRules
    );
  }
};

export default getAnnotatedDerivation;

const getAnnotatedDerivationSteps = (
  conclusion: string[],
  deductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules
) => {
  const operator = getOperator(conclusion);
  console.log("🚀 ~ operator:", operator);
  if (operator === "->") {
    const conditionalDerivationSteps = checkConditionalDerivation(
      conclusion,
      deductionStepsArr,
      derivedRules
    );
    console.log(deductionStepsArr);
    if (conditionalDerivationSteps) return conditionalDerivationSteps;
  }
  // else if (operator === "<->") {
  //   const isDerivable = checkBiConditionalDerivation(
  //     conclusion,
  //     deductionStepsArr,
  //     localKnowledgeBase,
  //     allDeductionsArr
  //   );

  //   if (isDerivable) return deductionStepsArr;
  //   else return deductionStepsArr;
  // }

  return false;
};
