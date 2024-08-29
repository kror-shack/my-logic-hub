import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import {
  getOperator,
  getSearchIndexInDS,
  searchInArray,
  searchInDS,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkMLKnowledgeBase from "../checkMLKnowledgeBase/checkMLKnowledgeBase";
import { addMLDeductionStep } from "../helperFunctions/helperFunction";

export const checkBiConditionalDerivation = (
  premise: string[],
  previousDeductionStepsArr: ModernLogicDeductionStep[],
  derivedRules: DerivedRules
): DeductionStep[] | false => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  if (searchInDS(deductionStepsArr, premise)) {
    return deductionStepsArr;
  }

  const operator = getOperator(premise);
  addMLDeductionStep(deductionStepsArr, premise, null, null, true);

  if (operator !== "<->") return false;
  const [before, after] = splitArray(premise, "<->");

  const eliminatedBiconditional = [
    ...["(", ...before, "->", ...after, ")"],
    "&",
    ...["(", ...after, "->", ...before, ")"],
  ];

  const eliminatedBiCondDS = checkMLKnowledgeBase(
    eliminatedBiconditional,
    deductionStepsArr,
    derivedRules
  );

  if (eliminatedBiCondDS) {
    addMLDeductionStep(
      eliminatedBiCondDS,
      premise,
      "Biconditional Introduction",
      `${getSearchIndexInDS(eliminatedBiCondDS, eliminatedBiconditional)}`
    );

    return eliminatedBiCondDS;
  }

  return false;
};
