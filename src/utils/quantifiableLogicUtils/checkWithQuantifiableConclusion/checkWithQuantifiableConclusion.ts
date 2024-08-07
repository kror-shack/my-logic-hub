import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  convertImplicationToDisjunction,
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
  strictSearchInArray,
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

/**
 * Check if a conclusion can be deduced from the knowledge base.
 *
 * This function checks if a given conclusion can be deduced from the provided knowledge base.
 *
 * @param  knowledgeBase - The knowledge base which is modified if applicable.
 * @param  deductionStepsArr - The deduction steps array which is modified if applicable.
 * @param  conclusion - The conclusion to be checked.
 * @param usedSubstitutes -  An array  containing all the skolem constants that were used.
 * @returns - `true` if the conclusion can be deduced, `false` otherwise.
 */
const checkWithQuantifiableConclusion = (
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[],
  conclusion: string[],
  usedSubstitutes: string[]
): boolean => {
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
          let rule = "";
          const [before, after] = splitArray(instantiatedConc, operator);
          if (
            operator === "&" &&
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
            rule = "Conjunction";
            addDeductionStep(
              deductionStepsArr,
              instantiatedConc,
              rule,
              `${searchIndex(knowledgeBase, before)}, ${searchIndex(
                knowledgeBase,
                after
              )}`
            );
            knowledgeBase.push(instantiatedConc);
            addDeductionStep(
              deductionStepsArr,
              conclusion,
              "Existential Generalization",
              `${searchIndex(knowledgeBase, instantiatedConc)}`
            );
            return true;
          } else if (
            operator === "|" &&
            (checkWithQuantifiableConclusion(
              knowledgeBase,
              deductionStepsArr,
              before,
              usedSubstitutes
            ) ||
              checkWithQuantifiableConclusion(
                knowledgeBase,
                deductionStepsArr,
                after,
                usedSubstitutes
              ))
          ) {
            const existingBefore = searchIndex(knowledgeBase, before);
            const existingAfter = searchIndex(knowledgeBase, after);
            rule = "Addition";
            addDeductionStep(
              deductionStepsArr,
              instantiatedConc,
              rule,
              existingBefore ? existingBefore : existingAfter
            );
            knowledgeBase.push(instantiatedConc);

            addDeductionStep(
              deductionStepsArr,
              conclusion,
              "Existential Generalization",
              `${searchIndex(knowledgeBase, instantiatedConc)}`
            );
            return true;
          } else if (operator === "->") {
            const negatedBefore = getNegation(before);
            if (
              checkWithQuantifiableConclusion(
                knowledgeBase,
                deductionStepsArr,
                negatedBefore,
                usedSubstitutes
              ) ||
              checkWithQuantifiableConclusion(
                knowledgeBase,
                deductionStepsArr,
                after,
                usedSubstitutes
              )
            ) {
              const existingBefore = searchIndex(knowledgeBase, negatedBefore);
              const existingAfter = searchIndex(knowledgeBase, after);

              const impToDisj =
                convertImplicationToDisjunction(instantiatedConc);
              addDeductionStep(
                deductionStepsArr,
                impToDisj,
                "Addition",
                existingBefore ? existingBefore : existingAfter
              );
              knowledgeBase.push(impToDisj);

              rule = "Material Implication";
              addDeductionStep(
                deductionStepsArr,
                instantiatedConc,
                rule,
                searchIndex(knowledgeBase, impToDisj)
              );
              knowledgeBase.push(instantiatedConc);

              addDeductionStep(
                deductionStepsArr,
                conclusion,
                "Existential Generalization",
                `${searchIndex(knowledgeBase, instantiatedConc)}`
              );
              return true;
            }
          } else if (operator === "<->") {
            const eliminatedBiconditional = [
              ...["(", ...before, "->", ...after, ")"],
              "&",
              ...["(", ...after, "->", ...before, ")"],
            ];
            if (
              checkWithQuantifiableConclusion(
                knowledgeBase,
                deductionStepsArr,
                eliminatedBiconditional,
                usedSubstitutes
              )
            ) {
              rule = "Biconditional Introuduction";
              addDeductionStep(
                deductionStepsArr,
                instantiatedConc,
                rule,
                searchIndex(knowledgeBase, eliminatedBiconditional)
              );
              knowledgeBase.push(eliminatedBiconditional);

              knowledgeBase.push(instantiatedConc);
              addDeductionStep(
                deductionStepsArr,
                conclusion,
                "Existential Generalization",
                `${searchIndex(knowledgeBase, instantiatedConc)}`
              );
              return true;
            }
          }
        }
        return false;
      }

      if (
        checkKnowledgeBase(instantiatedConc, knowledgeBase, deductionStepsArr)
      ) {
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

      if (conclusion.join("").includes(combination[i])) {
        continue;
      }

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
