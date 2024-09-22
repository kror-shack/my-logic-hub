import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import {
  addBracketsIfNecessary,
  changeFromPropertyToStartAtOne,
  getOperator,
  getSearchIndexInDS,
  searchIfExistsAsShow,
  searchInArray,
  searchInDS,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkConditionalDerivation from "../checkConditionalDerivation/checkConditionalDerivation";
import checkMLKnowledgeBase from "../checkMLKnowledgeBase/checkMLKnowledgeBase";
import {
  addMLDeductionStep,
  closeDeductionStep,
} from "../helperFunctions/helperFunction";

const checkConjunctionDerivation = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules
): DeductionStep[] | false => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  if (searchInDS(deductionStepsArr, premise)) {
    return deductionStepsArr;
  }
  if (!searchIfExistsAsShow(deductionStepsArr, premise)) {
    addMLDeductionStep(deductionStepsArr, premise, null, null, true);
  }

  const operator = getOperator(premise);

  if (operator !== "&") return false;
  const [before, after] = splitArray(premise, "&");

  const beforeDS = checkConditionalDerivation(
    before,
    deductionStepsArr,
    derivedRules,
    false
  );

  if (!beforeDS) return false;
  const afterDS = checkConditionalDerivation(
    after,
    beforeDS,
    derivedRules,
    false
  );

  if (!afterDS) return false;

  addMLDeductionStep(
    afterDS,
    premise,
    "Conjunction",
    `${getSearchIndexInDS(afterDS, before)},${getSearchIndexInDS(
      afterDS,
      after
    )} `
  );
  closeDeductionStep(afterDS, premise);
  return afterDS;
};

export default checkConjunctionDerivation;
