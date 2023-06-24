import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import { convertStringToArray } from "../../TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import checkDisjunctionSolvability from "../checkDisjunctionSolvability/checkDisjunctionSolvability";
import checkImplicationSolvability from "../checkImplicationSolvability/checkImplicationSolvability";
import checkWithConclusion from "../checkWithConclusion/checkWithConclusion";
import {
  checkFurtherSimplification,
  getOperator,
  searchInArray,
} from "../propositionalLogicHelperFunctions/propositionalLogicHelperFunction";
import simplifyAndOperation from "../simplifyAndOpertion/simplifyAndOperation";

const getDeductionSteps = (argument: string[], conclusion: string) => {
  let conclusionArr = convertStringToArray(conclusion);
  let knowledgeBase: string[][] = [];
  let simplifiableExpressions: string[][] = [];
  const deductionStepsArr: DeductionStep[] = [];

  // making the base arrays
  for (let i = 0; i < argument.length; i++) {
    const premise = argument[i];
    const premiseArr = convertStringToArray(premise);
    if (getOperator(premiseArr)) simplifiableExpressions.push(premiseArr);
    knowledgeBase.push(premiseArr);
  }

  let oldKnowledgeBaseLength = knowledgeBase.length;
  let newKnowledgeBaseLength = knowledgeBase.length;

  do {
    let spliceFrom: undefined | number;

    for (let i = 0; i < simplifiableExpressions.length; i++) {
      const premise = simplifiableExpressions[i];
      const operator = getOperator(premise);

      if (operator === "&") {
        const values = simplifyAndOperation(premise, knowledgeBase);
        knowledgeBase = values.knowledgeBase;
        deductionStepsArr.push(...values.deductionStepsArr);
      } else if (operator === "|") {
        const values = checkDisjunctionSolvability(premise, knowledgeBase);
        knowledgeBase = values.knowledgeBase;
        deductionStepsArr.push(...values.deductionStepsArr);
      } else if (operator === "->") {
        const values = checkImplicationSolvability(premise, knowledgeBase);
        knowledgeBase = values.knowledgeBase;
        deductionStepsArr.push(...values.deductionStepsArr);
      }
      const simplifiableElements = checkFurtherSimplification(
        knowledgeBase,
        premise,
        simplifiableExpressions
      );
      console.log(2);
      if (!simplifiableElements) {
        spliceFrom = i;
      } else {
        simplifiableExpressions.push(simplifiableElements);
      }
    }

    newKnowledgeBaseLength = knowledgeBase.length;

    if (spliceFrom) simplifiableExpressions.slice(spliceFrom, 1);

    if (oldKnowledgeBaseLength !== newKnowledgeBaseLength) {
      oldKnowledgeBaseLength = newKnowledgeBaseLength;
      if (searchInArray(knowledgeBase, conclusionArr)) {
        return deductionStepsArr;
      }
    } else {
      break;
    }
  } while (true);

  const steps = checkWithConclusion(knowledgeBase, conclusionArr);
  if (steps) {
    deductionStepsArr.push(...steps);
    return deductionStepsArr;
  }
  return false;
};

export default getDeductionSteps;
