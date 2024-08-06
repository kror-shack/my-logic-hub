import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import {
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkMLKnowledgeBase from "../checkMLKnowledgeBase/checkMLKnowledgeBase";
import { addMLDeductionStep } from "../helperFunctions/helperFunction";

export const checkBiConditionalDerivation = (
  premise: string[],
  deductionStepsArr: ModernLogicDeductionStep[],
  knowledgeBase: string[][],
  allDeductionsArr: string[][]
): boolean => {
  if (searchInArray(knowledgeBase, premise)) {
    return true;
  }

  const operator = getOperator(premise);
  const localKnowledgeBase = knowledgeBase;
  addMLDeductionStep(deductionStepsArr, premise, null, null, true);

  if (operator !== "<->") return false;
  const [before, after] = splitArray(premise, "<->");

  const eliminatedBiconditional = [
    ...["(", ...before, "->", ...after, ")"],
    "&",
    ...["(", ...after, "->", ...before, ")"],
  ];

  if (
    checkMLKnowledgeBase(
      eliminatedBiconditional,
      localKnowledgeBase,
      allDeductionsArr,
      deductionStepsArr
    )
  ) {
    addMLDeductionStep(
      deductionStepsArr,
      premise,
      "Biconditional Introduction",
      `${searchIndex(knowledgeBase, eliminatedBiconditional)}`
    );
    knowledgeBase.push(eliminatedBiconditional);

    return true;
  }

  return false;
};
