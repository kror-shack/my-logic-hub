import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  changeFromPropertyToStartAtOne,
  checkFurtherSimplification,
  convertImplicationToDisjunction,
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
  console.log("in the get deduction steps");
  let conclusionArr = parseSymbolicLogicInput(conclusion);
  let knowledgeBase: string[][] = [];
  let simplifiableExpressions: string[][] = [];
  const deductionStepsArr: DeductionStep[] = [];

  // making the base arrays
  for (let i = 0; i < argument.length; i++) {
    const premise = argument[i];
    const premiseArr = parseSymbolicLogicInput(premise);
    if (getOperator(premiseArr)) {
      simplifiableExpressions.push(premiseArr);
    }
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
    if (k > 50) return;

    for (let i = 0; i < simplifiableExpressions.length; i++) {
      const premise = simplifiableExpressions[i];
      console.log("running the do function");
      console.log(premise);
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
      } else if (operator === "~") {
        const secondaryOperator = getOperator(premise.slice(1));
        let impToDisj: string[] = [];
        if (secondaryOperator === "->") {
          impToDisj = convertImplicationToDisjunction(premise.slice(1));
          impToDisj = ["~", "(", ...impToDisj, ")"];
          if (searchInArray(knowledgeBase, impToDisj)) continue;
          addDeductionStep(
            deductionStepsArr,
            impToDisj,
            "Material Implication",
            `${searchIndex(knowledgeBase, premise)}`
          );
          knowledgeBase.push(impToDisj);
        }
        console.log(premise);

        const deMorganized =
          impToDisj.length > 1
            ? getDeMorganTransform(impToDisj)
            : getDeMorganTransform(premise);
        console.log("this be the demorganized" + deMorganized);
        console.log(knowledgeBase);
        if (searchInArray(knowledgeBase, deMorganized)) continue;
        console.log("pushing demorganized:  " + deMorganized);
        knowledgeBase.push(deMorganized);
        addDeductionStep(
          deductionStepsArr,
          deMorganized,
          "DeMorgan Theorem",
          `${impToDisj.length > 1 ? searchIndex(knowledgeBase, impToDisj) : i}`
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

    if (
      oldKnowledgeBaseLength !== newKnowledgeBaseLength ||
      oldSimplifiableExpLength !== newSimplifiableExpLength
    ) {
      oldKnowledgeBaseLength = newKnowledgeBaseLength;
      oldSimplifiableExpLength = newSimplifiableExpLength;
      if (
        checkWithConclusion(knowledgeBase, conclusionArr, deductionStepsArr)
      ) {
        console.log(deductionStepsArr);
        console.log(changeFromPropertyToStartAtOne(deductionStepsArr));

        return changeFromPropertyToStartAtOne(deductionStepsArr);
      }
    } else {
      break;
    }
  } while (true);

  if (checkWithConclusion(knowledgeBase, conclusionArr, deductionStepsArr)) {
    console.log(changeFromPropertyToStartAtOne(deductionStepsArr));
    return changeFromPropertyToStartAtOne(deductionStepsArr);
  }

  return false;
};

export default getDeductionSteps;
