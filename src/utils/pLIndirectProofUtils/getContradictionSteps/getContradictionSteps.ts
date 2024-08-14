import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  addToSimplifiableExpressions,
  changeFromPropertyToStartAtOne,
  convertImplicationToDisjunction,
  getOperator,
  searchInArray,
  searchIndex,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../helperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";
import getNegation from "../../sharedFunctions/getNegation/getNegation";
import checkForContradiction from "../checkForContradiction/checkForContradiction";

/**
 * Get steps for natural deduction styled indirect proof
 *
 * This function uses a combination of forward and backward chaining to make inferences
 * based on the given premises, and the negation of the conclusion to deduce steps until a contradiction is reached(if possible)
 *
 * @param argument - A string array representing the premises for inference.
 * @param conclusion -A string representing the conclusion to be inferred.
 * @returns - The steps to reach a contradiction or false if no contradiction can be reached.
 */
const getContradictionSteps = (argument: string[], conclusion: string) => {
  let conclusionArr = parseSymbolicLogicInput(conclusion);
  let negatedConclusion = getNegation(conclusionArr);

  let knowledgeBase: string[][] = [];
  let simplifiableExpressions: string[][] = [];
  const deductionStepsArr: DeductionStep[] = [];

  addDeductionStep(
    deductionStepsArr,
    negatedConclusion,
    "Assuming the contradiction",
    `conc`
  );

  for (let i = 0; i < argument.length; i++) {
    const premise = argument[i];
    const premiseArr = parseSymbolicLogicInput(premise);
    if (getOperator(premiseArr)) {
      simplifiableExpressions.push(premiseArr);
    }
    knowledgeBase.push(premiseArr);
  }
  knowledgeBase.push(negatedConclusion); //push negated conc after the knowledgebase has the premises
  let oldKnowledgeBaseLength = knowledgeBase.length;
  let oldSimplifiableExpLength = simplifiableExpressions.length;

  let newKnowledgeBaseLength = knowledgeBase.length;
  let newSimplifiableExpLength = simplifiableExpressions.length;
  do {
    expandKnowledgeBase(
      simplifiableExpressions,
      knowledgeBase,
      deductionStepsArr
    );

    addToSimplifiableExpressions(knowledgeBase, simplifiableExpressions);
    newKnowledgeBaseLength = knowledgeBase.length;
    newSimplifiableExpLength = simplifiableExpressions.length;

    if (
      oldKnowledgeBaseLength !== newKnowledgeBaseLength ||
      oldSimplifiableExpLength !== newSimplifiableExpLength
    ) {
      oldKnowledgeBaseLength = newKnowledgeBaseLength;
      oldSimplifiableExpLength = newSimplifiableExpLength;
      if (checkForContradiction(knowledgeBase, deductionStepsArr)) {
        addDeductionStep(
          deductionStepsArr,
          knowledgeBase[knowledgeBase.length - 1],
          "-R Contradiction",
          `${searchIndex(
            knowledgeBase,
            knowledgeBase[knowledgeBase.length - 1]
          )}`
        );
        const modifiedDeductionStepsArr =
          changeFromPropertyToStartAtOne(deductionStepsArr);

        return modifiedDeductionStepsArr;
      }
    } else {
      break;
    }
  } while (true);

  if (checkForContradiction(knowledgeBase, deductionStepsArr)) {
    addDeductionStep(
      deductionStepsArr,
      knowledgeBase[knowledgeBase.length - 1],
      "-R Contradiction",
      `${searchIndex(knowledgeBase, knowledgeBase[knowledgeBase.length - 1])}`
    );
    const modifiedDeductionStepsArr =
      changeFromPropertyToStartAtOne(deductionStepsArr);

    return modifiedDeductionStepsArr;
  }

  return false;
};

export default getContradictionSteps;
