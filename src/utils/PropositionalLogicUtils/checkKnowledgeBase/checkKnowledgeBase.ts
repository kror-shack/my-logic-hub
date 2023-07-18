import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import checkForHypotheticalSyllogism from "../checkForHypotheticalSyllogism/checkForHypotheticalSyllogism";
import getNegation from "../getNegation/getNegation";
import {
  addDeductionStep,
  convertImplicationToDisjunction,
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
} from "../propositionalLogicHelperFunctions/propositionalLogicHelperFunction";

// recursive function to check different
// combinations within the knowledge base
const checkKnowledgeBase = (
  premise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
): boolean => {
  const operator = getOperator(premise);

  if (searchInArray(knowledgeBase, premise)) {
    return true;
  }

  // if the proposition is not simplifiable
  if (!operator) {
    const return11 = searchInArray(knowledgeBase, premise) ? true : false;

    return return11;
  } else {
    const [before, after] = splitArray(premise, operator);

    if (operator === "~") {
      if (searchInArray(knowledgeBase, premise)) {
        return true;
      }

      const negatedPremise = getNegation(premise);
      if (
        checkKnowledgeBase(negatedPremise, knowledgeBase, deductionStepsArr)
      ) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "DeMorgan",
          `${searchIndex(knowledgeBase, negatedPremise)}`
        );
        knowledgeBase.push(premise);
        return true;
      }
    }

    if (operator === "|") {
      const existingElement = searchInArray(knowledgeBase, before)
        ? before
        : searchInArray(knowledgeBase, after)
        ? after
        : false;
      if (existingElement && !searchInArray(knowledgeBase, premise)) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "Addition",
          `${searchIndex(knowledgeBase, existingElement)}`
        );
        knowledgeBase.push(premise);
        return true;
      } else {
        const simplifiableElement = getOperator(before)
          ? getOperator(after)
            ? [before, after]
            : [before]
          : getOperator(after)
          ? [after]
          : undefined;
        if (simplifiableElement) {
          for (let i = 0; i < simplifiableElement?.length; i++) {
            if (
              checkKnowledgeBase(
                simplifiableElement[i],
                knowledgeBase,
                deductionStepsArr
              ) &&
              !searchInArray(knowledgeBase, premise)
            ) {
              addDeductionStep(
                deductionStepsArr,
                premise,
                "Addition",
                `${searchIndex(knowledgeBase, simplifiableElement[i])}`
              );
              knowledgeBase.push(premise);
              return true;
            }
          }
        }
      }
    } else if (operator === "&") {
      const existingBefore = searchInArray(knowledgeBase, before);
      const exisitngAfter = searchInArray(knowledgeBase, after);
      if (
        existingBefore &&
        exisitngAfter &&
        !searchInArray(knowledgeBase, premise)
      ) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "Conjunction",
          `${searchIndex(knowledgeBase, before)},${searchIndex(
            knowledgeBase,
            after
          )}`
        );
        knowledgeBase.push(premise);
        return true;
      } else {
        const simplifiableElements = getOperator(before)
          ? getOperator(after)
            ? [before, after]
            : [before]
          : getOperator(after)
          ? [after]
          : undefined;
        if (simplifiableElements) {
          return (
            checkKnowledgeBase(before, knowledgeBase, deductionStepsArr) &&
            checkKnowledgeBase(after, knowledgeBase, deductionStepsArr) &&
            checkKnowledgeBase(premise, knowledgeBase, deductionStepsArr)
          );
        }
      }
    } else if (operator === "->") {
      const impToDisj = convertImplicationToDisjunction(premise);

      if (checkKnowledgeBase(impToDisj, knowledgeBase, deductionStepsArr)) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "Material Implication",
          `${searchIndex(knowledgeBase, impToDisj)}`
        );
        knowledgeBase.push(premise);
        return true;
      } else if (
        checkForHypotheticalSyllogism(premise, knowledgeBase, deductionStepsArr)
      ) {
        return true;
      }
    }
  }
  return false;
};

export default checkKnowledgeBase;
