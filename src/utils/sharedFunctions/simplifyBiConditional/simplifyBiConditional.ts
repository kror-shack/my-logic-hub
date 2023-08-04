import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";

const simplifyBiConditional = (
  premise: string[],
  knowledgeBase: string[][]
) => {
  const deductionStepsArr: DeductionStep[] = [];

  const [before, after] = splitArray(premise, "<->");

  if (before && after) {
    const modifiedBefore = removeOutermostBrackets(before);
    const modifiedAfter = removeOutermostBrackets(after);
    const modifiedPremise = [
      ...["(", ...modifiedBefore, "->", ...modifiedAfter, ")"],
      "&",
      ...["(", ...modifiedAfter, "->", ...modifiedBefore, ")"],
    ];
    if (!searchInArray(knowledgeBase, modifiedPremise)) {
      addDeductionStep(
        deductionStepsArr,
        modifiedPremise,
        "Biconditional Elimination",
        `${searchIndex(knowledgeBase, premise)}`
      );
      knowledgeBase.push(modifiedPremise);
    }
  }

  return { knowledgeBase, deductionStepsArr };
};

export default simplifyBiConditional;
