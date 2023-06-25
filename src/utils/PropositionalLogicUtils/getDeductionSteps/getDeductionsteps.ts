import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import { convertStringToArray } from "../../TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import checkDisjunctionSolvability from "../checkDisjunctionSolvability/checkDisjunctionSolvability";
import checkImplicationSolvability from "../checkImplicationSolvability/checkImplicationSolvability";
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
    console.log("argumnet " + premiseArr);
    if (getOperator(premiseArr)) simplifiableExpressions.push(premiseArr);
    knowledgeBase.push(premiseArr);
  }

  console.log(getOperator(["p", "->", "~q"]));
  let oldKnowledgeBaseLength = knowledgeBase.length;

  console.log("simplifiable expressions: " + simplifiableExpressions);
  let newKnowledgeBaseLength = knowledgeBase.length;

  do {
    let spliceFrom: undefined | number;

    for (let i = 0; i < simplifiableExpressions.length; i++) {
      const premise = simplifiableExpressions[i];
      console.log("premise " + premise);
      const operator = getOperator(premise);
      console.log("operator: " + operator);

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
        return changeFromPropertyToStartAtOne(deductionStepsArr);
      }
    } else {
      break;
    }
  } while (true);

  const steps = checkWithConclusion(knowledgeBase, conclusionArr);
  if (steps) {
    deductionStepsArr.push(...steps);
    return changeFromPropertyToStartAtOne(deductionStepsArr);
  }
  return false;
};

export default getDeductionSteps;
