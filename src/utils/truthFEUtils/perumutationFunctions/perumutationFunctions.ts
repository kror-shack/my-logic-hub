import { AllDomains } from "../../../types/truthFETypes/truthFETypes";
import { generatePermutations } from "../../quantifiableLogicUtils/calculatePossiblePermutations/calculatePossiblePermutations";

// Genereates all the permutations for domains
export const generatePermutationsForDomain = (
  domains: AllDomains,
  inputArray: number[]
) => {
  const results: AllDomains[] = [];

  // Helper function to generate all combinations for a single domain
  function getCombinations(array: number[]): number[][] {
    const combinations: number[][] = [[]];

    for (const element of array) {
      const length = combinations.length;
      for (let i = 0; i < length; i++) {
        combinations.push([...combinations[i], element]);
      }
    }

    return combinations;
  }

  // Get combinations for each domain
  const domainKeys = Object.keys(domains);
  const domainCombinations: { [key: string]: number[][] } = {};

  for (const key of domainKeys) {
    domainCombinations[key] = getCombinations(inputArray);
  }

  // Recursive function to generate all permutations dynamically
  function generate(domainIndex: number, current: AllDomains) {
    if (domainIndex === domainKeys.length) {
      results.push({ ...current });
      return;
    }

    const key = domainKeys[domainIndex];
    for (const combination of domainCombinations[key]) {
      current[key] = combination;
      generate(domainIndex + 1, current);
    }
  }

  generate(0, {});
  return results;
};

//removes all arrays from constants and makes it true or false
export const filterDomainsConstants = (
  domains: AllDomains[],
  constantKeys: string[],
  nameLettersKeys: string[]
): AllDomains[] => {
  const filteredDomain = domains.map((domain) => {
    const updatedDomain: AllDomains = { ...domain };

    constantKeys.forEach((key) => {
      if (key in updatedDomain && Array.isArray(updatedDomain[key])) {
        updatedDomain[key] =
          (updatedDomain[key] as number[]).length > 0 ? "T" : "F";
      }
    });

    nameLettersKeys.forEach((key) => {
      if (key in updatedDomain && Array.isArray(updatedDomain[key])) {
        if ((updatedDomain[key] as number[]).length > 1) {
          delete updatedDomain[key]; // Remove the key if the length is greater than 1
        } else if (
          Array.isArray(updatedDomain[key]) &&
          (updatedDomain[key] as number[]).length === 1
        ) {
          updatedDomain[key] = (updatedDomain[key] as number[])[0];
        }
      }
    });

    return updatedDomain;
  });

  const uniqueDomains = removeDuplicateDomains(filteredDomain);
  return uniqueDomains;
};

const removeDuplicateDomains = (domains: AllDomains[]): AllDomains[] => {
  const uniqueDomains: AllDomains[] = [];

  domains.forEach((domain) => {
    const isDuplicate = uniqueDomains.some(
      (uniqueDomain) =>
        Object.keys(domain).length === Object.keys(uniqueDomain).length &&
        Object.keys(domain).every(
          (key) =>
            Array.isArray(domain[key]) && Array.isArray(uniqueDomain[key])
              ? JSON.stringify(domain[key]) ===
                JSON.stringify(uniqueDomain[key]) // Compare arrays
              : domain[key] === uniqueDomain[key] // Compare "T" or "F"
        )
    );

    if (!isDuplicate) {
      uniqueDomains.push(domain);
    }
  });

  return uniqueDomains;
};

const updateDomainValues = (domains: AllDomains, combination: string[]) => {
  const domainsCopy = { ...domains };
  for (const domain in domainsCopy) {
    // Copy to avoid mutation
    const value = combination.shift(); // Get the first value from combination
    domainsCopy[domain] =
      value !== undefined && value !== "" ? [parseInt(value)] : []; // Set the value in the domain
  }
  return domainsCopy;
};
