import { DeductionStep } from "../../../types/sharedTypes";
import {
  addDeductionStep,
  changeFromPropertyToStartAtOne,
  convertImplicationToDisjunction,
  getOperator,
  searchInArray,
  searchIndex,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../HelperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import checkDisjunctionSolvability from "../../sharedFunctions/checkDisjunctionSolvability/checkDisjunctionSolvability";
import checkImplicationSolvability from "../../sharedFunctions/checkImplicationSolvability/checkImplicationSolvability";
import checkWithConclusion from "../../sharedFunctions/checkWithConclusion/checkWithConclusion";
import getDeMorganTransform from "../../sharedFunctions/getDeMorganTransform/getDeMorganTransform";
import simplifyAndOperation from "../../sharedFunctions/simplifyAndOperation/simplifyAndOperation";
import simplifyBiConditional from "../../sharedFunctions/simplifyBiConditional/simplifyBiConditional";
import calculatePossiblePermutations from "../calculatePossiblePermutations/calculatePossiblePermutations";
import checkWithQuantifiableConclusion from "../checkWithQuantifiableConclusion/checkWithQuantifiableConclusion";
import {
  getInstantiation,
  instantiateExistentialPremise,
  orderPremises,
  searchInKnowledgeBaseForInstantiatedPremsise,
} from "../inferDeductionStepsHelperFunctions/inferDeductionStepsHelperFunctions";

const inferThroughPermutations = (
  initialPremiseArr: string[],
  conclusion: string
) => {
  const conclusionArr = parseSymbolicLogicInput(conclusion);
  let deductionStepsArr: DeductionStep[] = [];
  const steps: DeductionStep[] = [];
  let knowledgeBase: string[][] = [];
  let premiseArr: string[][] = [];
  let alreadyInstantiatedPremise: string[][] = [];

  let simplifiableExpressions: string[][] = [];
  const instantiatedPremiseArr: string[][] = [];

  for (let i = 0; i < initialPremiseArr.length; i++) {
    const parsedPremise = parseSymbolicLogicInput(initialPremiseArr[i]);

    premiseArr.push(parsedPremise);
    knowledgeBase.push(parsedPremise);
  }

  const subVales = calculatePossiblePermutations(knowledgeBase);
  const possiblePerumutationsForUniversals =
    subVales?.possiblePerumutationsForUniversals;
  const usedSubstitutes = subVales?.usedSubstitutes;
  if (usedSubstitutes?.length === 0) usedSubstitutes.push("a");
  if (!possiblePerumutationsForUniversals || !usedSubstitutes) return;
  if (possiblePerumutationsForUniversals.length === 0) {
    const combination = [...usedSubstitutes];
    for (let i = 0; i < initialPremiseArr.length; i++) {
      combination.push(...usedSubstitutes);
    }
    possiblePerumutationsForUniversals.push(combination);
  }
  let exitentiallyInstantiatedArr = instantiateExistentialPremise(
    premiseArr,
    usedSubstitutes,
    deductionStepsArr
  );

  if (!exitentiallyInstantiatedArr) return;
  for (let i = 0; i < exitentiallyInstantiatedArr.length; i++) {
    const premise = exitentiallyInstantiatedArr[i];
    if (
      getOperator(premise) ||
      premise[0].includes("\u2203") ||
      premise[0].includes("\u2200")
    ) {
      simplifiableExpressions.push(premise);
    }
    if (premise[0].includes("\u2203")) knowledgeBase.push(premise);
  }

  console.log("starting knowledgebase: " + knowledgeBase);
  console.log("starting simplifiable expressions: " + simplifiableExpressions);
  const startingKnowledgeBase = [...knowledgeBase];
  const startingInstArr = [...exitentiallyInstantiatedArr];
  const startingSimpExp = [...simplifiableExpressions];
  const startingUniArr = [...alreadyInstantiatedPremise];
  const startingdeductionStepsArr = [...deductionStepsArr];

  for (let i = 0; i < possiblePerumutationsForUniversals.length; i++) {
    /**
     * RUNNING THE FUNCTION WITH ALL POSSIBLE VALUES
     * THAT THE UNIVERSAL VARIABLES CAN BE INSTANTIATED WITH
     */

    const combinations = possiblePerumutationsForUniversals[i];
    console.log(combinations);
    console.log(possiblePerumutationsForUniversals);
    /**
     * RESET ALL THE VALUES TO THE STARTING ONE
     */
    console.log(
      "---------------------------------------------------------------"
    );
    console.log(alreadyInstantiatedPremise);
    knowledgeBase = [...startingKnowledgeBase];
    exitentiallyInstantiatedArr = [...startingInstArr];
    simplifiableExpressions = [...startingSimpExp];
    alreadyInstantiatedPremise = [...startingUniArr];
    deductionStepsArr = [...startingdeductionStepsArr];

    console.log(usedSubstitutes);

    let oldKnowledgeBaseLength = knowledgeBase.length;
    let oldSimplifiableExpLength = simplifiableExpressions.length;

    let newKnowledgeBaseLength = knowledgeBase.length;
    let newSimplifiableExpLength = simplifiableExpressions.length;
    let k = 0;
    do {
      let spliceFrom: undefined | number;
      k++;
      console.log(k);
      if (k > 50) return;

      for (let l = 0; l < simplifiableExpressions.length; l++) {
        console.log(
          "running for simplifiable expressions" +
            simplifiableExpressions.length
        );
        console.log(simplifiableExpressions);
        const premise = simplifiableExpressions[l];
        console.log(premise);
        const operator = getOperator(premise);

        if (premise[0].includes("\u2203")) continue;
        if (premise[0].includes("\u2200")) {
          console.log();
          if (searchInArray(alreadyInstantiatedPremise, premise)) {
            // simplifiableExpressions.splice(l, 0);
            continue;
          } else {
            console.log("alerrttttttttttttttttttttttttt");
            console.log(premise);
            console.log("this premise does not belong here");
            console.log(deductionStepsArr);
            console.log(combinations);
            const substitute = combinations.shift();
            if (!substitute) return;

            const instantiatedPremise = getInstantiation(premise, substitute);
            addDeductionStep(
              deductionStepsArr,
              instantiatedPremise,
              "Universal Instantiation",
              `${searchIndex(knowledgeBase, premise)}`
            );
            console.log(instantiatedPremise[0]);
            const instOperator = getOperator(instantiatedPremise);
            if (instOperator) simplifiableExpressions.push(instantiatedPremise);

            knowledgeBase.push(instantiatedPremise);
            alreadyInstantiatedPremise.push(premise);
            continue;
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
          console.log(knowledgeBase);
          if (searchInArray(knowledgeBase, deMorganized)) continue;
          knowledgeBase.push(deMorganized);
          addDeductionStep(
            deductionStepsArr,
            deMorganized,
            "DeMorgan Theorem",
            `${
              impToDisj.length > 1 ? searchIndex(knowledgeBase, impToDisj) : i
            }`
          );
        } else if (operator === "<->") {
          const values = simplifyBiConditional(premise, knowledgeBase);
          console.log(values.knowledgeBase);
          knowledgeBase = values.knowledgeBase;
          deductionStepsArr.push(...values.deductionStepsArr);
        }
      }

      for (let k = 0; k < knowledgeBase.length; k++) {
        const premise = knowledgeBase[k];
        if (
          getOperator(premise) &&
          !searchInArray(simplifiableExpressions, premise)
        ) {
          simplifiableExpressions.push(premise);
        }
      }

      newKnowledgeBaseLength = knowledgeBase.length;
      newSimplifiableExpLength = simplifiableExpressions.length;

      if (spliceFrom) simplifiableExpressions.slice(spliceFrom, 1);

      if (
        oldKnowledgeBaseLength !== newKnowledgeBaseLength ||
        oldSimplifiableExpLength !== newSimplifiableExpLength
      ) {
        oldKnowledgeBaseLength = newKnowledgeBaseLength;
        oldSimplifiableExpLength = newSimplifiableExpLength;
        if (
          checkWithQuantifiableConclusion(
            knowledgeBase,
            deductionStepsArr,
            conclusionArr,
            [],
            usedSubstitutes
          )
        ) {
          console.log(
            "returning from the first conditional of the check conclusion"
          );
          steps.push(...deductionStepsArr);
          break;
        }
      } else {
        console.log("breakingggggggg out of the function");
        console.log(knowledgeBase);
        console.log(conclusionArr);
        break;
      }
    } while (true);
    console.log("just broke out of the do while loop");

    if (
      !steps.length &&
      checkWithQuantifiableConclusion(
        knowledgeBase,
        deductionStepsArr,
        conclusionArr,
        [],
        usedSubstitutes
      )
    ) {
      // const thisSteps = changeFromPropertyToStartAtOne(deductionStepsArr);
      steps.push(...deductionStepsArr);
      console.log("thereseee are the stepppspspsppspsppspsppspsppsppspspps");

      console.log(steps);
    }

    if (steps.length) {
      console.log(changeFromPropertyToStartAtOne(deductionStepsArr));
      console.log("returnnnnnnnggggg");
      return changeFromPropertyToStartAtOne(deductionStepsArr);
    }
    console.log("this combination was: " + combinations);
    console.log(
      "all the combinations are " + possiblePerumutationsForUniversals
    );
    console.log(knowledgeBase);

    console.log("the index of this combination was " + i);
  }
  console.log(knowledgeBase);
  console.log("returingnggggg after trying all possible permutaitons");
  console.log(changeFromPropertyToStartAtOne(deductionStepsArr));
  return false;
};

export default inferThroughPermutations;
