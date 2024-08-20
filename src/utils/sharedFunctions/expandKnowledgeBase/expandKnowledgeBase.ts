import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  convertImplicationToDisjunction,
  getOperator,
  getSearchIndexInDS,
  searchInArray,
  searchInDS,
  searchIndex,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { getInstantiation } from "../../quantifiableLogicUtils/inferDeductionStepsHelperFunctions/inferDeductionStepsHelperFunctions";
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
 * *
 *  @param previousDeductionStepsArr - An array of all the deductions steps .
 *
 * The below are optional parameters that are passed only if the argument is of First Order Logic.
 *
 *  @param alreadyInstantiatedPremises -(Optional) The premises that have been instantiated in their non instantiated form.
 *
 *  @param  combinations - (Optional) The current combinations from the permutaions for the instantiation of universal premises.
 *
 *  @param usedSubstitutes - (Optional) Substitutes that have already been used in existential or non quantified terms..
 *
 *  @returns - An array of deduction steps if expansion was applicable otherwise false
 *
 */

const expandKnowledgeBase = (
  simplifiableExpressions: string[][],
  previousDeductionStepsArr: DeductionStep[],
  alreadyInstantiatedPremises?: string[][],
  combinations?: string[],
  usedSubstitutes?: string[]
) => {
  let deductionStepsArr = [...previousDeductionStepsArr];
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
          const existentialSub = `_${substitute}`; //??

          const instantiatedPremise = getInstantiation(premise, existentialSub);
          addDeductionStep(
            deductionStepsArr,
            instantiatedPremise,
            "Existential Instantiation",
            `${getSearchIndexInDS(deductionStepsArr, premise)}`
          );

          const isSimplifable =
            getOperator(instantiatedPremise) ||
            instantiatedPremise.some(
              (el) => el.includes("\u2200") || el.includes("\u2203")
            );
          if (isSimplifable) simplifiableExpressions.push(instantiatedPremise);

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
            `${getSearchIndexInDS(deductionStepsArr, premise)}`
          );

          const isSimplifable =
            getOperator(instantiatedPremise) ||
            instantiatedPremise.some(
              (el) => el.includes("\u2200") || el.includes("\u2203")
            );
          if (isSimplifable) simplifiableExpressions.push(instantiatedPremise);
          alreadyInstantiatedPremises.push(premise);
          continue;
        }
      }
    }

    if (operator === "&") {
      const andOperatorDeductionSteps = simplifyAndOperation(
        premise,
        deductionStepsArr
      );
      if (andOperatorDeductionSteps)
        deductionStepsArr = andOperatorDeductionSteps;
    } else if (operator === "|") {
      const disjucntionDeductionSteps = checkDisjunctionSolvability(
        premise,
        deductionStepsArr
      );
      if (disjucntionDeductionSteps)
        deductionStepsArr = disjucntionDeductionSteps;
    } else if (operator === "->") {
      const impDS = checkImplicationSolvability(premise, deductionStepsArr);
      if (impDS) deductionStepsArr = impDS;
    } else if (operator === "~") {
      const secondaryOperator = getOperator(premise.slice(1));

      let impToDisj: string[] = [];
      if (secondaryOperator === "->") {
        impToDisj = convertImplicationToDisjunction(premise.slice(1));
        impToDisj = ["~", "(", ...impToDisj, ")"];
        if (getSearchIndexInDS(deductionStepsArr, impToDisj)) continue;
        addDeductionStep(
          deductionStepsArr,
          impToDisj,
          "Material Implication",
          `${getSearchIndexInDS(deductionStepsArr, premise)}`
        );
      }
      const deMorganized =
        impToDisj.length > 1
          ? getDeMorganTransform(impToDisj)
          : getDeMorganTransform(premise);
      if (searchInDS(deductionStepsArr, deMorganized)) continue;
      addDeductionStep(
        deductionStepsArr,
        deMorganized,
        "DeMorgan Theorem",
        `${
          impToDisj.length > 1
            ? getSearchIndexInDS(deductionStepsArr, impToDisj)
            : getSearchIndexInDS(deductionStepsArr, premise)
        }`
      );
    } else if (operator === "<->") {
      const biCondDS = simplifyBiConditional(premise, deductionStepsArr);
      if (biCondDS) deductionStepsArr = biCondDS;
    }
  }
  return deductionStepsArr;
};

export default expandKnowledgeBase;
