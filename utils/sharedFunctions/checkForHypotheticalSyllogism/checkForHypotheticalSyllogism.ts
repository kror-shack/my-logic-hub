import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  areStringArraysEqual,
  getTranspose,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";

/**
 * Check for hypothetical syllogism
 *
 * This function checks whether two premises in the knowledge base
 * can be hypothetically syllogised to make a desired premise.
 *  The function checks each premise and its transposed, with each
 * of the other premises and their transpose to check with all the possible permutations.
 *
 * @param desiredPremise - The premise that needs to be generated
 * @param knowledgeBase - The knowledge base which is modified it applicable.
 * @param deductionStepsArr - The ordered deduction steps array which is modified if applicable.
 * @returns - This function returns true if the desired premise can be reached by the wffs from the knoweldge base, otherwise false.
 */
const checkForHypotheticalSyllogism = (
  desiredPremise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
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
            return true;
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
            return true;
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
            return true;
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
            return true;
          }
        }
      }
    }
  }
};

export default checkForHypotheticalSyllogism;
