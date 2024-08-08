import { DeductionStep } from "../../../types/sharedTypes";
import {
  addToSimplifiableExpressions,
  changeFromPropertyToStartAtOne,
  getOperator,
  searchInArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../helperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import checkForContradictionExploitaion from "../../sharedFunctions/checkForContradictionExploitation/checkForContradictionExploitation";
import checkWithConclusion from "../../sharedFunctions/checkWithConclusion/checkWithConclusion";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";

/**
 * Get steps for natural direct proof
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

  // a do-while loop since it must run atleast once and further iterations
  // depend on whether the kb expanded or not
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
      const deductionSteps = checkIfConcCanBeDerived(
        knowledgeBase,
        conclusionArr,
        deductionStepsArr
      );
      if (deductionSteps) return deductionSteps;
    } else {
      // breaks out of the loop if no new element is added to the knowledge base that can
      // be simplified to reach the deductions steps
      break;
    }
  } while (true);

  return checkIfConcCanBeDerived(
    knowledgeBase,
    conclusionArr,
    deductionStepsArr
  );
};

export default getDeductionSteps;

/**
 * Checks if the conclusion can be reached via either direct
 * derivation or indirect.
 */
const checkIfConcCanBeDerived = (
  knowledgeBase: string[][],
  conclusionArr: string[],
  deductionStepsArr: DeductionStep[]
) => {
  if (checkWithConclusion(knowledgeBase, conclusionArr, deductionStepsArr)) {
    const modifiedDeductionSteps =
      changeFromPropertyToStartAtOne(deductionStepsArr);
    return modifiedDeductionSteps;
  } else if (
    checkForContradictionExploitaion(
      conclusionArr,
      knowledgeBase,
      deductionStepsArr
    )
  ) {
    const modifiedDeductionSteps =
      changeFromPropertyToStartAtOne(deductionStepsArr);

    return modifiedDeductionSteps;
  }
  return false;
};
