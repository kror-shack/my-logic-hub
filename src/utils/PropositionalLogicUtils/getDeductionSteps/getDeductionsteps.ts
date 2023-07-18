import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import { convertStringToArray } from "../../TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import checkDisjunctionSolvability from "../checkDisjunctionSolvability/checkDisjunctionSolvability";
import checkImplicationSolvability from "../checkImplicationSolvability/checkImplicationSolvability";
import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";
import checkWithConclusion from "../checkWithConclusion/checkWithConclusion";
import parsePropositionalInput from "../parsePropositionalInput/parsePropositionalInput";
import {
  changeFromPropertyToStartAtOne,
  checkFurtherSimplification,
  getOperator,
  searchInArray,
} from "../propositionalLogicHelperFunctions/propositionalLogicHelperFunction";
import simplifyAndOperation from "../simplifyAndOpertion/simplifyAndOperation";

const getDeductionSteps = (argument: string[], conclusion: string) => {
  let conclusionArr = parsePropositionalInput(conclusion);
  let knowledgeBase: string[][] = [];
  let simplifiableExpressions: string[][] = [];
  const deductionStepsArr: DeductionStep[] = [];

  // making the base arrays
  for (let i = 0; i < argument.length; i++) {
    const premise = argument[i];
    const premiseArr = parsePropositionalInput(premise);
    if (getOperator(premiseArr)) simplifiableExpressions.push(premiseArr);
    knowledgeBase.push(premiseArr);
  }

  let oldKnowledgeBaseLength = knowledgeBase.length;
  let oldSimplifiableExpLength = simplifiableExpressions.length;

  let newKnowledgeBaseLength = knowledgeBase.length;
  let newSimplifiableExpLength = simplifiableExpressions.length;
  let k = 0;
  do {
    let spliceFrom: undefined | number;
    k++;
    console.log(k);

    for (let i = 0; i < simplifiableExpressions.length; i++) {
      const premise = simplifiableExpressions[i];
      const operator = getOperator(premise);
      console.log("i: " + i);

      if (operator === "&") {
        const values = simplifyAndOperation(premise, knowledgeBase);
        knowledgeBase = values.knowledgeBase;
        deductionStepsArr.push(...values.deductionStepsArr);
      } else if (operator === "|") {
        const values = checkDisjunctionSolvability(premise, knowledgeBase);
        knowledgeBase = values.knowledgeBase;
        deductionStepsArr.push(...values.deductionStepsArr);
      } else if (operator === "->") {
        console.log("checking implication solvability");
        const values = checkImplicationSolvability(premise, knowledgeBase);
        knowledgeBase = values.knowledgeBase;
        deductionStepsArr.push(...values.deductionStepsArr);
        console.log("done checking the solvability");
      }
    }

    for (let k = 0; k < knowledgeBase.length; k++) {
      const premise = knowledgeBase[k];
      if (
        getOperator(premise) &&
        !searchInArray(simplifiableExpressions, premise)
      ) {
        simplifiableExpressions.push(premise);
      }
    }

    newKnowledgeBaseLength = knowledgeBase.length;
    newSimplifiableExpLength = simplifiableExpressions.length;

    if (spliceFrom) simplifiableExpressions.slice(spliceFrom, 1);

    if (
      oldKnowledgeBaseLength !== newKnowledgeBaseLength ||
      oldSimplifiableExpLength !== newSimplifiableExpLength
    ) {
      oldKnowledgeBaseLength = newKnowledgeBaseLength;
      oldSimplifiableExpLength = newSimplifiableExpLength;
      if (
        checkWithConclusion(knowledgeBase, conclusionArr, deductionStepsArr)
      ) {
        return changeFromPropertyToStartAtOne(deductionStepsArr);
      }
    } else {
      break;
    }
  } while (true);

  if (checkWithConclusion(knowledgeBase, conclusionArr, deductionStepsArr)) {
    return changeFromPropertyToStartAtOne(deductionStepsArr);
  }

  return false;
};

export default getDeductionSteps;
