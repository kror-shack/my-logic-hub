import { AllDomains } from "../../../types/truthFETypes/truthFETypes";
import { areStringArraysEqual } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../helperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import getCounterModel from "../getCounterModel/getCounterModel";
import { getPremiseTruthValue } from "../getPremiseTruthValue/getPremiseTruthValue";
import {
  addClosureIfNecessary,
  expandAllQuantifiersToTF,
  replaceExpansionWithTruthValues,
  replaceNameLettersWithValues,
} from "../helperFunctions/helperFunctions";

const getTruthFE = (initialPremiseArr: string[], conclusion: string) => {
  const steps: string[] = [];
  const counterModel = getCounterModel(initialPremiseArr, conclusion);
  if (!counterModel) return false;
  const allDomainValues = counterModel["universe"];
  if (!Array.isArray(allDomainValues)) return false;

  steps.push(
    `The universe of this counter model is U:{ ${allDomainValues} }${
      !allDomainValues.length ? " i.e., an empty universe." : "."
    }`
  );
  steps.push(
    "The following are the domain values, with the constants inside { } representing the values where the predicate is true."
  );
  for (const [key, value] of Object.entries(counterModel)) {
    if (key === "universe") continue;
    const domain = `${key}: ${
      value === "T" || value === "F" ? value : `{ ${value} }`
    }`;
    steps.push(domain);
  }

  for (let i = 0; i < initialPremiseArr.length; i++) {
    const premiseNumber = `premise(${i + 1})`;
    const premise = parseSymbolicLogicInput(initialPremiseArr[i]);
    const allPremiseSteps = getAllPremiseSteps(
      premise,
      counterModel,
      premiseNumber,
      allDomainValues
    );
    steps.push(...allPremiseSteps);
  }
  const conclusionArr = parseSymbolicLogicInput(conclusion);
  const premiseNumber = `the conclusion`;
  const allPremiseSteps = getAllPremiseSteps(
    conclusionArr,
    counterModel,
    premiseNumber,
    allDomainValues
  );
  steps.push(...allPremiseSteps);
  return steps;
};

export default getTruthFE;

const getAllPremiseSteps = (
  premise: string[],
  counterModel: AllDomains,
  premiseName: string,
  allDomainValues: number[]
) => {
  const steps: string[] = [];
  const closuredPremise = addClosureIfNecessary(premise);
  if (!areStringArraysEqual(premise, closuredPremise)) {
    steps.push(
      `Adding closure for ${premiseName}: ${closuredPremise.join("")}  `
    );
  }
  const replacedNameLettersPremise = replaceNameLettersWithValues(
    closuredPremise,
    counterModel
  );
  if (!areStringArraysEqual(closuredPremise, replacedNameLettersPremise)) {
    steps.push(
      `Replacing constant letters with their values for ${premiseName}: ${replacedNameLettersPremise.join(
        ""
      )}  `
    );
  }

  const expandedPremise = expandAllQuantifiersToTF(
    replacedNameLettersPremise,
    allDomainValues.map((el) => el.toString())
  );

  if (!areStringArraysEqual(replacedNameLettersPremise, expandedPremise)) {
    steps.push(
      `${
        allDomainValues.length
          ? "Instantiating"
          : "Since there are no elements in the domain, the quantifiers can be removed without instantiation, as there are no values that would satisfy the predicate for"
      } ${premiseName}: ${expandedPremise.join(" ")}  `
    );
  }

  const premiseToTF = replaceExpansionWithTruthValues(
    expandedPremise,
    counterModel
  );

  steps.push(`Truth replacement for ${premiseName}: ${premiseToTF.join(" ")}`);
  const premiseTruthValue = getPremiseTruthValue(expandedPremise, counterModel);
  steps.push(`Truth value of ${premiseName} is ${premiseTruthValue}`);
  return steps;
};
