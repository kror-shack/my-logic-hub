import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  convertImplicationToDisjunction,
  getOperator,
  searchInArray,
  searchIndex,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { getInstantiation } from "../../QuantifiableLogicUtils/inferDeductionStepsHelperFunctions/inferDeductionStepsHelperFunctions";
import checkDisjunctionSolvability from "../checkDisjunctionSolvability/checkDisjunctionSolvability";
import checkImplicationSolvability from "../checkImplicationSolvability/checkImplicationSolvability";
import getDeMorganTransform from "../getDeMorganTransform/getDeMorganTransform";
import simplifyAndOperation from "../simplifyAndOperation/simplifyAndOperation";
import simplifyBiConditional from "../simplifyBiConditional/simplifyBiConditional";

/**
 * Execute forward chaining to expand knowledge base.
 *
 * This function uses forward chaining to process the knowledgebase and make decisions based on predefined rules.
 *
 *  @param simplifiableExpressions - These are the wffs in the knowledge base that can be simplified i.e., they contain atleast an operator.
 *
 *  @param knowledgeBase - The knowledge bases which the function modifies if applicable.
 *
 *  @param  deductionStepsArr - The deduction steps in order which the function modifies if applicable..
 *
 * The below are optional parameters that are passed only if the argument is of First Order Logic.
 *
 *  @param alreadyInstantiatedPremises -(Optional) The premises that have been instantiated in their non instantiated form.
 *
 *  @param  combinations - (Optional) The current combinations from the permutaions for the instantiation of universal premises.
 *
 *  @param usedSubstitutes - (Optional) Substitutes that have already been used in existential or non quantified terms..
 *
 *  @returns - An object containing the (updated if applicable) knowledge base and an array of deduction steps.
 *
 */

const expandKnowledgeBase = (
  simplifiableExpressions: string[][],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[],
  alreadyInstantiatedPremises?: string[][],
  combinations?: string[],
  usedSubstitutes?: string[]
) => {
  for (let i = 0; i < simplifiableExpressions.length; i++) {
    const premise = simplifiableExpressions[i];
    const operator = getOperator(premise);

    if (alreadyInstantiatedPremises && combinations) {
      if (premise[0].includes("\u2203")) {
        if (usedSubstitutes?.length === 0) continue;
        if (searchInArray(alreadyInstantiatedPremises, premise)) {
          continue;
        } else {
          const substitute = usedSubstitutes?.shift();
          if (!substitute) continue;

          const instantiatedPremise = getInstantiation(premise, substitute);
          addDeductionStep(
            deductionStepsArr,
            instantiatedPremise,
            "Existential Instantiation",
            `${searchIndex(knowledgeBase, premise)}`
          );
          const instOperator = getOperator(instantiatedPremise);
          if (instOperator) simplifiableExpressions.push(instantiatedPremise);

          knowledgeBase.push(instantiatedPremise);
          alreadyInstantiatedPremises.push(premise);
          continue;
        }
      }
      if (premise[0].includes("\u2200")) {
        if (searchInArray(alreadyInstantiatedPremises, premise)) {
          // simplifiableExpressions.splice(l, 0);
          continue;
        } else {
          const substitute = combinations.shift();
          if (!substitute) return false;

          const instantiatedPremise = getInstantiation(premise, substitute);
          addDeductionStep(
            deductionStepsArr,
            instantiatedPremise,
            "Universal Instantiation",
            `${searchIndex(knowledgeBase, premise)}`
          );
          const instOperator = getOperator(instantiatedPremise);
          if (instOperator) simplifiableExpressions.push(instantiatedPremise);

          knowledgeBase.push(instantiatedPremise);
          alreadyInstantiatedPremises.push(premise);
          continue;
        }
      }
    }

    if (operator === "&") {
      const values = simplifyAndOperation(premise, knowledgeBase);
      knowledgeBase = values.knowledgeBase;
      deductionStepsArr.push(...values.deductionStepsArr);
    } else if (operator === "|") {
      const values = checkDisjunctionSolvability(premise, knowledgeBase);
      knowledgeBase = values.knowledgeBase;
      deductionStepsArr.push(...values.deductionStepsArr);
    } else if (operator === "->") {
      const values = checkImplicationSolvability(premise, knowledgeBase);
      knowledgeBase = values.knowledgeBase;
      deductionStepsArr.push(...values.deductionStepsArr);
    } else if (operator === "~") {
      const secondaryOperator = getOperator(premise.slice(1));
      let impToDisj: string[] = [];
      if (secondaryOperator === "->") {
        impToDisj = convertImplicationToDisjunction(premise.slice(1));
        impToDisj = ["~", "(", ...impToDisj, ")"];
        if (searchInArray(knowledgeBase, impToDisj)) continue;
        addDeductionStep(
          deductionStepsArr,
          impToDisj,
          "Material Implication",
          `${searchIndex(knowledgeBase, premise)}`
        );
        knowledgeBase.push(impToDisj);
      }

      const deMorganized =
        impToDisj.length > 1
          ? getDeMorganTransform(impToDisj)
          : getDeMorganTransform(premise);
      if (searchInArray(knowledgeBase, deMorganized)) continue;
      knowledgeBase.push(deMorganized);
      addDeductionStep(
        deductionStepsArr,
        deMorganized,
        "DeMorgan Theorem",
        `${impToDisj.length > 1 ? searchIndex(knowledgeBase, impToDisj) : i}`
      );
    } else if (operator === "<->") {
      const values = simplifyBiConditional(premise, knowledgeBase);
      knowledgeBase = values.knowledgeBase;
      deductionStepsArr.push(...values.deductionStepsArr);
    }
  }
  return {
    knowledgeBase: knowledgeBase,
    deductionStepsArr: deductionStepsArr,
  };
};

export default expandKnowledgeBase;
