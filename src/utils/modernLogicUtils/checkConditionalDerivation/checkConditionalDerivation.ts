import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import {
  getOperator,
  getSearchIndexInDS,
  searchInArray,
  searchInDS,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkForContradiction from "../../pLIndirectProofUtils/checkForContradiction/checkForContradiction";
import checkKnowledgeBase from "../../sharedFunctions/checkKnowledgeBase/checkKnowledgeBase";
import checkMLKnowledgeBase from "../checkMLKnowledgeBase/checkMLKnowledgeBase";
import {
  addMLDeductionStep,
  closeDeductionStep,
  existsInMLDS,
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
  console.log("🚀 ~ premise:", premise);
  const deductionStepsArr = [...previousDeductionStepsArr];
  console.log("🚀 ~ deductionStepsArr:", deductionStepsArr);
  if (searchInDS(deductionStepsArr, premise)) {
    return deductionStepsArr;
  }

  const operator = getOperator(premise);

  // if it already exists as a show statement in the deduction steps
  // then it should not be added again
  if (!searchInDS(deductionStepsArr, premise, false)) {
    addMLDeductionStep(deductionStepsArr, premise, null, null, true);
  }

  if (operator !== "->") return false;
  const [antecedent, consequent] = splitArray(premise, "->");
  console.log("🚀 ~ antecedent:", antecedent);

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

    return deductionStepsArr;
  }

  // search if the consequent can be deduced from the kb
  const consequentDS = checkMLKnowledgeBase(
    consequent,
    deductionStepsArr,
    derivedRules
  );

  if (consequentDS) {
    closeDeductionStep(consequentDS, premise);
    closeDeductionStep(consequentDS, consequent);

    return consequentDS;
  }

  //  {
  //   closeDeductionStep(deductionStepsArr, premise);
  //   pushLocallyDeducedPremise(premise, localKnowledgeBase, allDeductionsArr);

  return false;
};
