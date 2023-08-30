import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
  strictSearchInArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkKnowledgeBase from "../../sharedFunctions/checkKnowledgeBase/checkKnowledgeBase";
import calculatePossiblePermutations, {
  calculateFrequency,
  generatePermutations,
} from "../calculatePossiblePermutations/calculatePossiblePermutations";
import {
  calculateTotalQuantifiers,
  getInstantiation,
} from "../inferDeductionStepsHelperFunctions/inferDeductionStepsHelperFunctions";

const checkWithQuantifiableConclusion = (
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[],
  conclusion: string[],
  usedSubstitutes: string[]
): boolean => {
  const totalQuantifiers = calculateTotalQuantifiers(conclusion);
  const permutations = generatePermutations(usedSubstitutes, totalQuantifiers);
  for (let i = 0; i < permutations.length; i++) {
    const combination = permutations[i];
    if (conclusion[0].includes("\u2203")) {
      const instantiatedConc = getInstantiation(conclusion, combination[i]);
      const nestedQuantifiers = calculateTotalQuantifiers(instantiatedConc);
      if (nestedQuantifiers) {
        const operator = getOperator(instantiatedConc);
        if (!operator) break;
        const [before, after] = splitArray(instantiatedConc, operator);
        if (
          checkWithQuantifiableConclusion(
            knowledgeBase,
            deductionStepsArr,
            before,
            usedSubstitutes
          ) &&
          checkWithQuantifiableConclusion(
            knowledgeBase,
            deductionStepsArr,
            after,
            usedSubstitutes
          )
        ) {
          console.log(knowledgeBase);
          const rule =
            operator === "&"
              ? "Conjunction"
              : operator === "|"
              ? "Disjunction"
              : "";
          addDeductionStep(
            deductionStepsArr,
            instantiatedConc,
            rule,
            `${searchIndex(knowledgeBase, before)}, ${searchIndex(
              knowledgeBase,
              after
            )}`
          );
          addDeductionStep(
            deductionStepsArr,
            conclusion,
            "Existential Generalization",
            `${searchIndex(knowledgeBase, instantiatedConc)}`
          );
          return true;
        }
      }

      if (
        checkKnowledgeBase(instantiatedConc, knowledgeBase, deductionStepsArr)
      ) {
        console.log(knowledgeBase);
        addDeductionStep(
          deductionStepsArr,
          conclusion,
          "Existential Generalization",
          `${searchIndex(knowledgeBase, instantiatedConc)}`
        );
        return true;
      }
    }

    if (conclusion[0].includes("\u2200")) {
      /**
       * Cannot use UG on a constant that was obtained after EI
       */

      // if (existentialSubstitutes.includes(combination[i])) continue;
      const instantiatedConc = getInstantiation(conclusion, combination[i]);
      if (
        checkKnowledgeBase(
          instantiatedConc,
          knowledgeBase,
          deductionStepsArr
        ) &&
        !searchInArray(knowledgeBase, conclusion)
      ) {
        if (strictSearchInArray(knowledgeBase, instantiatedConc)) {
          //this conditional exists in lieu of the restriction on UG
          // previously mentioned

          addDeductionStep(
            deductionStepsArr,
            conclusion,
            "Universal Generalization",
            `${searchIndex(knowledgeBase, instantiatedConc)}`
          );
          knowledgeBase.push(conclusion);
          return true;
        }
      }
    } else if (
      checkKnowledgeBase(conclusion, knowledgeBase, deductionStepsArr)
    ) {
      return true;
    }
  }
  return false;
};

export default checkWithQuantifiableConclusion;
