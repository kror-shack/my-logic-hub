import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  getOperator,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";

const createKnowledgeBase = (premiseArr: string[][]) => {
  const knowledgeBase: string[][] = [...premiseArr];
  const deductionSteps: DeductionStep[] = [];
  const simplifiableExpressions: string[][] = [];
  let addedExpressions = 0;

  do {
    for (let i = 0; i < knowledgeBase.length; i++) {
      let premise = knowledgeBase[i];
      let operator = getOperator(premise);

      if (premise.length === 1) {
        continue;
      } else if (operator) {
        switch (operator) {
          case "&":
            const [firstElement, secondElement] = splitArray(premise, "&");
            if (!knowledgeBase.includes(firstElement)) {
              knowledgeBase.push(firstElement);

              addDeductionStep(deductionSteps, firstElement, "Conjunction", i);
              addedExpressions++;
            }
            if (!knowledgeBase.includes(secondElement)) {
              knowledgeBase.push(secondElement);
              addDeductionStep(deductionSteps, secondElement, "Conjunction", i);

              addedExpressions++;
            }
            addedExpressions = 0;

            break;

          case "|":
          case "->":
            if (!simplifiableExpressions.includes(premise)) {
              simplifiableExpressions.push(premise);
              addedExpressions++;
            }
            addedExpressions = 0;

            break;
          default:
            addedExpressions = 0;
        }
      }
    }
  } while (addedExpressions !== 0);

  return { knowledgeBase, deductionSteps, simplifiableExpressions };
};

export default createKnowledgeBase;
