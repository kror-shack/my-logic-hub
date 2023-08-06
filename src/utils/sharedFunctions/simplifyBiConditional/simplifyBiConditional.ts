import { DeductionStep } from "../../../types/sharedTypes";
import {
  addBracketsIfNecessary,
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
    let modifiedBefore = removeOutermostBrackets(before);
    let modifiedAfter = removeOutermostBrackets(after);
    modifiedBefore = addBracketsIfNecessary(modifiedBefore);
    modifiedAfter = addBracketsIfNecessary(modifiedAfter);
    const modifiedPremise = [
      ...["(", ...modifiedBefore, "->", ...modifiedAfter, ")"],
      "&",
      ...["(", ...modifiedAfter, "->", ...modifiedBefore, ")"],
    ];
    console.log(modifiedPremise);
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
