import { DeductionStep } from "../../../types/sharedTypes";
import {
  addToSimplifiableExpressions,
  getOperator,
  searchInArray,
  prettifyQLOutput,
  addDeductionStep,
  getKbFromDS,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../helperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import checkForContradictionExploitaion from "../../sharedFunctions/checkForContradictionExploitation/checkForContradictionExploitation";
import expandKnowledgeBase from "../../sharedFunctions/expandKnowledgeBase/expandKnowledgeBase";
import calculatePossiblePermutations from "../calculatePossiblePermutations/calculatePossiblePermutations";
import checkWithQuantifiableConclusion from "../checkWithQuantifiableConclusion/checkWithQuantifiableConclusion";
import { instantiateExistentialPremise } from "../inferDeductionStepsHelperFunctions/inferDeductionStepsHelperFunctions";

/**
 * Get steps for natural deduction styled proof a FOL argument.
 *
 * This function uses a combination of forward chaining, backward chaining, and permutations to make inferences
 * based on the given premises to reached the desired conclsuion(if possible). The permuations are used to
 * test all possible useful combinations, with which the universal variables can be instantiated to reach the conclusion.
 *
 *
 *
 * @param initialPremiseArr -  A string array representing the premises for inference.
 * @param conclusion -A string representing the conclusion to be inferred.
 * @returns - The steps to reach the conclusion or false if no conclusion can be reached.
 */
const inferThroughPermutations = (
  initialPremiseArr: string[],
  conclusion: string
): DeductionStep[] | false => {
  const conclusionArr = parseSymbolicLogicInput(conclusion);
  let deductionStepsArr: DeductionStep[] = [];
  const steps: DeductionStep[] = [];
  let premiseArr: string[][] = [];
  let alreadyInstantiatedPremises: string[][] = [];

  let simplifiableExpressions: string[][] = [];

  for (let i = 0; i < initialPremiseArr.length; i++) {
    const parsedPremise = parseSymbolicLogicInput(initialPremiseArr[i]);

    premiseArr.push(parsedPremise);
    addDeductionStep(deductionStepsArr, parsedPremise, "premise", 0);
  }

  const knowledgeBase = getKbFromDS(deductionStepsArr);
  const subVales = calculatePossiblePermutations(knowledgeBase);
  const possiblePerumutationsForUniversals =
    subVales?.possiblePerumutationsForUniversals;
  const usedSubstitutes = subVales?.usedSubstitutes;
  if (usedSubstitutes?.length === 0) usedSubstitutes.push("a");
  if (possiblePerumutationsForUniversals.length === 0) {
    const combination = [...usedSubstitutes];
    for (let i = 0; i < initialPremiseArr.length; i++) {
      combination.push(...usedSubstitutes);
    }
    possiblePerumutationsForUniversals.push(combination);
  }
  let valuesFromInstantiation = instantiateExistentialPremise(
    premiseArr,
    usedSubstitutes,
    deductionStepsArr,
    alreadyInstantiatedPremises
  );
  let exitentiallyInstantiatedArr =
    valuesFromInstantiation?.instantiatedPremisesArr;
  let unUsedSubs = valuesFromInstantiation?.usedSubs;

  if (!exitentiallyInstantiatedArr) return false;
  for (let i = 0; i < exitentiallyInstantiatedArr.length; i++) {
    const premise = exitentiallyInstantiatedArr[i];
    if (
      getOperator(premise) ||
      premise[0].includes("\u2203") ||
      premise[0].includes("\u2200")
    ) {
      simplifiableExpressions.push(premise);
    }
    if (!searchInArray(knowledgeBase, premise)) knowledgeBase.push(premise);
  }

  const startingKnowledgeBase = [...knowledgeBase];
  const startingInstArr = [...exitentiallyInstantiatedArr];
  const startingSimpExp = [...simplifiableExpressions];
  const startingUniArr = [...alreadyInstantiatedPremises];
  const startingdeductionStepsArr = [...deductionStepsArr];
  const startingunUsedSubs = [...unUsedSubs];

  for (let i = 0; i < possiblePerumutationsForUniversals.length; i++) {
    /**
     * RUNNING THE FUNCTION WITH ALL POSSIBLE VALUES
     * THAT THE UNIVERSAL VARIABLES CAN BE INSTANTIATED WITH
     */

    const combinations = possiblePerumutationsForUniversals[i];

    /**
     * RESET ALL THE VALUES TO THE STARTING ONE
     */

    exitentiallyInstantiatedArr = [...startingInstArr];
    simplifiableExpressions = [...startingSimpExp];
    alreadyInstantiatedPremises = [...startingUniArr];
    deductionStepsArr = [...startingdeductionStepsArr];
    unUsedSubs = [...startingunUsedSubs];

    let oldDeductionStepsArrLength = deductionStepsArr.length;
    let oldSimplifiableExpLength = simplifiableExpressions.length;

    do {
      const expandedKb = expandKnowledgeBase(
        simplifiableExpressions,
        deductionStepsArr,
        alreadyInstantiatedPremises,
        combinations,
        unUsedSubs
      );
      if (expandedKb) deductionStepsArr = expandedKb;

      addToSimplifiableExpressions(knowledgeBase, simplifiableExpressions);

      if (
        oldDeductionStepsArrLength !== deductionStepsArr.length ||
        oldSimplifiableExpLength !== simplifiableExpressions.length
      ) {
        oldDeductionStepsArrLength = deductionStepsArr.length;
        oldSimplifiableExpLength = simplifiableExpressions.length;
        if (
          checkWithQuantifiableConclusion(
            knowledgeBase,
            deductionStepsArr,
            conclusionArr,
            usedSubstitutes
          )
        ) {
          steps.push(...deductionStepsArr);
          break;
        } else if (
          !steps.length &&
          checkForContradictionExploitaion(conclusionArr, deductionStepsArr)
        ) {
          steps.push(...deductionStepsArr);
          break;
        }
      } else {
        break;
      }
    } while (true);

    if (
      !steps.length &&
      checkWithQuantifiableConclusion(
        knowledgeBase,
        deductionStepsArr,
        conclusionArr,
        usedSubstitutes
      )
    ) {
      // const thisSteps = prettifyQLOutput(deductionStepsArr);
      steps.push(...deductionStepsArr);
    } else if (
      !steps.length &&
      checkForContradictionExploitaion(conclusionArr, deductionStepsArr)
    ) {
      steps.push(...deductionStepsArr);
    }

    if (steps.length) {
      const prettifiedOutput = prettifyQLOutput(deductionStepsArr);
      return prettifiedOutput;
    }
  }
  return false;
};

export default inferThroughPermutations;
