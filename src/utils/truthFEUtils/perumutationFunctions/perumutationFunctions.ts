import { AllDomains } from "../../../types/truthFETypes/truthFETypes";
import { generatePermutations } from "../../quantifiableLogicUtils/calculatePossiblePermutations/calculatePossiblePermutations";

// Genereates all the permutations for domains
export const generatePermutationsForDomain = (
  domains: AllDomains,
  inputArray: number[]
) => {
  const stringInputArr = inputArray.map((item) => item.toString());
  stringInputArr.push(""); // to account for when the domain has no true value
  const permutations = generatePermutations(
    stringInputArr,
    Object.keys(domains).length
  );
  console.log(permutations);
  const allDomainPermutations: AllDomains[] = [];
  for (const combination of permutations) {
    const updatedDomains = updateDomainValues(domains, combination);

    allDomainPermutations.push(updatedDomains); // Push the modified domain to the result array
  }
  return allDomainPermutations;
};

//removes all arrays from constants and makes it true or false
export const filterDomainsConstants = (
  domains: AllDomains[],
  keysToUpdate: string[]
): AllDomains[] => {
  const filteredDomain = domains.map((domain) => {
    const updatedDomain: AllDomains = { ...domain };

    keysToUpdate.forEach((key) => {
      if (key in updatedDomain && Array.isArray(updatedDomain[key])) {
        updatedDomain[key] =
          (updatedDomain[key] as number[]).length > 0 ? "T" : "F";
      }
    });

    return updatedDomain;
  });
  return removeDuplicateDomains(filteredDomain);
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
