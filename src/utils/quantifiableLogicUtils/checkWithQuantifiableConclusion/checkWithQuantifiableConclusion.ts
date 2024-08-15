import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  getOperator,
  strictSearchInArray,
  getSearchIndexInDS,
  searchInDS,
  getKbFromDS,
  convertImplicationToDisjunction,
  isPremiseInQuantifierEnclosure,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { isWffQuantified } from "../../pLTreeUtils/pLTHelperFunctions/pLTHelperFunctions";
import checkForCommutativity from "../../sharedFunctions/checkForCommutativity/checkForCommutativity";
import checkKnowledgeBase from "../../sharedFunctions/checkKnowledgeBase/checkKnowledgeBase";
import { generatePermutations } from "../calculatePossiblePermutations/calculatePossiblePermutations";
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
  conclusion: string[],
  deductionStepsArr: DeductionStep[],

  usedSubstitutes: string[],
  derivedRules: DerivedRules
): DeductionStep[] | false => {
  const basicDeductionSteps = checkKnowledgeBase(
    conclusion,
    deductionStepsArr,
    derivedRules
  );
  if (basicDeductionSteps) return basicDeductionSteps;

  const totalQuantifiers = calculateTotalQuantifiers(conclusion);
  const permutations = generatePermutations(
    [...usedSubstitutes],
    totalQuantifiers + 1
  ); // the addition of 1 lets the function run with an unused substitute as temporary fix to the issue of restriction on UG

  // run for all permutations
  for (let i = 0; i < permutations.length; i++) {
    const combination = permutations[i];

    if (!combination) return false;
    // run for all combinations of each permuation
    for (let j = 0; j < combination.length; j++) {
      const partCombination = `_${combination[j]}`;

      if (conclusion[0].includes("\u2203")) {
        const instantiatedConc = getInstantiation(conclusion, partCombination);
        const nestedQuantifiers = calculateTotalQuantifiers(instantiatedConc);
        if (nestedQuantifiers) {
          const operator = getOperator(instantiatedConc);
          if (operator) {
            const nestedOperatorDeductionSteps = getQuantifiedDS(
              instantiatedConc,
              deductionStepsArr,
              conclusion,
              usedSubstitutes,
              "Existential",
              derivedRules
            );
            if (nestedOperatorDeductionSteps)
              return nestedOperatorDeductionSteps;
          }
        }

        if (isWffQuantified(instantiatedConc)) {
          const instantiatedConcDS = checkWithQuantifiableConclusion(
            instantiatedConc,
            deductionStepsArr,
            usedSubstitutes,
            derivedRules
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

        const instantiatedConcDS = checkKnowledgeBase(
          instantiatedConc,
          deductionStepsArr,
          derivedRules
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

        const instantiatedConc = getInstantiation(conclusion, combination[j]);

        if (isWffQuantified(instantiatedConc)) {
          const instantiatedConcDS = checkWithQuantifiableConclusion(
            instantiatedConc,
            deductionStepsArr,
            usedSubstitutes,
            derivedRules
          );
          if (instantiatedConcDS) {
            addDeductionStep(
              instantiatedConcDS,
              conclusion,
              "Universal Generalization",
              `${getSearchIndexInDS(instantiatedConcDS, instantiatedConc)}`
            );
            return instantiatedConcDS;
          }
        }

        const instantiatedConcDS = checkKnowledgeBase(
          instantiatedConc,
          deductionStepsArr,
          derivedRules
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
        const deductionSteps = checkKnowledgeBase(
          conclusion,
          deductionStepsArr,
          derivedRules
        );
        if (deductionSteps) return deductionSteps;
      }
    }
  }
  return false;
};

export default checkWithQuantifiableConclusion;

const getQuantifiedDS = (
  instantiatedConc: string[],
  deductionStepsArr: DeductionStep[],
  conclusion: string[],
  usedSubstitutes: string[],
  generalization: "Existential" | "Universal",
  derivedRules: DerivedRules
) => {
  const deductionSteps = [...deductionStepsArr];
  const nestedOperatorDeductionSteps = getOperatorInQuantifierDS(
    instantiatedConc,
    deductionSteps,
    usedSubstitutes,
    derivedRules
  );

  if (nestedOperatorDeductionSteps) {
    addDeductionStep(
      nestedOperatorDeductionSteps,
      conclusion,
      `${generalization} Generalization`,
      `${getSearchIndexInDS(nestedOperatorDeductionSteps, instantiatedConc)}`
    );
    return nestedOperatorDeductionSteps;
  }
  return false;
};

const getOperatorInQuantifierDS = (
  instantiatedConc: string[],
  deductionStepsArr: DeductionStep[],
  usedSubstitutes: string[],
  derivedRules: DerivedRules
) => {
  const operator = getOperator(instantiatedConc);
  if (operator) {
    if (operator === "&") {
      const deductionSteps = handleQuantificationalAndOperatorCase(
        deductionStepsArr,
        instantiatedConc,
        usedSubstitutes,
        derivedRules
      );

      if (deductionSteps) return deductionSteps;
    } else if (operator === "|") {
      const deductionSteps = handleQuantificationalOrOperatorCase(
        deductionStepsArr,
        instantiatedConc,
        usedSubstitutes,
        derivedRules
      );
      if (deductionSteps) return deductionSteps;
    } else if (operator === "->") {
      const deductionSteps = handleQuantificationalImplicationOperatorCase(
        deductionStepsArr,
        instantiatedConc,
        usedSubstitutes,
        derivedRules
      );
      if (deductionSteps) return deductionSteps;
    } else if (operator === "<->") {
      const deductionSteps = handleQuantificationalBiCondOperatorCase(
        deductionStepsArr,
        instantiatedConc,
        usedSubstitutes,
        derivedRules
      );
      if (deductionSteps) return deductionSteps;
    }
  }
  return false;
};
