import { AllDomains } from "../../../types/truthFETypes/truthFETypes";
import {
  addBracketsIfNecessary,
  areStringArraysEqual,
  getOperator,
  getTopLevelNegation,
  removeOuterBrackets,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import parseSymbolicLogicInput from "../../helperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import { isWffQuantified } from "../../pLTreeUtils/pLTHelperFunctions/pLTHelperFunctions";
import calculatePossiblePermutations, {
  generatePermutations,
} from "../../quantifiableLogicUtils/calculatePossiblePermutations/calculatePossiblePermutations";
import {
  extractElementsInBrackets,
  getInstantiation,
} from "../../quantifiableLogicUtils/inferDeductionStepsHelperFunctions/inferDeductionStepsHelperFunctions";

type Operator = "&" | "|" | "->" | "<->";
type Token = "T" | "F" | Operator;

/**
 * Takes an array of strings and a logical operator, then returns a new array
 * where the operator is applied between each element.
 *
 * @param elements - An array of strings.
 * @param operator - A logical operator, either '&' or '|'.
 * @returns A new array with the operator applied between each element.
 */
export const expandQuantifiedWff = (
  wff: string[],
  operator: "&" | "|"
): string[] => {
  const bracketedWff = addBracketsIfNecessary(wff);
  return [...bracketedWff, operator, ...bracketedWff];
};

type Domain = string; // Domain is a string key

/**
 * Converts elements in the expression array based on the provided domains.
 *
 * @param expression - An array of strings representing the logical expression.
 * @param domains - A record of domains where each key is a domain and values are arrays of numbers.
 * @returns A new array with converted "T" or "F" values based on the domains.
 */
export const convertWffToTF = (
  expression: string[],
  domains: AllDomains
): string[] => {
  return expression.map((element) => {
    const isNegated = element.includes("~");
    const removedNegationElement = isNegated ? element.slice(1) : element;
    // Check if the element is a capital letter or capital letter with a number
    const match = removedNegationElement.match(/^([A-Z])(\d+)?$/);
    if (match) {
      const [_, letter, number] = match;
      const domainValues = domains[letter]; // Get the domain values for the letter
      let truthValue = "F";

      if (domainValues) {
        if (number !== undefined && Array.isArray(domainValues)) {
          // FO

          truthValue = domainValues.includes(parseInt(number)) ? "T" : "F";
        } else if (domainValues === "T" || domainValues === "F") {
          truthValue = domainValues;
        }
      }
      return isNegated ? "~".concat(truthValue) : truthValue;
    }
    return element;
  });
};

// export const processBracketedPartsTruthValue = (
//   expression: string[]
// ): string[] => {
//   const result: string[] = [];
//   const stack: string[] = [];

//   for (const element of expression) {
//     if (element === "(") {
//       stack.push(element);
//     } else if (element === ")") {
//       let bracketedPart: string[] = [];
//       while (stack.length > 0 && stack[stack.length - 1] !== "(") {
//         bracketedPart.unshift(stack.pop()!);
//       }
//       stack.pop();
//       const truthValue = getTruthValue(bracketedPart) ? "T" : "F";
//       if (truthValue) stack.push(truthValue);
//     } else {
//       if (stack.length > 0) {
//         stack.push(element);
//       } else {
//         result.push(element);
//       }
//     }
//   }

//   // Handle remaining stack elements
//   while (stack.length > 0) {
//     result.push(stack.shift()!);
//   }

//   return result;
// };

/**
 * Processes an array of strings by removing negations and flipping boolean values.
 * If an element starts with '~', it removes '~' and flips 'T' to 'F' and 'F' to 'T'.
 *
 * @param expression - An array of strings representing a logical expression.
 * @returns A new array with negations removed and boolean values flipped.
 */
export const negateRequiredTruthValues = (expression: string[]): string[] => {
  return expression.map((element) => {
    if (element.startsWith("~")) {
      const value = element.slice(1);
      return value === "T" ? "F" : "T";
    }
    return element;
  });
};

export const evaluateExpandedLogicalExpression = (
  expression: string[]
): boolean => {
  let result: boolean = expression[0] === "T";

  for (let i = 1; i < expression.length; i += 2) {
    const operator = expression[i];
    const nextOperand = expression[i + 1] === "T";

    if (operator === "&") {
      result = result && nextOperand;
    } else if (operator === "|") {
      result = result || nextOperand;
    }
  }

  return result;
};

export const createAllDomainsFromPredicates = (
  strings: string[]
): AllDomains => {
  const uppercaseLetters = new Set<string>();

  for (const str of strings) {
    for (const char of str) {
      if (char >= "A" && char <= "Z") {
        uppercaseLetters.add(char);
      }
    }
  }

  const allDomains: AllDomains = {};
  uppercaseLetters.forEach((letter) => {
    allDomains[letter] = [];
  });

  return allDomains;
};

export const getAllConstants = (strings: string[]): string[] => {
  const result: string[] = [];

  strings.forEach((str) => {
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const prevChar = str[i - 1];
      const nextChar = str[i + 1];

      if (
        char >= "A" &&
        char <= "Z" &&
        (nextChar === undefined || nextChar < "a" || nextChar > "z") &&
        (prevChar === undefined || prevChar < "A" || prevChar > "Z") &&
        (nextChar === undefined || nextChar < "A" || nextChar > "Z")
      ) {
        result.push(char);
      }
    }
  });

  return result;
};

