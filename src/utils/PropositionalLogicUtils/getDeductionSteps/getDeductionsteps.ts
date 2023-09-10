import { DeductionStep } from "../../../types/sharedTypes";
import {
  addToSimplifiableExpressions,
  changeFromPropertyToStartAtOne,
  getOperator,
  searchInArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../HelperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import checkForContradictionExploitaion from "../../sharedFunctions/checkForContradictionExploitation/checkForContradictionExploitation";
import checkWithConclusion from "../../sharedFunctions/checkWithConclusion/checkWithConclusion";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";

/**
 * Get steps for Fitch style direct proof
 *
 * This function uses a combination of forward and backward chaining to make inferences
 * based on the given premises to reach the desired conclsuion(if possible)
 *
 * @param argument - A string array representing the premises for inference.
 * @param conclusion -A string representing the conclusion to be inferred.
 * @returns - The steps to reach the conclusion or false if no conclusion can be reached.
 */
const getDeductionSteps = (
  argument: string[],
  conclusion: string
): DeductionStep[] | false => {
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
      if (
        checkWithConclusion(knowledgeBase, conclusionArr, deductionStepsArr)
      ) {
        return changeFromPropertyToStartAtOne(deductionStepsArr);
      } else if (
        checkForContradictionExploitaion(
          conclusionArr,
          knowledgeBase,
          deductionStepsArr
        )
      ) {
        return changeFromPropertyToStartAtOne(deductionStepsArr);
      }
    } else {
      break;
    }
  } while (true);

  if (checkWithConclusion(knowledgeBase, conclusionArr, deductionStepsArr)) {
    return changeFromPropertyToStartAtOne(deductionStepsArr);
  } else if (
    checkForContradictionExploitaion(
      conclusionArr,
      knowledgeBase,
      deductionStepsArr
    )
  ) {
    return changeFromPropertyToStartAtOne(deductionStepsArr);
  }

  return false;
};

export default getDeductionSteps;
