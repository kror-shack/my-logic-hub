import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import {
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
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
  deductionStepsArr: ModernLogicDeductionStep[],
  knowledgeBase: string[][],
  allDeductionsArray: string[][]
): boolean => {
  if (searchInArray(knowledgeBase, premise)) {
    return true;
  }

  const operator = getOperator(premise);
  const localKnowledgeBase = knowledgeBase;

  const premiseObj: ModernLogicDeductionStep = {
    rule: null,
    from: null,
    obtained: premise,
    show: true,
    closed: null,
  };

  // if it already exists as a show statement in the deduction steps
  // then it should not be added again
  if (!existsInMLDS(deductionStepsArr, premiseObj)) {
    addMLDeductionStep(deductionStepsArr, premise, null, null, true);
    allDeductionsArray.push(premise);
  }

  if (operator !== "->") return false;
  const [antecedent, consequent] = splitArray(premise, "->");

  addMLDeductionStep(deductionStepsArr, antecedent, "ACD", null);

  pushLocallyDeducedPremise(antecedent, localKnowledgeBase, allDeductionsArray);

  addMLDeductionStep(deductionStepsArr, consequent, null, null, true);
  allDeductionsArray.push(consequent);

  //if the consequent exists in the knowledge base then
  //this conditional adds it to the deduction steps array
  if (searchInArray(localKnowledgeBase, consequent)) {
    addMLDeductionStep(
      deductionStepsArr,
      consequent,
      "R", //reiteration since the consequent already exists in the kb
      searchIndex(allDeductionsArray, consequent)
    );

    closeDeductionStep(deductionStepsArr, premise);
    knowledgeBase.push(premise);
    closeDeductionStep(deductionStepsArr, consequent);

    return true;
  } else if (
    checkMLKnowledgeBase(
      consequent,
      localKnowledgeBase,
      allDeductionsArray,
      deductionStepsArr
    )
  ) {
    knowledgeBase.push(consequent);
    knowledgeBase.push(premise);
    closeDeductionStep(deductionStepsArr, premise);
    closeDeductionStep(deductionStepsArr, consequent);

    return true;
  }

  return false;
};
