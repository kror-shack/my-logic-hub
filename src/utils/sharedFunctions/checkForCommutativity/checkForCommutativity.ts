import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  getOperator,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";

/**
 *
 * Check for Commutation of a premise
 *
 * This function checks whether a premise contains can be obtained by another
 * premise from the knowledge base i.e., the commutation of the premise exists in the knoweledge base.
 *
 * @param premise - the premise to be checked
 * @param knowledgeBase - the knowledge base which the function modifies it applicable.
 * @param deductionStepsArr - the order of the deduction steps which the function modifies if applicable.
 * @returns - true if there is
 */
const checkForCommutativity = (
  premise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  const checkForPremise = removeOutermostBrackets(premise);
  const operator = getOperator(premise);

  // only apply commutativity on applicable operators
  if (operator === "->" || operator === "<->" || operator === "~") {
    return false;
  }

  for (let i = 0; i < knowledgeBase.length; i++) {
    let checkedAgainstPremise = removeOutermostBrackets(knowledgeBase[i]);
    if (checkForPremise.length !== checkedAgainstPremise.length) {
      continue;
    }

    // Convert arrays to strings to compare them
    const str1 = checkForPremise.join("");
    const str2 = checkedAgainstPremise.join("");

    // Check if one string is the permutation of the other
    if (str1.split("").sort().join("") === str2.split("").sort().join("")) {
      addDeductionStep(deductionStepsArr, premise, "Commutation", i);
      knowledgeBase.push(premise);
      return true;
    }
  }
  return false;
};

export default checkForCommutativity;
