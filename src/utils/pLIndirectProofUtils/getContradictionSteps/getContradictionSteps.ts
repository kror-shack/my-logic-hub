import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  addToSimplifiableExpressions,
  changeFromPropertyToStartAtOne,
  convertImplicationToDisjunction,
  getKbFromDS,
  getOperator,
  getSearchIndexInDS,
  removePremiseSteps,
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

  let simplifiableExpressions: string[][] = [];
  let deductionStepsArr: DeductionStep[] = [];

  for (let i = 0; i < argument.length; i++) {
    const premise = argument[i];
    const premiseArr = parseSymbolicLogicInput(premise);
    if (getOperator(premiseArr)) {
      simplifiableExpressions.push(premiseArr);
    }
    addDeductionStep(deductionStepsArr, premiseArr, "premise", 0);
  }
  addDeductionStep(
    deductionStepsArr,
    negatedConclusion,
    "Assuming the contradiction",
    `conc`
  ); //push negated conc after the knowledgebase has the premises

  let oldDeductionStepsArrLength = deductionStepsArr.length;
  let oldSimplifiableExpLength = simplifiableExpressions.length;

  do {
    const expandedDS = expandKnowledgeBase(
      simplifiableExpressions,
      deductionStepsArr
    );
    if (expandedDS) deductionStepsArr = expandedDS;

    const knowledgeBase = getKbFromDS(deductionStepsArr);
    addToSimplifiableExpressions(knowledgeBase, simplifiableExpressions);

    if (
      oldDeductionStepsArrLength !== deductionStepsArr.length ||
      oldSimplifiableExpLength !== simplifiableExpressions.length
    ) {
      oldDeductionStepsArrLength = deductionStepsArr.length;
      oldSimplifiableExpLength = simplifiableExpressions.length;

      const contradictionSteps = checkIfConcCanBeDerived(deductionStepsArr);
      if (contradictionSteps) return contradictionSteps;
    } else {
      break;
    }
  } while (true);

  return checkIfConcCanBeDerived(deductionStepsArr);
};

export default getContradictionSteps;

const checkIfConcCanBeDerived = (deductionStepsArr: DeductionStep[]) => {
  const contradictionSteps = checkForContradiction(deductionStepsArr);
  if (contradictionSteps) {
    const lastStep = contradictionSteps[contradictionSteps.length - 1].obtained;
    addDeductionStep(
      contradictionSteps,
      lastStep,
      "-R Contradiction",
      `${getSearchIndexInDS(contradictionSteps, lastStep)}`
    );
    const modifiedDeductionStepsArr = changeFromPropertyToStartAtOne(
      removePremiseSteps(contradictionSteps)
    );
    return modifiedDeductionStepsArr;
  }
  return false;
};
