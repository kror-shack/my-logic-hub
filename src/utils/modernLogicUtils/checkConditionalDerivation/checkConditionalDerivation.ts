import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import {
  areStringArraysEqual,
  getOperator,
  getSearchIndexInDS,
  searchIfExistsAsShow,
  searchInArray,
  searchInDS,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkForContradiction from "../../pLIndirectProofUtils/checkForContradiction/checkForContradiction";
import checkKnowledgeBase from "../../sharedFunctions/checkKnowledgeBase/checkKnowledgeBase";
import checkMLContradictionExploitation from "../checkMLContradictionExploitation/CheckMLContradictionExploitation";
import checkMLKnowledgeBase from "../checkMLKnowledgeBase/checkMLKnowledgeBase";
import {
  addMLDeductionStep,
  closeDeductionStep,
  existsInMLDS,
  markUnusableDeductionSteps,
  pushLocallyDeducedPremise,
} from "../helperFunctions/helperFunction";

/**
 * The local knowledgebase is the deductions and assumptions that belong
 * within a block of proof and cannot be used. All the contents of the knowledgebase
 * (primary) will be included within the local variation but not vice-versa
 *
 * The all deductions array has all the premises of the local knowledgebase
 * of all localities to give the correct numberings to the deductions
 * since the content of inner block proofs cannot be used outside but the numbering
 * should be done accordingly
 */

export const checkConditionalDerivation = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules
): DeductionStep[] | false => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  if (searchInDS(deductionStepsArr, premise)) {
    return deductionStepsArr;
  }

  const operator = getOperator(premise);

  // if it already exists as a show statement in the deduction steps
  // then it should not be added again

  if (!searchIfExistsAsShow(deductionStepsArr, premise)) {
    addMLDeductionStep(deductionStepsArr, premise, null, null, true);
  }

  if (operator !== "->") return false;
  const [antecedent, consequent] = splitArray(premise, "->");

  addMLDeductionStep(deductionStepsArr, antecedent, "ACD", null);

  addMLDeductionStep(deductionStepsArr, consequent, null, null, true);

  //if the consequent exists in the knowledge base then
  //this conditional adds it to the deduction steps array
  if (searchInDS(deductionStepsArr, consequent)) {
    addMLDeductionStep(
      deductionStepsArr,
      consequent,
      "R", //reiteration since the consequent already exists in the kb
      getSearchIndexInDS(deductionStepsArr, consequent)
    );

    closeDeductionStep(deductionStepsArr, premise);

    closeDeductionStep(deductionStepsArr, consequent);

    return markUnusableDeductionSteps(deductionStepsArr);
  }

  // search if the consequent can be deduced from the kb
  const consequentDS = checkMLKnowledgeBase(
    consequent,
    deductionStepsArr,
    derivedRules,
    false
  );

  if (consequentDS) {
    closeDeductionStep(consequentDS, premise);
    closeDeductionStep(consequentDS, consequent);

    return markUnusableDeductionSteps(consequentDS);
  }

  const consequentOperator = getOperator(consequent);
  if (!consequentOperator || consequentOperator === "~") {
    const contradictionSteps = checkMLContradictionExploitation(
      consequent,
      deductionStepsArr,
      derivedRules
    );
    if (contradictionSteps) {
      closeDeductionStep(contradictionSteps, premise);
      closeDeductionStep(contradictionSteps, consequent);

      return markUnusableDeductionSteps(contradictionSteps);
    }
  }

  //  {
  //   closeDeductionStep(deductionStepsArr, premise);
  //   pushLocallyDeducedPremise(premise, localKnowledgeBase, allDeductionsArr);

  return false;
};
