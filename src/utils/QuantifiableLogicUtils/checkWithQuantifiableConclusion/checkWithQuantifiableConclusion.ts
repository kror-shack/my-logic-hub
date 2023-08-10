import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  searchInArray,
  searchIndex,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkKnowledgeBase from "../../sharedFunctions/checkKnowledgeBase/checkKnowledgeBase";
import calculatePossiblePermutations, {
  calculateFrequency,
  generatePermutations,
} from "../calculatePossiblePermutations/calculatePossiblePermutations";
import { getInstantiation } from "../inferDeductionStepsHelperFunctions/inferDeductionStepsHelperFunctions";

const checkWithQuantifiableConclusion = (
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[],
  conclusion: string[],
  existentialSubstitutes: string[],
  usedSubstitutes: string[]
) => {
  console.log("in the check with quantifiable conclusion function");
  console.log(conclusion);
  const numOfExistentialQuantifiers = calculateFrequency(
    [conclusion],
    "\u2203"
  );
  console.log(usedSubstitutes);
  const numOfUniversalQuantifiers = calculateFrequency([conclusion], "\u2200");
  const totalQuantifiers =
    numOfExistentialQuantifiers + numOfUniversalQuantifiers;

  const permutations = generatePermutations(usedSubstitutes, totalQuantifiers);
  console.log("permutations: " + permutations);
  for (let i = 0; i < permutations.length; i++) {
    console.log("in the for looop");
    const combination = permutations[i];
    console.log(combination);
    if (conclusion[0].includes("\u2203")) {
      const instantiatedConc = getInstantiation(conclusion, combination[i]);
      console.log("this is the instantitaed conclusion" + instantiatedConc);
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
      if (existentialSubstitutes.includes(combination[i])) continue;
      const instantiatedConc = getInstantiation(conclusion, combination[i]);
      if (
        checkKnowledgeBase(instantiatedConc, knowledgeBase, deductionStepsArr)
      ) {
        addDeductionStep(
          deductionStepsArr,
          conclusion,
          "Universal Generalization",
          `${searchIndex(knowledgeBase, instantiatedConc)}`
        );
        return true;
      }
    }
  }
  return false;
};

export default checkWithQuantifiableConclusion;
