import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";
import {
  addDeductionStep,
  getTranspose,
  searchInArray,
  searchIndex,
  splitArray,
} from "../propositionalLogicHelperFunctions/propositionalLogicHelperFunction";

function areStringArraysEqual(array1: string[], array2: string[]): boolean {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Compare each element of the arrays
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  // All elements are equal
  return true;
}

const checkForHypotheticalSyllogism = (
  desiredPremise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  if (
    desiredPremise[0] === "T" &&
    desiredPremise[1] === "->" &&
    desiredPremise[2] === "Q"
  ) {
  }

  if (searchInArray(knowledgeBase, desiredPremise)) return;

  for (let i = 0; i < knowledgeBase.length; i++) {
    const premise = knowledgeBase[i];
    if (!premise.includes("->")) continue;
    const transposedPremsie = getTranspose(premise);

    const [beforeImpInPremise, afterImpInPremise] = splitArray(premise, "->");
    const [beforeImpInTransPremise, afterImpInTransPremise] = splitArray(
      transposedPremsie,
      "->"
    );

    for (let j = 0; j < knowledgeBase.length; j++) {
      if (j > 20) return deductionStepsArr;
      let secondaryPremise = knowledgeBase[j];

      if (!secondaryPremise.includes("->")) continue;
      const transposedSecPremise = getTranspose(secondaryPremise);

      const [beforeImpInSecPremise, afterImpInSecPremise] = splitArray(
        secondaryPremise,
        "->"
      );
      const [beforeImpInTransSecPremise, afterImpInTransSecPremise] =
        splitArray(transposedSecPremise, "->");

      // both non tranposed premises
      if (areStringArraysEqual(afterImpInPremise, beforeImpInSecPremise)) {
        const obtained = [...beforeImpInPremise, "->", ...afterImpInSecPremise];
        if (!searchInArray(knowledgeBase, obtained)) {
          if (areStringArraysEqual(obtained, desiredPremise)) {
            addDeductionStep(
              deductionStepsArr,
              obtained,
              "Hypothetical Syllogism",
              `${searchIndex(knowledgeBase, premise)},${searchIndex(
                knowledgeBase,
                secondaryPremise
              )}`
            );
            knowledgeBase.push(obtained);
            return deductionStepsArr;
          }
        }
      }

      // both transposed premises
      else if (
        areStringArraysEqual(afterImpInTransPremise, beforeImpInTransSecPremise)
      ) {
        const obtained = [
          ...beforeImpInTransPremise,
          "->",
          ...afterImpInTransSecPremise,
        ];
        if (!searchInArray(knowledgeBase, obtained)) {
          if (areStringArraysEqual(obtained, desiredPremise)) {
            addDeductionStep(
              deductionStepsArr,
              transposedPremsie,
              "Transposition",
              `${searchIndex(knowledgeBase, premise)}`
            );
            knowledgeBase.push(transposedPremsie);
            addDeductionStep(
              deductionStepsArr,
              transposedSecPremise,
              "Transposition",
              `${searchIndex(knowledgeBase, secondaryPremise)}`
            );
            knowledgeBase.push(transposedSecPremise);

            addDeductionStep(
              deductionStepsArr,
              obtained,
              "Hypothetical Syllogism",
              `${searchIndex(knowledgeBase, transposedPremsie)},${searchIndex(
                knowledgeBase,
                transposedSecPremise
              )}`
            );
            knowledgeBase.push(obtained);
            return deductionStepsArr;
          }
        }
      }

      //first transposed premise, second non transposed premsie
      else if (
        areStringArraysEqual(afterImpInTransPremise, beforeImpInSecPremise)
      ) {
        const obtained = [
          ...beforeImpInTransPremise,
          "->",
          ...afterImpInSecPremise,
        ];
        if (!searchInArray(knowledgeBase, obtained)) {
          if (areStringArraysEqual(obtained, desiredPremise)) {
            addDeductionStep(
              deductionStepsArr,
              transposedPremsie,
              "Transposition",
              `${searchIndex(knowledgeBase, premise)}`
            );
            knowledgeBase.push(transposedPremsie);

            addDeductionStep(
              deductionStepsArr,
              obtained,
              "Hypothetical Syllogism",
              `${searchIndex(knowledgeBase, transposedPremsie)},${searchIndex(
                knowledgeBase,
                secondaryPremise
              )}`
            );
            knowledgeBase.push(obtained);
            return deductionStepsArr;
          }
        }
      }

      //first non transposed premise, second transposed premise
      else if (
        areStringArraysEqual(afterImpInPremise, beforeImpInTransSecPremise)
      ) {
        const obtained = [
          ...beforeImpInPremise,
          "->",
          ...afterImpInTransSecPremise,
        ];
        if (!searchInArray(knowledgeBase, obtained)) {
          if (areStringArraysEqual(obtained, desiredPremise)) {
            addDeductionStep(
              deductionStepsArr,
              transposedSecPremise,
              "Transposition",
              `${searchIndex(knowledgeBase, secondaryPremise)}`
            );
            knowledgeBase.push(transposedSecPremise);

            addDeductionStep(
              deductionStepsArr,
              obtained,
              "Hypothetical Syllogism",
              `${searchIndex(knowledgeBase, premise)},${searchIndex(
                knowledgeBase,
                transposedSecPremise
              )}`
            );
            knowledgeBase.push(obtained);
            return deductionStepsArr;
          }
        }
      }
    }
  }
};

export default checkForHypotheticalSyllogism;
