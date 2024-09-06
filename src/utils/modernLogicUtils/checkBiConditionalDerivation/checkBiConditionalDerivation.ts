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

const checkBiConditionalDerivation = (
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

  if (operator !== "<->") return false;
  const [before, after] = splitArray(premise, "<->");
  const bracketedBefore = addBracketsIfNecessary(before);
  const bracketedAfter = addBracketsIfNecessary(after);
  const leftToRightImp = [...bracketedBefore, "->", ...bracketedAfter];
  const rightToLeftImp = [...bracketedAfter, "->", ...bracketedBefore];

  const leftToRightImpDS = checkConditionalDerivation(
    leftToRightImp,
    deductionStepsArr,
    derivedRules,
    false
  );

  /**
   * The right to left imp is passed an empty array of deduction steps
   * since the deduction steps include the show statement i.e., p <-> q
   * and it should only be included once in the entire deduction steps.
   * Since the numbering of the right to left DS are incremeneted according
   * to the length of the left to right DS thus the first show statement is
   * added there (instead of including it at the end and changing the premise
   * numbering for both of the DS)
   */
  const rightToLeftImpDS = checkConditionalDerivation(
    rightToLeftImp,
    [],
    derivedRules,
    false
  );

  if (leftToRightImpDS && rightToLeftImpDS) {
    const leftToRightStepsLength = leftToRightImpDS.length; //-1 to make the numbering start at 0 of the next array
    const updatedLengthRightToLeftImpDS = changeFromPropertyToStartAtOne(
      rightToLeftImpDS,
      leftToRightStepsLength
    );
    const biConditionalDS = [
      ...leftToRightImpDS,
      ...updatedLengthRightToLeftImpDS,
    ];
    addMLDeductionStep(
      biConditionalDS,
      premise,
      "CB",
      `${getSearchIndexInDS(
        biConditionalDS,
        leftToRightImp
      )},${getSearchIndexInDS(biConditionalDS, rightToLeftImp)} `
    );
    closeDeductionStep(biConditionalDS, premise);
    return biConditionalDS;
  }

  return false;
};

export default checkBiConditionalDerivation;
