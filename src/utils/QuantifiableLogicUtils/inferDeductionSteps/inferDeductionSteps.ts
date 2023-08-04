import parseSymbolicLogicInput from "../../HelperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import {
  addDeductionStep,
  changeFromPropertyToStartAtOne,
  getOperator,
  searchInArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import simplifyAndOperation from "../../sharedFunctions/simplifyAndOperation/simplifyAndOperation";
import {
  getInstantiation,
  instantiatePremises,
  makeSubstituteArr,
  orderPremises,
  searchInKnowledgeBaseForInstantiatedPremsise,
} from "../inferDeductionStepsHelperFunctions/inferDeductionStepsHelperFunctions";
import { DeductionStep } from "../../../types/sharedTypes";
import checkDisjunctionSolvability from "../../sharedFunctions/checkDisjunctionSolvability/checkDisjunctionSolvability";
import checkImplicationSolvability from "../../sharedFunctions/checkImplicationSolvability/checkImplicationSolvability";
import checkWithConclusion from "../../sharedFunctions/checkWithConclusion/checkWithConclusion";
import getDeMorganTransform from "../../sharedFunctions/getDeMorganTransform/getDeMorganTransform";
const inferDeductionSteps = (
  initialPremiseArr: string[],
  conclusion: string
) => {
  const conclusionArr = parseSymbolicLogicInput(conclusion);
  const deductionStepsArr: DeductionStep[] = [];
  const steps: DeductionStep[] = [];
  let knowledgeBase: string[][] = [];
  let premiseArr: string[][] = [];
  const alreadyInstantiatedPremise: string[][] = [];

  let simplifiableExpressions: string[][] = [];

  for (let i = 0; i < initialPremiseArr.length; i++) {
    const parsedPremise = parseSymbolicLogicInput(initialPremiseArr[i]);

    premiseArr.push(parsedPremise);
    knowledgeBase.push(parsedPremise);
  }
  const orderedPremises = orderPremises(premiseArr);

  const [existentialSubstitutes, usedSubstitutes] =
    makeSubstituteArr(orderedPremises);

  const instantiatedPremisesArr = instantiatePremises(
    orderedPremises,
    premiseArr,
    existentialSubstitutes,
    usedSubstitutes,
    deductionStepsArr,
    alreadyInstantiatedPremise
  );

  console.log(
    "this is the instantiated premisearr: " + instantiatedPremisesArr
  );

  for (let i = 0; i < instantiatedPremisesArr.length; i++) {
    const premise = instantiatedPremisesArr[i];
    if (getOperator(premise)) {
      simplifiableExpressions.push(premise);
    }
    knowledgeBase.push(premise);
  }

  //conc
  for (let i = 0; i < usedSubstitutes.length; i++) {
    const instantiatedConc = getInstantiation(
      conclusionArr,
      usedSubstitutes[i]
    );
    console.log("this is the instantiated conclusion array" + instantiatedConc);
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

      for (let i = 0; i < simplifiableExpressions.length; i++) {
        console.log("running for simplifiable expressions");
        const premise = simplifiableExpressions[i];
        console.log(premise);
        const operator = getOperator(premise);

        if (premise[0].includes("\u2200") || premise[0].includes("\u2203")) {
          console.log(
            "this premiseeeeeeeeee is aaaaaaaaaaa quantifiable oneee"
          );
          if (searchInArray(alreadyInstantiatedPremise, premise)) {
            console.log("it was already instantiated");
            continue;
          } else {
            console.log("alerrttttttttttttttttttttttttt");
            console.log(premise);
            console.log("this premise does not belong here");

            const instantiatedPremise = instantiatePremises(
              [...[premise]],
              knowledgeBase,
              existentialSubstitutes,
              ["a"],
              deductionStepsArr,
              alreadyInstantiatedPremise
            );
            console.log(instantiatedPremise[0]);
            const instOperator = getOperator(instantiatedPremise[0]);

            knowledgeBase.push(instantiatedPremise[0]);
            continue;
          }
        }

        if (operator === "&") {
          const values = simplifyAndOperation(premise, knowledgeBase);
          console.log(values.knowledgeBase);
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
          console.log("i am going for demorgan transform");
          const deMorganized = getDeMorganTransform(premise);
          if (searchInArray(knowledgeBase, deMorganized)) continue;
          knowledgeBase.push(deMorganized);
          addDeductionStep(
            deductionStepsArr,
            deMorganized,
            "DeMorgan Theorem",
            i
          );
        }
      }
      console.log(
        "this is the instantiated conclusion array" + usedSubstitutes
      );

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

      console.log(`knowledgebaswe; ${knowledgeBase}`);
      console.log(conclusionArr);
      if (
        oldKnowledgeBaseLength !== newKnowledgeBaseLength ||
        oldSimplifiableExpLength !== newSimplifiableExpLength
      ) {
        oldKnowledgeBaseLength = newKnowledgeBaseLength;
        oldSimplifiableExpLength = newSimplifiableExpLength;
        if (
          checkWithConclusion(
            knowledgeBase,
            instantiatedConc,
            deductionStepsArr
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

    if (
      !steps.length &&
      checkWithConclusion(knowledgeBase, instantiatedConc, deductionStepsArr)
    ) {
      // const thisSteps = changeFromPropertyToStartAtOne(deductionStepsArr);
      steps.push(...deductionStepsArr);
      console.log("thereseee are the stepppspspsppspsppspsppspsppsppspspps");

      console.log(steps);
    }

    if (steps.length) {
      console.log("are the stepppspspsppspsppspsppspsppsppspspps");
      console.log(steps);
      const substitute = conclusionArr[0].includes("\u2200")
        ? "Universal Generalization"
        : "Existential Generalization";
      // const deductionSteps = [
      //   ...changeFromPropertyToStartAtOne(deductionStepsArr),
      //   ...changeFromPropertyToStartAtOne(steps, deductionStepsArr.length),
      // ];
      addDeductionStep(
        deductionStepsArr,
        conclusionArr,
        substitute,
        `${searchInKnowledgeBaseForInstantiatedPremsise(
          knowledgeBase,
          conclusionArr
        )}`
      );
      console.log(deductionStepsArr);
      console.log("returnnnnnnnggggg");
      return changeFromPropertyToStartAtOne(deductionStepsArr);
    }
  }
  return false;
};

export default inferDeductionSteps;
