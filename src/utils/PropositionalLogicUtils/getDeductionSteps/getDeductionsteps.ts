import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  changeFromPropertyToStartAtOne,
  checkFurtherSimplification,
  getOperator,
  searchInArray,
  searchIndex,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../HelperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import checkDisjunctionSolvability from "../../sharedFunctions/checkDisjunctionSolvability/checkDisjunctionSolvability";
import checkImplicationSolvability from "../../sharedFunctions/checkImplicationSolvability/checkImplicationSolvability";
import checkWithConclusion from "../../sharedFunctions/checkWithConclusion/checkWithConclusion";
import getDeMorganTransform from "../../sharedFunctions/getDeMorganTransform/getDeMorganTransform";
import simplifyAndOperation from "../../sharedFunctions/simplifyAndOperation/simplifyAndOperation";
import simplifyBiConditional from "../../sharedFunctions/simplifyBiConditional/simplifyBiConditional";
const getDeductionSteps = (argument: string[], conclusion: string) => {
  console.log("this is the conclusion");
  let conclusionArr = parseSymbolicLogicInput(conclusion);
  console.log("this is the conclusion array" + conclusionArr);
  let knowledgeBase: string[][] = [];
  let simplifiableExpressions: string[][] = [];
  const deductionStepsArr: DeductionStep[] = [];

  console.log(argument);
  // making the base arrays
  for (let i = 0; i < argument.length; i++) {
    console.log("inside the for loop");
    const premise = argument[i];
    const premiseArr = parseSymbolicLogicInput(premise);
    if (getOperator(premiseArr)) {
      console.log("pushgin to simplifiable expresssions");
      simplifiableExpressions.push(premiseArr);
    }
    console.log(premise);
    console.log(getOperator(premiseArr));
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
    if (k > 50) return;

    for (let i = 0; i < simplifiableExpressions.length; i++) {
      const premise = simplifiableExpressions[i];
      const operator = getOperator(premise);

      if (operator === "&") {
        const values = simplifyAndOperation(premise, knowledgeBase);
        console.log(values.knowledgeBase);
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
      } else if (operator === "~") {
        const deMorganized = getDeMorganTransform(premise);
        if (searchInArray(knowledgeBase, deMorganized)) continue;
        knowledgeBase.push(deMorganized);
        addDeductionStep(
          deductionStepsArr,
          deMorganized,
          "DeMorgan Theorem",
          i
        );
      } else if (operator === "<->") {
        const values = simplifyBiConditional(premise, knowledgeBase);
        console.log(values.knowledgeBase);
        knowledgeBase = values.knowledgeBase;
        deductionStepsArr.push(...values.deductionStepsArr);
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

    console.log(`knowledgebaswe; ${knowledgeBase}`);
    console.log(conclusionArr);
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
