import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  areStringArraysEqual,
  getKbFromDS,
  getTranspose,
  searchInDS,
  splitArray,
  getSearchIndexInDS,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";

/**
 * Check for hypothetical syllogism
 *
 * This function checks whether two premises in the knowledge base
 * can be hypothetically syllogised to make a desired premise.
 *  The function checks each premise and its transposed, with each
 * of the other premises and their transpose to check with all the possible permutations.
 *
 * @param desiredPremise - The premise that needs to be generated
 * @param previousDeductionStepsArr - An array of all the deduction steps.
 * @returns - An updated deduction steps array if wff could be simplified/solved otherwise false.
 */
const checkForHypotheticalSyllogism = (
  desiredPremise: string[],
  previousDeductionStepsArr: DeductionStep[]
): DeductionStep[] | false => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  if (searchInDS(deductionStepsArr, desiredPremise)) return deductionStepsArr;

  const knowledgeBase = getKbFromDS(deductionStepsArr);
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
        if (!searchInDS(deductionStepsArr, obtained)) {
          if (areStringArraysEqual(obtained, desiredPremise)) {
            addDeductionStep(
              deductionStepsArr,
              obtained,
              "Hypothetical Syllogism",
              `${getSearchIndexInDS(
                deductionStepsArr,
                premise
              )},${getSearchIndexInDS(deductionStepsArr, secondaryPremise)}`
            );
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
        if (!searchInDS(deductionStepsArr, obtained)) {
          if (areStringArraysEqual(obtained, desiredPremise)) {
            addDeductionStep(
              deductionStepsArr,
              transposedPremsie,
              "Transposition",
              `${getSearchIndexInDS(deductionStepsArr, premise)}`
            );
            addDeductionStep(
              deductionStepsArr,
              transposedSecPremise,
              "Transposition",
              `${getSearchIndexInDS(deductionStepsArr, secondaryPremise)}`
            );

            addDeductionStep(
              deductionStepsArr,
              obtained,
              "Hypothetical Syllogism",
              `${getSearchIndexInDS(
                deductionStepsArr,
                transposedPremsie
              )},${getSearchIndexInDS(deductionStepsArr, transposedSecPremise)}`
            );
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
        if (!searchInDS(deductionStepsArr, obtained)) {
          if (areStringArraysEqual(obtained, desiredPremise)) {
            addDeductionStep(
              deductionStepsArr,
              transposedPremsie,
              "Transposition",
              `${getSearchIndexInDS(deductionStepsArr, premise)}`
            );

            addDeductionStep(
              deductionStepsArr,
              obtained,
              "Hypothetical Syllogism",
              `${getSearchIndexInDS(
                deductionStepsArr,
                transposedPremsie
              )},${getSearchIndexInDS(deductionStepsArr, secondaryPremise)}`
            );
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
        if (!searchInDS(deductionStepsArr, obtained)) {
          if (areStringArraysEqual(obtained, desiredPremise)) {
            addDeductionStep(
              deductionStepsArr,
              transposedSecPremise,
              "Transposition",
              `${getSearchIndexInDS(deductionStepsArr, secondaryPremise)}`
            );

            addDeductionStep(
              deductionStepsArr,
              obtained,
              "Hypothetical Syllogism",
              `${getSearchIndexInDS(
                deductionStepsArr,
                premise
              )},${getSearchIndexInDS(deductionStepsArr, transposedSecPremise)}`
            );
            return deductionStepsArr;
          }
        }
      }
    }
  }
  return false;
};

export default checkForHypotheticalSyllogism;
