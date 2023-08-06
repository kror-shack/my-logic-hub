import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import {
  addBracketsIfNecessary,
  addDeductionStep,
  searchInArray,
  searchIndex,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkKnowledgeBase from "../../sharedFunctions/checkKnowledgeBase/checkKnowledgeBase";
import getNegation from "../../sharedFunctions/getNegation/getNegation";

const checkForContradiction = (
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  console.log("in the check for contradiction");
  console.log(knowledgeBase);
  for (let i = 0; i < knowledgeBase.length; i++) {
    const premise = knowledgeBase[i];
    console.log("premise: " + premise);
    const negatedPremise = getNegation(premise);
    console.log("negatedPremise " + negatedPremise);
    const bracketedPremise = addBracketsIfNecessary(premise);
    const bracketedNegatedPremise = addBracketsIfNecessary(negatedPremise);
    console.log(`this is the premise: ` + premise);
    console.log(`this is the negated premise: ` + negatedPremise);
    if (searchInArray(knowledgeBase, negatedPremise)) {
      addDeductionStep(
        deductionStepsArr,
        [...bracketedPremise, "&", ...bracketedNegatedPremise],
        "Conjunction",
        `${searchIndex(knowledgeBase, premise)}, ${searchIndex(
          knowledgeBase,
          negatedPremise
        )}`
      );
      knowledgeBase.push([
        ...bracketedPremise,
        "&",
        ...bracketedNegatedPremise,
      ]);
      return true;
    }

    if (checkKnowledgeBase(negatedPremise, knowledgeBase, deductionStepsArr)) {
      console.log(knowledgeBase);
      console.log(negatedPremise);
      console.log("the negated premise does existsss");
      addDeductionStep(
        deductionStepsArr,
        [...bracketedPremise, "&", ...bracketedNegatedPremise],
        "Conjunction",
        `${searchIndex(knowledgeBase, premise)}, ${searchIndex(
          knowledgeBase,
          negatedPremise
        )}`
      );
      knowledgeBase.push([
        ...bracketedPremise,
        "&",
        ...bracketedNegatedPremise,
      ]);
      return true;
    }
  }
  return false;
};

export default checkForContradiction;
