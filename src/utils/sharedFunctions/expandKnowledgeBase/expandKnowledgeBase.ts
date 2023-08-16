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

const expandKnowledgeBase = (
  simplifiableExpressions: string[][],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[],
  alreadyInstantiatedPremise?: string[][],
  combinations?: string[],
  usedSubstitutes?: string[]
) => {
  for (let i = 0; i < simplifiableExpressions.length; i++) {
    const premise = simplifiableExpressions[i];
    const operator = getOperator(premise);

    if (alreadyInstantiatedPremise && combinations) {
      if (premise[0].includes("\u2203")) {
        if (usedSubstitutes?.length === 0) continue;
        if (searchInArray(alreadyInstantiatedPremise, premise)) {
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
          alreadyInstantiatedPremise.push(premise);
          continue;
        }
      }
      if (premise[0].includes("\u2200")) {
        console.log();
        if (searchInArray(alreadyInstantiatedPremise, premise)) {
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
          alreadyInstantiatedPremise.push(premise);
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
      console.log(premise);

      const deMorganized =
        impToDisj.length > 1
          ? getDeMorganTransform(impToDisj)
          : getDeMorganTransform(premise);
      console.log("this be the demorganized" + deMorganized);
      console.log(knowledgeBase);
      if (searchInArray(knowledgeBase, deMorganized)) continue;
      console.log("pushing demorganized:  " + deMorganized);
      knowledgeBase.push(deMorganized);
      addDeductionStep(
        deductionStepsArr,
        deMorganized,
        "DeMorgan Theorem",
        `${impToDisj.length > 1 ? searchIndex(knowledgeBase, impToDisj) : i}`
      );
    } else if (operator === "<->") {
      const values = simplifyBiConditional(premise, knowledgeBase);
      console.log(values.knowledgeBase);
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
