import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { DeductionStep } from "../../../types/sharedTypes";
import {
  convertDisjunctionToImp,
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

export const checkDisjunctionDerivation = (
  premise: string[],
  deductionStepsArr: ModernLogicDeductionStep[],
  localKnowledgeBase: string[][],
  allDeductionsArr: string[][]
) => {
  const operator = getOperator(premise);
  if (operator !== "|") return false;
  const [before, after] = splitArray(premise, "|");

  const disjToImp = convertDisjunctionToImp(premise);

  const existingElement = searchInArray(localKnowledgeBase, before)
    ? before
    : searchInArray(localKnowledgeBase, after)
    ? after
    : false;
  if (existingElement && !searchInArray(localKnowledgeBase, premise)) {
    addMLDeductionStep(
      deductionStepsArr,
      premise,
      "Addition",
      searchIndex(allDeductionsArr, existingElement)
    );
    pushLocallyDeducedPremise(premise, localKnowledgeBase, allDeductionsArr);
    return true;
  } else if (searchInArray(localKnowledgeBase, disjToImp)) {
    addMLDeductionStep(
      deductionStepsArr,
      premise,
      "Material Implication",
      searchIndex(allDeductionsArr, disjToImp)
    );
    pushLocallyDeducedPremise(premise, localKnowledgeBase, allDeductionsArr);

    return true;
  } else {
    // gets the simplifiable element(s) from the premise
    const simplifiableElement = getOperator(before)
      ? getOperator(after)
        ? [before, after]
        : [before]
      : getOperator(after)
      ? [after]
      : undefined;

    if (simplifiableElement) {
      for (let i = 0; i < simplifiableElement?.length; i++) {
        if (
          checkMLKnowledgeBase(
            simplifiableElement[i],
            localKnowledgeBase,
            allDeductionsArr,
            deductionStepsArr
          ) &&
          !searchInArray(localKnowledgeBase, premise)
        ) {
          addMLDeductionStep(
            deductionStepsArr,
            premise,
            "Addition",
            searchIndex(allDeductionsArr, simplifiableElement[i])
          );
          pushLocallyDeducedPremise(
            premise,
            localKnowledgeBase,
            allDeductionsArr
          );

          return true;
        }
      }
    }
  }
  return false;
};
