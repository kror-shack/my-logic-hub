import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  addToSimplifiableExpressions,
  changeFromPropertyToStartAtOne,
  getKbFromDS,
  getOperator,
  removePremiseSteps,
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

  let simplifiableExpressions: string[][] = [];
  let deductionStepsArr: DeductionStep[] = [];

  // making the base arrays
  for (let i = 0; i < argument.length; i++) {
    const premise = argument[i];
    const premiseArr = parseSymbolicLogicInput(premise);
    if (getOperator(premiseArr)) {
      simplifiableExpressions.push(premiseArr);
    }
    addDeductionStep(deductionStepsArr, premiseArr, "premise", 0);
  }

  let oldDeductionStepsLength = deductionStepsArr.length;
  let oldSimplifiableExpLength = simplifiableExpressions.length;

  // a do-while loop since it must run atleast once and further iterations
  // depend on whether the kb expanded or not
  do {
    const expandedSteps = expandKnowledgeBase(
      simplifiableExpressions,
      deductionStepsArr
    );
    if (expandedSteps) deductionStepsArr = expandedSteps;
    const knowledgeBase = getKbFromDS(deductionStepsArr);
    addToSimplifiableExpressions(knowledgeBase, simplifiableExpressions);

    if (
      oldDeductionStepsLength !== deductionStepsArr.length ||
      oldSimplifiableExpLength !== simplifiableExpressions.length
    ) {
      oldDeductionStepsLength = deductionStepsArr.length;
      oldSimplifiableExpLength = simplifiableExpressions.length;
      const deductionSteps = checkIfConcCanBeDerived(
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

  return checkIfConcCanBeDerived(conclusionArr, deductionStepsArr);
};

export default getDeductionSteps;

/**
 * Checks if the conclusion can be reached via either direct
 * derivation or indirect.
 */
const checkIfConcCanBeDerived = (
  conclusionArr: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  const concDeductionsStepsArr = checkWithConclusion(
    conclusionArr,
    deductionStepsArr
  );
  if (concDeductionsStepsArr) {
    const modifiedDeductionSteps = changeFromPropertyToStartAtOne(
      removePremiseSteps(concDeductionsStepsArr)
    );
    return modifiedDeductionSteps;
  }
  const contradictionDeductionSteps = checkForContradictionExploitaion(
    conclusionArr,
    deductionStepsArr
  );
  if (contradictionDeductionSteps) {
    const modifiedDeductionSteps = changeFromPropertyToStartAtOne(
      removePremiseSteps(contradictionDeductionSteps)
    );

    return modifiedDeductionSteps;
  }
  return false;
};
