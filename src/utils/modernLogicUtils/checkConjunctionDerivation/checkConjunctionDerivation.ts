import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { DeductionStep } from "../../../types/sharedTypes";
import {
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkMLKnowledgeBase from "../checkMLKnowledgeBase/checkMLKnowledgeBase";
import {
  addMLDeductionStep,
  pushLocallyDeducedPremise,
} from "../helperFunctions/helperFunction";

export const checkConjunctionDerivation = (
  premise: string[],
  deductionStepsArr: ModernLogicDeductionStep[],
  localKnowledgeBase: string[][],
  allDeductionsArr: string[][]
) => {
  console.log("🚀 ~ localKnowledgeBase:", localKnowledgeBase);
  const operator = getOperator(premise);
  if (operator !== "&") return false;
  const [before, after] = splitArray(premise, "&");
  const existingBefore = searchInArray(localKnowledgeBase, before);
  const exisitngAfter = searchInArray(localKnowledgeBase, after);
  if (
    existingBefore &&
    exisitngAfter &&
    !searchInArray(localKnowledgeBase, premise)
  ) {
    addMLDeductionStep(
      deductionStepsArr,
      premise,
      "Conjunction",
      `${searchIndex(allDeductionsArr, before)},${searchIndex(
        allDeductionsArr,
        after
      )}`
    );
    pushLocallyDeducedPremise(premise, localKnowledgeBase, allDeductionsArr);

    return true;
  } else {
    const simplifiableElements = getOperator(before)
      ? getOperator(after)
        ? [before, after]
        : [before]
      : getOperator(after)
      ? [after]
      : undefined;
    if (simplifiableElements) {
      return (
        checkMLKnowledgeBase(
          before,
          localKnowledgeBase,
          allDeductionsArr,
          deductionStepsArr
        ) &&
        checkMLKnowledgeBase(
          after,
          localKnowledgeBase,
          allDeductionsArr,
          deductionStepsArr
        ) &&
        checkMLKnowledgeBase(
          premise,
          localKnowledgeBase,
          allDeductionsArr,
          deductionStepsArr
        )
      );
    }
  }
  return false;
};
