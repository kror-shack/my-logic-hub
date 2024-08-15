import {
  convertImplicationToDisjunction,
  getOperator,
  isPremiseInQuantifierEnclosure,
  searchInArray,
  searchInDS,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import checkForCommutativity from "../checkForCommutativity/checkForCommutativity";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import {
  handleAndOperatorCase,
  handleBiConditionalOperatorCase,
  handleConditionalOperatorCase,
  handleNegatedBiConditionalCase,
  handleNegatedDeMorganCase,
  handleOrOperatorCase,
} from "./caseHelpers/caseHelpers";

/**
 *  Execute backward chaining to reach to a conclusion.
 *
 * This function uses backward chaining by recursion to process input data
 * and make decisions based on predefined rules.
 *
 * @param premise - Te conclsuion that needs to be reached.
 * @param knowledgeBase - The knowledge base which the function modifies if applicable..
 * @param deductionStepsArr - The deduction steps in order which the function modifies if applicable..
 * @returns - Boolean based on whether the conclusion can be reached through the current content of the knowledge base.
 */

const checkKnowledgeBase = (
  originalPremise: string[],
  previousDeductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules
): DeductionStep[] | false => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  const premise = removeOutermostBrackets(originalPremise);
  const operator = getOperator(premise);

  for (let i = 0; i < premise.length; i++) {
    if (premise[i].includes("\u2200") || premise[i].includes("\u2203")) {
      const alreadyExistsInKB = searchInDS(deductionStepsArr, premise);
      if (alreadyExistsInKB) return deductionStepsArr;
      else if (isPremiseInQuantifierEnclosure(premise)) {
        return false;
      }
    }
  }

  const alreadyExistsInKB = searchInDS(deductionStepsArr, premise);
  if (alreadyExistsInKB)
    if (alreadyExistsInKB) return deductionStepsArr;
    else return false;

  const commutativeSteps = checkForCommutativity(premise, deductionStepsArr);
  if (commutativeSteps) return commutativeSteps;

  // If the case is negation and it contains secondary simplifable opeartors of biConditional or Conditional
  // TODO: add cases for the other operators
  if (operator === "~") {
    const secondPremise = [...premise];
    const secondaryOperator = getOperator(secondPremise.slice(1));
    if (secondaryOperator) {
      let impToDisj: string[] = [];
      if (secondaryOperator === "<->") {
        const simplifiedBiCondDeductionsArr = handleNegatedBiConditionalCase(
          premise,
          deductionStepsArr,
          derivedRules
        );

        if (simplifiedBiCondDeductionsArr) {
          return simplifiedBiCondDeductionsArr;
        }
        return false;
      } else if (
        secondaryOperator === "->" &&
        derivedRules.isMaterialImpAllowed
      ) {
        impToDisj = convertImplicationToDisjunction(secondPremise.slice(1));
        impToDisj = ["~", "(", ...impToDisj, ")"];
      }
      if (derivedRules.isMaterialImpAllowed) {
        const simplifiedNegatedDeMorganDeductionSteps =
          handleNegatedDeMorganCase(
            premise,
            impToDisj,
            secondPremise,
            deductionStepsArr,
            derivedRules
          );
        if (simplifiedNegatedDeMorganDeductionSteps)
          return simplifiedNegatedDeMorganDeductionSteps;
      }
      return false;
    }
  }

  if (operator === "|") {
    const orOperatorDeducitonSteps = handleOrOperatorCase(
      premise,
      deductionStepsArr,
      derivedRules
    );
    if (orOperatorDeducitonSteps) return orOperatorDeducitonSteps;
  } else if (operator === "&") {
    const andOperatorDeductionSteps = handleAndOperatorCase(
      premise,
      deductionStepsArr,
      derivedRules
    );
    if (andOperatorDeductionSteps) return andOperatorDeductionSteps;
  } else if (operator === "->") {
    const conditionalOperatorDeductionSteps = handleConditionalOperatorCase(
      premise,
      deductionStepsArr,
      derivedRules
    );
    if (conditionalOperatorDeductionSteps)
      return conditionalOperatorDeductionSteps;
  } else if (operator === "<->") {
    const biConditonalOperatorDeductionSteps = handleBiConditionalOperatorCase(
      premise,
      deductionStepsArr,
      derivedRules
    );
    if (biConditonalOperatorDeductionSteps)
      return biConditonalOperatorDeductionSteps;
  }
  return false;
};

export default checkKnowledgeBase;

/**
 * AFTER ELEMENT EXISTS CHECK AND BEFORE RETURNING FALSE
 * Tautology rules replaces inferences with the form
 *  P -> P
 */
// const identityPremise = [...premise, "->", ...premise];
// if (!searchInArray(knowledgeBase, identityPremise)) {
//   const lawOfIdentity = checkForHypotheticalSyllogism(
//     identityPremise,
//     knowledgeBase,
//     deductionStepsArr
//   );
//   if (lawOfIdentity) {
//     addDeductionStep(
//       deductionStepsArr,
//       premise,
//       "Law of Identiy",
//       `${searchIndex(knowledgeBase, identityPremise)}`
//     );
//     knowledgeBase.push(premise);
//     return true;
//   }
// }

// BEFORE CASE OPERATORS CHECK
// const negatedPremise = getNegation(premise);
// if (
//   !searchInArray(knowledgeBase, negatedPremise) &&
//   checkKnowledgeBase(negatedPremise, knowledgeBase, deductionStepsArr)
// ) {
//   addDeductionStep(
//     deductionStepsArr,
//     premise,
//     "Negation",
//     `${searchIndex(knowledgeBase, negatedPremise)}`
//   );
//   knowledgeBase.push(premise);

//   return true;
// }
