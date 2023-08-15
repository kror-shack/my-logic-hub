import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  addToSimplifiableExpressions,
  changeFromPropertyToStartAtOne,
  convertImplicationToDisjunction,
  getOperator,
  searchInArray,
  searchIndex,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../HelperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";
import getNegation from "../../sharedFunctions/getNegation/getNegation";
import checkForContradiction from "../checkForContradiction/checkForContradiction";

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
  knowledgeBase.push(negatedConclusion);

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
        return changeFromPropertyToStartAtOne(deductionStepsArr);
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
    return changeFromPropertyToStartAtOne(deductionStepsArr);
  }

  return false;
};

export default getContradictionSteps;
