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

    const operator = getOperator(conclusion);
    // it will have an operator since an error will be thrown for a theroum w/o
    // an operator
    if (operator === "->") {
      const isDerivable = checkConditionalDerivation(
        conclusion,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArr
      );
      console.log("🚀 ~ deductionStepsArr:", deductionStepsArr);

      if (!isDerivable) return false;
      else return deductionStepsArr;
    } else if (operator === "<->") {
      const isDerivable = checkBiConditionalDerivation(
        conclusion,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArr
      );
      console.log("🚀 ~ deductionStepsArr:", deductionStepsArr);
      if (!isDerivable) return false;
      else return deductionStepsArr;
    }
  }
  // Case 2 : Testing Theorums
  else {
    const localKnowledgeBase: string[][] = [];
    const allDeductionsArr = localKnowledgeBase;
    const operator = getOperator(conclusion);

    if (operator === "->") {
      const isDerivable = checkConditionalDerivation(
        conclusion,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArr
      );
      console.log("🚀 ~ deductionStepsArr:", deductionStepsArr);
      if (!isDerivable) return false;
      else return deductionStepsArr;
    } else if (operator === "<->") {
      const isDerivable = checkBiConditionalDerivation(
        conclusion,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArr
      );
      console.log("🚀 ~ deductionStepsArr:", deductionStepsArr);
      if (!isDerivable) return false;
      else return deductionStepsArr;
    }
  }

  return false;
};

export default getAnnotatedDerivation;
