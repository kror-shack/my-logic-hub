import { AllDomains } from "../../../types/truthFETypes/truthFETypes";
import parseSymbolicLogicInput from "../../helperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import { isWffQuantified } from "../../pLTreeUtils/pLTHelperFunctions/pLTHelperFunctions";
import { getPremiseTruthValue } from "../getPremiseTruthValue/getPremiseTruthValue";
import {
  addClosureIfNecessary,
  createAllDomainsFromPredicates,
  expandAllQuantifiersToTF,
  getAllConstants,
  getInstantiationThroughDomain,
  getNameLetters,
  replaceNameLettersWithValues,
} from "../helperFunctions/helperFunctions";
import {
  filterDomainsConstants,
  generatePermutationsForDomain,
} from "../perumutationFunctions/perumutationFunctions";

const getCounterModel = (initialPremiseArr: string[], conclusion: string) => {
  const entireArg = initialPremiseArr.concat(conclusion);
  const allDomains = createAllDomainsFromPredicates(entireArg);
  const constants = getAllConstants(entireArg); // P from Fx -> P
  const nameLetters = getNameLetters(entireArg); //A from GA
  for (let i = 0; i < 7; i++) {
    const numbersArray = Array.from({ length: i }, (_, index) => index);
    const allDomainValues = numbersArray.map((item) => item.toString());
    const allPossibleDomains = generatePermutationsForDomain(
      allDomains,
      numbersArray
    );
    const filteredDomains = filterDomainsConstants(
      allPossibleDomains,
      constants,
      nameLetters
    );

    const counterModel = runDomainExpansion(
      filteredDomains,
      entireArg,
      allDomainValues
    );
    if (counterModel) {
      counterModel["universe"] = allDomainValues.map((el) => parseInt(el));
      return counterModel;
    }
  }
  return false;
};

export default getCounterModel;

const runDomainExpansion = (
  allDomains: AllDomains[],
  argument: string[],
  allDomainValues: string[]
) => {
  const copiedArg = [...argument];
  const concString = copiedArg.pop();
  if (!concString) return;

  for (let i = 0; i < allDomains.length; i++) {
    const currentDomain = allDomains[i];
    const withNameLettersConcArr = addClosureIfNecessary(
      parseSymbolicLogicInput(concString)
    );
    const concArr = replaceNameLettersWithValues(
      withNameLettersConcArr,
      currentDomain
    );

    const concTruthValue = checkQuantifiedPremiseTruthValue(
      concArr,
      currentDomain,
      allDomainValues
    );

    if (concTruthValue) continue; // skip all domains where conc is true
    if (!copiedArg.length) return currentDomain; //only conc is present
    const arePremisesTrueInDomain = areAllPremisesTrue(
      copiedArg,
      currentDomain,
      allDomainValues
    );
    if (arePremisesTrueInDomain) return currentDomain;
  }
  return false;
};

const areAllPremisesTrue = (
  premiseArr: string[],
  domain: AllDomains,
  allDomainValues: string[]
) => {
  for (let i = 0; i < premiseArr.length; i++) {
    const withNameLettersPremise = addClosureIfNecessary(
      parseSymbolicLogicInput(premiseArr[i])
    );
    const premise = replaceNameLettersWithValues(
      withNameLettersPremise,
      domain
    );

    const premiseIsTrue = checkQuantifiedPremiseTruthValue(
      premise,
      domain,
      allDomainValues
    );
    if (!premiseIsTrue) return false;
  }
  return true;
};

const checkQuantifiedPremiseTruthValue = (
  premise: string[],
  domain: AllDomains,
  allDomainValues: string[]
) => {
  const instantiatedPremise = expandAllQuantifiersToTF(
    premise,
    allDomainValues
  );

  const premiseTruthValue = getPremiseTruthValue(instantiatedPremise, domain);

  return premiseTruthValue;
};
