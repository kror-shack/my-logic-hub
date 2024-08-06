import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";
import checkMLKnowledgeBase from "../checkMLKnowledgeBase/checkMLKnowledgeBase";
import expandMLKnowledgeBase from "../expandMLKnowledgeBase/expandMLKnowledgeBase";
import {
  addMLDeductionStep,
  closeDeductionStep,
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
  deductionStepsArray: ModernLogicDeductionStep[],
  knowledgeBase: string[][],
  allDeductionsArray: string[][]
): boolean => {
  if (searchInArray(knowledgeBase, premise)) {
    return true;
  }
  const operator = getOperator(premise);
  const localKnowledgeBase = knowledgeBase;
  addMLDeductionStep(deductionStepsArray, premise, null, null, true);

  if (operator !== "->") return false;
  const [antecedent, consequent] = splitArray(premise, "->");

  const antecdentOperator = getOperator(antecedent);

  addMLDeductionStep(deductionStepsArray, antecedent, "ACD", null);
  pushLocallyDeducedPremise(antecedent, localKnowledgeBase, allDeductionsArray);
  addMLDeductionStep(deductionStepsArray, consequent, null, null, true);

  // must come after the addition of ACD to knowledgebase for correct deduction order
  if (antecdentOperator && antecdentOperator === "&") {
    const [antecedentBefore, antecedentAfter] = splitArray(antecedent, "&");

    if (
      !searchInArray(localKnowledgeBase, antecedentBefore) ||
      !searchInArray(localKnowledgeBase, antecedentAfter)
    ) {
      // to simplify any and operations
      expandMLKnowledgeBase(
        [...[antecedent]],
        localKnowledgeBase,
        deductionStepsArray
      );
      allDeductionsArray = localKnowledgeBase;
    }
    console.log("🚀 ~ localKnowledgeBase:", localKnowledgeBase);
  }

  //if the consequent exists in the knowledge base then
  //this conditional adds it to the deduction steps array
  if (searchInArray(localKnowledgeBase, consequent)) {
    addMLDeductionStep(
      deductionStepsArray,
      consequent,
      "R", //reiteration since the consequent already exists in the kb
      searchIndex(allDeductionsArray, consequent)
    );
    console.log("it is herer");

    closeDeductionStep(deductionStepsArray, premise);
    pushLocallyDeducedPremise(
      consequent,
      localKnowledgeBase,
      allDeductionsArray
    );
    pushLocallyDeducedPremise(premise, localKnowledgeBase, allDeductionsArray);

    closeDeductionStep(deductionStepsArray, consequent);

    console.log("🚀 ~ deductionStepsArray:", deductionStepsArray);
    return true;
  } else if (
    checkMLKnowledgeBase(
      consequent,
      localKnowledgeBase,
      allDeductionsArray,
      deductionStepsArray
    )
  ) {
    pushLocallyDeducedPremise(
      consequent,
      localKnowledgeBase,
      allDeductionsArray
    );

    pushLocallyDeducedPremise(premise, localKnowledgeBase, allDeductionsArray);
    closeDeductionStep(deductionStepsArray, premise);
    closeDeductionStep(deductionStepsArray, consequent);

    return true;
  }
  console.log("return false");
  return false;
};
