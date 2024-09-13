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

  steps.push(`The universe of this counter model is U:{ ${allDomainValues} }`);
  steps.push(
    "The following are the domain values where items between { } are values where that predicate is true"
  );
  for (const [key, value] of Object.entries(counterModel)) {
    if (key === "universe") continue;
    const domain = `${key}: {${value}}`;
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
  const premiseNumber = `conclusion`;
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
    closuredPremise,
    allDomainValues.map((el) => el.toString())
  );
  if (!areStringArraysEqual(replacedNameLettersPremise, expandedPremise)) {
    steps.push(`Expanded ${premiseName}: ${expandedPremise.join(" ")}  `);
  }

  const premiseToTF = replaceExpansionWithTruthValues(
    expandedPremise,
    counterModel
  );
  steps.push(`Truth replacement for ${premiseName}: ${premiseToTF.join(" ")}`);
  const premiseTruthValue = getPremiseTruthValue(expandedPremise, counterModel);
  steps.push(`Truth value for ${premiseName}: ${premiseTruthValue}`);
  return steps;
};