export const getNameLetters = (strings: string[]): string[] => {
  const result: string[] = [];

  strings.forEach((str) => {
    for (let i = 1; i < str.length; i++) {
      const char = str[i];
      const prevChar = str[i - 1];

      if (char >= "A" && char <= "Z" && prevChar >= "A" && prevChar <= "Z") {
        result.push(char);
      }
    }
  });

  return result;
};

export const getInstantiationThroughDomain = (
  prop: string[],
  allDomainValues: string[]
) => {
  const isQuantified = isWffQuantified(prop);
  const expandedPremise: string[] = [];
  if (!isQuantified) return prop;
  const quanitfier = prop[0];
  const variable = extractElementsInBrackets(quanitfier);

  const quantifierExpansionOperator = quanitfier.includes("\u2200") ? "&" : "|";

  if (!allDomainValues.length) {
    instantiateAndExpandPremsie(
      expandedPremise,
      prop,
      variable,
      quantifierExpansionOperator
    );
  }
  for (let i = 0; i < allDomainValues.length; i++) {
    const substitute = allDomainValues[i];
    instantiateAndExpandPremsie(
      expandedPremise,
      prop,
      substitute,
      quantifierExpansionOperator
    );
  }
  return removeOuterBrackets(expandedPremise);
};

const instantiateAndExpandPremsie = (
  expandedPremise: string[],
  prop: string[],
  substitute: string,
  quantifierExpansionOperator: "|" | "&"
) => {
  const instantiatedPremise = addBracketsIfNecessary(
    getInstantiation(prop, substitute)
  );

  if (expandedPremise.length) {
    expandedPremise.unshift("(");
    expandedPremise.push(
      ...[quantifierExpansionOperator, ...instantiatedPremise, ")"]
    );
  } else expandedPremise.push(...instantiatedPremise);
};

export const replaceNameLettersWithValues = (
  inputArray: string[],
  domains: AllDomains
): string[] => {
  return inputArray.map((item) => {
    return item.replace(/([A-Z])([A-Z])/g, (match, p1, p2) => {
      if (domains[p2] !== undefined && typeof domains[p2] === "number") {
        return p1 + domains[p2];
      }
      return match;
    });
  });
};

export const addClosureIfNecessary = (arr: string[]): string[] => {
  const freeVariables = getFreeVariables(arr);

  if (!freeVariables.length) return arr;

  const result = Array.from(freeVariables)
    .map((varName) => `∀(${varName})`)
    .concat(["(", ...arr, ")"]);

  return result;
};

const quantifiers = ["\u2203", "\u2200"];

