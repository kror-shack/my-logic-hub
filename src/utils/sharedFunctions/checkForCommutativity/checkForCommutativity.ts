import { DeductionStep } from "../../../types/sharedTypes";
import { addDeductionStep } from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";

const checkForCommutativity = (
  premise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  const checkForPremise = removeOutermostBrackets(premise);
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
      return true;
    }
  }
  return false;
};

export default checkForCommutativity;
