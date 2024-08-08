import {
  convertImplicationToDisjunction,
  getOperator,
  searchInArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { DeductionStep } from "../../../types/sharedTypes";
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
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
): boolean => {
  const premise = removeOutermostBrackets(originalPremise);

  const operator = getOperator(premise);

  for (let i = 0; i < premise.length; i++) {
    if (premise[i].includes("\u2200") || premise[i].includes("\u2203")) {
      if (searchInArray(knowledgeBase, premise)) {
        return true;
      }
      return false;
    }
  }

  if (searchInArray(knowledgeBase, premise)) {
    return true;
  }

  if (checkForCommutativity(premise, knowledgeBase, deductionStepsArr)) {
    return true;
  }

  // if the proposition is not simplifiable
  if (!operator) {
    const elementExists = searchInArray(knowledgeBase, premise);
    if (elementExists) {
      return true;
    }
    return false;
  }
  // if the proposition is simplifiable
  else {
    if (operator === "~") {
      const secondPremise = [...premise];
      const secondaryOperator = getOperator(secondPremise.slice(1));
      if (secondaryOperator) {
        let impToDisj: string[] = [];
        if (secondaryOperator === "<->") {
          return handleNegatedBiConditionalCase(
            premise,
            knowledgeBase,
            deductionStepsArr
          );
        } else if (secondaryOperator === "->") {
          impToDisj = convertImplicationToDisjunction(secondPremise.slice(1));
          impToDisj = ["~", "(", ...impToDisj, ")"];
        }
        return handleNegatedDeMorganCase(
          premise,
          impToDisj,
          secondPremise,
          knowledgeBase,
          deductionStepsArr
        );
      }
    }

    if (operator === "|") {
      return handleOrOperatorCase(premise, knowledgeBase, deductionStepsArr);
    } else if (operator === "&") {
      return handleAndOperatorCase(premise, knowledgeBase, deductionStepsArr);
    } else if (operator === "->") {
      return handleConditionalOperatorCase(
        premise,
        knowledgeBase,
        deductionStepsArr
      );
    } else if (operator === "<->") {
      return handleBiConditionalOperatorCase(
        premise,
        knowledgeBase,
        deductionStepsArr
      );
    }
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
