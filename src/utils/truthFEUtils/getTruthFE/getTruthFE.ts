import { AllDomains } from "../../../types/truthFETypes/truthFETypes";
import parseSymbolicLogicInput from "../../helperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import { isWffQuantified } from "../../pLTreeUtils/pLTHelperFunctions/pLTHelperFunctions";
import {
  createAllDomainsFromPredicates,
  getAllConstants,
  getInstantiationThroughDomain,
  getPremiseTruthValue,
} from "../helperFunctions/helperFunctions";
import {
  filterDomainsConstants,
  generatePermutationsForDomain,
} from "../perumutationFunctions/perumutationFunctions";

const getTruthFE = (initialPremiseArr: string[], conclusion: string) => {
  const entireArg = initialPremiseArr.concat(conclusion);
  const allDomains = createAllDomainsFromPredicates(entireArg);
  const constants = getAllConstants(entireArg);
  for (let i = 0; i < 2; i++) {
    const numbersArray = Array.from({ length: i }, (_, index) => index);
    const allDomainValues = numbersArray.map((item) => item.toString());
    const allPossibleDomains = generatePermutationsForDomain(
      allDomains,
      numbersArray
    );
    const filteredDomains = filterDomainsConstants(
      allPossibleDomains,
      constants
    );

    const counterModel = runDomainExpansion(
      filteredDomains,
      entireArg,
      allDomainValues
    );
    if (counterModel) {
      return counterModel;
    }
  }
  return false;
};

export default getTruthFE;

const runDomainExpansion = (
  allDomains: AllDomains[],
  argument: string[],
  allDomainValues: string[]
) => {
  const copiedArg = [...argument];
  const concString = copiedArg.pop();
  if (!concString) return;
  const concArr = parseSymbolicLogicInput(concString);

  for (let i = 0; i < allDomains.length; i++) {
    const currentDomain = allDomains[i];
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
    const premise = parseSymbolicLogicInput(premiseArr[i]);
    const isQuantified = isWffQuantified(premise);
    if (!isQuantified) {
      const premiseTruthValue = getPremiseTruthValue(premise, domain);

      if (!premiseTruthValue) return false;
    }
    const premiseIsTrue = checkQuantifiedPremiseTruthValue(
      premise,
      domain,
      allDomainValues
    );
    if (!premiseIsTrue) return false;
    return true;
  }
};

const checkQuantifiedPremiseTruthValue = (
  premise: string[],
  domain: AllDomains,
  allDomainValues: string[]
) => {
  const instantiatedPremise = getInstantiationThroughDomain(
    premise,
    allDomainValues
  );

  const premiseTruthValue = getPremiseTruthValue(instantiatedPremise, domain);

  return premiseTruthValue;
};
