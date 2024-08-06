import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { DeductionStep } from "../../../types/sharedTypes";
import { getOperator } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../helperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";
import { checkBiConditionalDerivation } from "../checkBiConditionalDerivation/checkBiConditionalDerivation";
import { checkConditionalDerivation } from "../checkConditionalDerivation/checkConditionalDerivation";
import expandMLKnowledgeBase from "../expandMLKnowledgeBase/expandMLKnowledgeBase";

const getAnnotatedDerivation = (
  conclusionString: string,
  argument?: string[]
): ModernLogicDeductionStep[] | false => {
  const conclusion = parseSymbolicLogicInput(conclusionString);

  const knowledgeBase: string[][] = [];
  let simplifiableExpressions: string[][] = [];
  const deductionStepsArr: ModernLogicDeductionStep[] = [];
  const operator = getOperator(conclusion);
  if (!operator) return false;

  // Case 1: if premises are given
  if (argument) {
    for (let i = 0; i < argument.length; i++) {
      const premise = argument[i];
      const premiseArr = parseSymbolicLogicInput(premise);
      if (getOperator(premiseArr)) {
        simplifiableExpressions.push(premiseArr);
      }
      knowledgeBase.push(premiseArr);
    }
    expandMLKnowledgeBase(
      simplifiableExpressions,
      knowledgeBase,
      deductionStepsArr
    );
    const localKnowledgeBase = knowledgeBase;
    const allDeductionsArr = knowledgeBase;

    return getAnnotatedDerivationSteps(
      operator,
      conclusion,
      deductionStepsArr,
      localKnowledgeBase,
      allDeductionsArr
    );
  }
  // Case 2 : Testing Theorums
  else {
    const localKnowledgeBase: string[][] = [];
    const allDeductionsArr = localKnowledgeBase;

    return getAnnotatedDerivationSteps(
      operator,
      conclusion,
      deductionStepsArr,
      localKnowledgeBase,
      allDeductionsArr
    );
  }
};

export default getAnnotatedDerivation;

const getAnnotatedDerivationSteps = (
  operator: string,
  conclusion: string[],
  deductionStepsArr: ModernLogicDeductionStep[],
  localKnowledgeBase: string[][],
  allDeductionsArr: string[][]
) => {
  if (operator === "->") {
    const isDerivable = checkConditionalDerivation(
      conclusion,
      deductionStepsArr,
      localKnowledgeBase,
      allDeductionsArr
    );
    if (!isDerivable) return false;
    else return deductionStepsArr;
  } else if (operator === "<->") {
    const isDerivable = checkBiConditionalDerivation(
      conclusion,
      deductionStepsArr,
      localKnowledgeBase,
      allDeductionsArr
    );
    if (!isDerivable) return false;
    else return deductionStepsArr;
  }
  return false;
};
