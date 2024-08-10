import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import {
  getOperator,
  searchInArray,
  searchIndex,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkDisjunctionSolvability from "../../sharedFunctions/checkDisjunctionSolvability/checkDisjunctionSolvability";
import checkImplicationSolvability from "../../sharedFunctions/checkImplicationSolvability/checkImplicationSolvability";
import simplifyAndOperation from "../../sharedFunctions/simplifyAndOperation/simplifyAndOperation";
import simplifyBiConditional from "../../sharedFunctions/simplifyBiConditional/simplifyBiConditional";
import {
  addMLDeductionStep,
  convertToModernLogicDeductions,
  getDoubleNegation,
  pushLocallyDeducedPremise,
} from "../helperFunctions/helperFunction";

const expandMLKnowledgeBase = (
  simplifiableExpressions: string[][],
  knowledgeBase: string[][],
  deductionStepsArr: ModernLogicDeductionStep[]
) => {
  for (let i = 0; i < simplifiableExpressions.length; i++) {
    const premise = simplifiableExpressions[i];
    const operator = getOperator(premise);

    if (!operator && premise.length === 1) {
      if (premise[0][0] === "~" && premise[0][1] === "~") {
        const doubleNegatedPremise = getDoubleNegation(premise[0]);
        if (!searchInArray(knowledgeBase, doubleNegatedPremise)) {
          addMLDeductionStep(
            deductionStepsArr,
            doubleNegatedPremise,
            "Double Negation",
            searchIndex(knowledgeBase, premise)
          );

          knowledgeBase.push(doubleNegatedPremise);
        }
      }
    }
    if (operator === "&") {
      const values = simplifyAndOperation(premise, knowledgeBase);
      knowledgeBase = values.knowledgeBase;
      const convertedDeductionSteps = convertToModernLogicDeductions(
        values.deductionStepsArr
      );
      deductionStepsArr.push(...convertedDeductionSteps);
    } else if (operator === "|") {
      const values = checkDisjunctionSolvability(premise, knowledgeBase);
      knowledgeBase = values.knowledgeBase;
      const convertedDeductionSteps = convertToModernLogicDeductions(
        values.deductionStepsArr
      );
      deductionStepsArr.push(...convertedDeductionSteps);
    } else if (operator === "->") {
      const values = checkImplicationSolvability(premise, knowledgeBase);
      knowledgeBase = values.knowledgeBase;
      const convertedDeductionSteps = convertToModernLogicDeductions(
        values.deductionStepsArr
      );
      deductionStepsArr.push(...convertedDeductionSteps);
    } else if (operator === "<->") {
      const values = simplifyBiConditional(premise, knowledgeBase);
      knowledgeBase = values.knowledgeBase;
      const convertedDeductionSteps = convertToModernLogicDeductions(
        values.deductionStepsArr
      );
      deductionStepsArr.push(...convertedDeductionSteps);
    }
  }
  return {
    knowledgeBase: knowledgeBase,
    deductionStepsArr: deductionStepsArr,
  };
};

export default expandMLKnowledgeBase;