export const expandAllQuantifiersToTF = (
  originalInputArr: string[],
  allDomainValues: string[]
): string[] => {
  const inputArray = [...originalInputArr];
  for (let i = inputArray.length - 1; i >= 0; i--) {
    const currentElement = inputArray[i];
    if (quantifiers.some((quantifier) => currentElement.includes(quantifier))) {
      const quantifier = currentElement;

      let nextElement = inputArray[i + 1];

      if (nextElement && nextElement !== "(") {
        const premise = [quantifier, nextElement];
        const instantiatedPremise = getInstantiationThroughDomain(
          premise,
          allDomainValues
        );

        inputArray.splice(
          i,
          premise.length,
          ...addBracketsIfNecessary(instantiatedPremise)
        );
      } else if (nextElement && nextElement === "(") {
        const premise: string[] = [quantifier];
        let depth = 1;
        let j = i;
        while (nextElement && depth > 0) {
          j++;
          nextElement = inputArray[j];
          if (nextElement === "(" && j !== i + 1) {
            depth++;
          } else if (nextElement === ")") {
            depth--;
          }

          if (nextElement) premise.push(nextElement);
        }

        const instantiatedPremise = getInstantiationThroughDomain(
          premise,
          allDomainValues
        );
        inputArray.splice(
          i,
          premise.length,
          ...addBracketsIfNecessary(instantiatedPremise)
        );
      }
    }
  }

  const removedBracketsResult = removeOuterBrackets(inputArray);
  return removedBracketsResult;
};

export const getFreeVariables = (originalInputArray: string[]) => {
  const inputArray = [...originalInputArray];
  for (let i = inputArray.length - 1; i >= 0; i--) {
    const currentElement = inputArray[i];
    if (quantifiers.some((quantifier) => currentElement.includes(quantifier))) {
      const quantifier = currentElement;

      let nextElement = inputArray[i + 1];

      if (nextElement === "~") {
        // to ignore negations as in ∀(x)~Px
        inputArray.splice(i + 1, 1);
      }

      if (nextElement && nextElement !== "(") {
        const premise = [quantifier, nextElement];
        const updated = removeQuantifeidPremise(premise);

        inputArray.splice(
          i,
          premise.length,
          ...addBracketsIfNecessary(updated)
        );
      } else if (nextElement && nextElement === "(") {
        const premise: string[] = [quantifier];
        let depth = 1;
        let j = i;
        while (nextElement && depth > 0) {
          j++;
          nextElement = inputArray[j];
          if (nextElement === "(" && j !== i + 1) {
            depth++;
          } else if (nextElement === ")") {
            depth--;
          }

          if (nextElement) premise.push(nextElement);
        }

        const updated = removeQuantifeidPremise(premise);

        inputArray.splice(
          i,
          premise.length,
          ...addBracketsIfNecessary(updated)
        );
      }
    }
  }
  const regex = /[A-Z]([a-z])/g;

  const freeVariables = inputArray.filter((el) => regex.test(el));

  return freeVariables.map((el) => el[el.length - 1]);
};

const removeQuantifeidPremise = (premise: string[]) => {
  const freeVariables: string[] = [];
  const isQuantified = isWffQuantified(premise);
  if (!isQuantified) return premise;
  const quantifier = premise[0];
  const variable = extractElementsInBrackets(quantifier);
  for (let i = 0; i < premise.length; i++) {
    const currentElement = premise[i];
    const regex = /[A-Z]([a-z])/g;
    if (currentElement.length >= 2 && regex.test(currentElement)) {
      if (currentElement[currentElement.length - 1] !== variable) {
        freeVariables.push(currentElement);
      }
    }
  }
  return freeVariables;
};

export const removeAllOuterMostBractets = (premise: string[]) => {
  let updatedPremise = [...premise];
  let removedBracketsResult = removeOutermostBrackets(updatedPremise);
  while (!areStringArraysEqual(updatedPremise, removedBracketsResult)) {
    updatedPremise = removedBracketsResult;
    removedBracketsResult = removeAllOuterMostBractets(updatedPremise);
  }
  return removedBracketsResult;
};

export const replaceExpansionWithTruthValues = (
  inputArray: string[],
  allDomains: AllDomains
): string[] => {
  return inputArray.map((item, index) => {
    const predicate = item[0] === "~" ? item[1] : item[0];
    if (allDomains.hasOwnProperty(predicate)) {
      const possibleValues = allDomains[predicate];

      const nextItem = item[item.indexOf(predicate) + 1];

      if (
        Array.isArray(possibleValues) &&
        possibleValues.includes(Number(nextItem))
      ) {
        return item[0] === "~" ? "~T" : "T";
      } else if (possibleValues === "T") {
        return item[0] === "~" ? "~T" : "T";
      } else {
        return item[0] === "~" ? "~F" : "F";
      }
    }

    return item;
  });
};
