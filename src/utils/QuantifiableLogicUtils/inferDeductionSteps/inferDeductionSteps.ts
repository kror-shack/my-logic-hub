import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import getDeductionSteps from "../../PropositionalLogicUtils/getDeductionSteps/getDeductionsteps";
import {
  addDeductionStep,
  changeFromPropertyToStartAtOne,
} from "../../PropositionalLogicUtils/propositionalLogicHelperFunctions/propositionalLogicHelperFunction";
import {
  getInstantiation,
  instantiatePremises,
  makeSubstituteArr,
  orderPremises,
} from "../inferDeductionStepsHelperFunctions/inferDeductionStepsHelperFunctions";
import parseQuantifiableInput from "../parseQuantifiableInput/parseQuantifiableInput";

const inferDeductionSteps = (
  initialPremiseArr: string[],
  conclusion: string
) => {
  console.log("running infer dedcution steps");
  const deductionStepsArr: DeductionStep[] = [];
  const premiseArr: string[][] = [];

  for (let i = 0; i < initialPremiseArr.length; i++) {
    const parsedPremise = parseQuantifiableInput(initialPremiseArr[i]);
    premiseArr.push(parsedPremise);
  }

  const conclusionArr = parseQuantifiableInput(conclusion);

  const orderedPremises = orderPremises(premiseArr);
  const [existentialSubstitutes, usedSubstitutes] =
    makeSubstituteArr(premiseArr);

  console.log(`these are the exSubs: ${existentialSubstitutes}`);
  console.log(`these are the usedSubs: ${usedSubstitutes}`);

  const instantiatedPremisesArr = instantiatePremises(
    orderedPremises,
    existentialSubstitutes,
    usedSubstitutes,
    deductionStepsArr
  );
  console.log(
    `this is the instantiated premise arr: ${instantiatedPremisesArr}`
  );
  console.log(orderedPremises);

  //conc
  for (let i = 0; i < usedSubstitutes.length; i++) {
    const instantiatedConc = getInstantiation(
      conclusionArr,
      usedSubstitutes[i]
    );
    console.log(`this is the concccc: ${instantiatedConc}`);

    const concatenatedString = instantiatedConc.join("");
    const steps = getDeductionSteps(
      instantiatedPremisesArr,
      concatenatedString
    );

    if (steps) {
      const substitute =
        conclusionArr[0] === "forall"
          ? "Universal Instantiation"
          : "Existential Instantiation";
      const deductionSteps = [
        ...changeFromPropertyToStartAtOne(deductionStepsArr),
        ...changeFromPropertyToStartAtOne(steps, deductionStepsArr.length),
      ];
      addDeductionStep(
        deductionSteps,
        conclusionArr,
        substitute,
        deductionSteps.length + initialPremiseArr.length
      );
      console.log(deductionSteps);
      console.log("returnnnnnnnggggg");
      return deductionSteps;
    } else return false;
  }
};

export default inferDeductionSteps;
