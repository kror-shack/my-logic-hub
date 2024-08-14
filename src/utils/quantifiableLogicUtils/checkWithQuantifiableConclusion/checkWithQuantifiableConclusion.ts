import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  convertImplicationToDisjunction,
  getOperator,
  searchInArray,
  splitArray,
  strictSearchInArray,
  getSearchIndexInDS,
  searchInDS,
  getKbFromDS,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkKnowledgeBase from "../../sharedFunctions/checkKnowledgeBase/checkKnowledgeBase";
import getNegation from "../../sharedFunctions/getNegation/getNegation";
import calculatePossiblePermutations, {
  calculateFrequency,
  generatePermutations,
} from "../calculatePossiblePermutations/calculatePossiblePermutations";
import {
  calculateTotalQuantifiers,
  getInstantiation,
} from "../inferDeductionStepsHelperFunctions/inferDeductionStepsHelperFunctions";
import {
  handleQuantificationalAndOperatorCase,
  handleQuantificationalBiCondOperatorCase,
  handleQuantificationalImplicationOperatorCase,
  handleQuantificationalOrOperatorCase,
} from "./caseHelper.ts/caseHelpers";

/**
 * Check if a conclusion can be deduced from the knowledge base.
 *
 * This function checks if a given conclusion can be deduced from the provided knowledge base.
 *
 * @param deductionStepsArr - An array of all the deductions steps.
 * @param conclusion - The conclusion to be checked.
 * @param usedSubstitutes -  An array  containing all the skolem constants that were used.
 * @returns - An updated deductions steps array if the conc can be derived otherwise false
 */
const checkWithQuantifiableConclusion = (
  deductionStepsArr: DeductionStep[],
  conclusion: string[],
  usedSubstitutes: string[]
): DeductionStep[] | false => {
  const totalQuantifiers = calculateTotalQuantifiers(conclusion);
  const permutations = generatePermutations(
    [...usedSubstitutes],
    totalQuantifiers + 1
  ); // the addition of 1 lets the function run with an unused substitute as temporary fix to the issue of restriction on UG

  for (let i = 0; i < permutations.length; i++) {
    const combination = permutations[i];
    if (!combination) return false;

    if (conclusion[0].includes("\u2203")) {
      if (conclusion.join("").includes(combination[i])) {
        continue;
      }

      const instantiatedConc = getInstantiation(conclusion, combination[i]);
      const nestedQuantifiers = calculateTotalQuantifiers(instantiatedConc);
      if (nestedQuantifiers) {
        const operator = getOperator(instantiatedConc);
        if (operator) {
          if (operator === "&") {
            const deductionSteps = handleQuantificationalAndOperatorCase(
              deductionStepsArr,
              instantiatedConc,
              conclusion,
              usedSubstitutes
            );
            if (deductionSteps) return deductionSteps;
          } else if (operator === "|") {
            const deductionSteps = handleQuantificationalOrOperatorCase(
              deductionStepsArr,
              instantiatedConc,
              conclusion,
              usedSubstitutes
            );
            if (deductionSteps) return deductionSteps;
          } else if (operator === "->") {
            const deductionSteps =
              handleQuantificationalImplicationOperatorCase(
                deductionStepsArr,
                instantiatedConc,
                conclusion,
                usedSubstitutes
              );
            if (deductionSteps) return deductionSteps;
          } else if (operator === "<->") {
            const deductionSteps = handleQuantificationalBiCondOperatorCase(
              deductionStepsArr,
              instantiatedConc,
              conclusion,
              usedSubstitutes
            );
            if (deductionSteps) return deductionSteps;
          }
          return false;
        }
      }
      const instantiatedConcDS = checkKnowledgeBase(
        instantiatedConc,
        deductionStepsArr
      );
      if (instantiatedConcDS) {
        addDeductionStep(
          instantiatedConcDS,
          conclusion,
          "Existential Generalization",
          `${getSearchIndexInDS(instantiatedConcDS, instantiatedConc)}`
        );
        return instantiatedConcDS;
      }
    }

    if (conclusion[0].includes("\u2200")) {
      /**
       * Cannot use UG on a constant that was obtained after EI
       */

      // if (existentialSubstitutes.includes(combination[i])) continue;

      const instantiatedConc = getInstantiation(conclusion, combination[i]);

      if (conclusion.join("").includes(combination[i])) {
        continue;
      }
      const instantiatedConcDS = checkKnowledgeBase(
        instantiatedConc,
        deductionStepsArr
      );

      if (instantiatedConcDS && !searchInDS(instantiatedConcDS, conclusion)) {
        const knowledgeBase = getKbFromDS(instantiatedConcDS);

        if (strictSearchInArray(knowledgeBase, instantiatedConc)) {
          //this conditional exists in lieu of the restriction on UG
          // previously mentioned

          addDeductionStep(
            instantiatedConcDS,
            conclusion,
            "Universal Generalization",
            `${getSearchIndexInDS(instantiatedConcDS, instantiatedConc)}`
          );
          return instantiatedConcDS;
        }
      }
    } else {
      const deductionSteps = checkKnowledgeBase(conclusion, deductionStepsArr);
      return deductionSteps;
    }
  }
  return false;
};

export default checkWithQuantifiableConclusion;
