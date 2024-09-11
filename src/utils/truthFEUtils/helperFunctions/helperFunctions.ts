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

  // Collect all unique uppercase letters
  for (const str of strings) {
    for (const char of str) {
      if (char >= "A" && char <= "Z") {
        uppercaseLetters.add(char);
      }
    }
  }

  // Create the AllDomains object with keys as uppercase letters and empty arrays
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

      // Check if the current character is uppercase and not immediately followed by a lowercase letter,
      // and also ensure the character is not preceded or followed by an uppercase letter.
      if (
        char >= "A" &&
        char <= "Z" &&
        (nextChar === undefined || nextChar < "a" || nextChar > "z") && // Existing condition
        (prevChar === undefined || prevChar < "A" || prevChar > "Z") && // New condition: previous char is not uppercase
        (nextChar === undefined || nextChar < "A" || nextChar > "Z") // New condition: next char is not uppercase
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
      // Start from index 1 to check for preceding character
      const char = str[i];
      const prevChar = str[i - 1];

      // Check if the current character is uppercase and the previous character is also uppercase
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
  const quantifierExpansionOperator = quanitfier.includes("\u2200") ? "&" : "|";

  for (let i = 0; i < allDomainValues.length; i++) {
    const substitute = allDomainValues[i];

    const instantiatedPremise = addBracketsIfNecessary(
      getInstantiation(prop, substitute)
    );

    if (expandedPremise.length) {
      expandedPremise.unshift("(");
      expandedPremise.push(
        ...[quantifierExpansionOperator, ...instantiatedPremise, ")"]
      );
    } else expandedPremise.push(...instantiatedPremise);
  }
  return removeOuterBrackets(expandedPremise);
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

// export const addClosure = (inputArray: string[]): string[] {
//   const outputArray: string[] = [];
//   const stack: string[] = [];
//   let isInsideExistential = false;
//   let existentialQuantifier = "";

//   for (const token of inputArray) {
//     if (token.includes("\u2203")) {
//       // Starting an existential quantifier
//       isInsideExistential = true;
//       existentialQuantifier = token;
//       stack.push(token);
//     } else if (token === "(") {
//       stack.push(token);
//     } else if (token === ")") {
//       if (isInsideExistential) {
//         const expr = [];
//         while (
//           stack.length > 0 &&
//           !stack[stack.length - 1].includes("\u2203") &&
//           stack[stack.length - 1] !== "("
//         ) {
//           expr.unshift(stack.pop()!);
//         }
//         if (stack.length > 0 && stack[stack.length - 1].includes("\u2203")) {
//           stack.pop(); // Remove existential quantifier
//           outputArray.push(
//             "∀y",
//             "(",
//             existentialQuantifier,
//             "(",
//             ...expr,
//             ")",
//             ")"
//           );
//           isInsideExistential = false;
//         } else {
//           outputArray.push(...expr, ")");
//         }
//       } else {
//         outputArray.push(token);
//       }
//     } else {
//       if (isInsideExistential && token.match(/[A-Za-z]/)) {
//         // Add the token to the stack if it's a predicate
//         stack.push(token);
//       } else {
//         outputArray.push(token);
//       }
//     }
//   }

//   // If any remaining tokens in the stack
//   if (stack.length > 0) {
//     outputArray.push(...stack);
//   }

//   return outputArray;
// }

const quantifiers = ["\u2203", "\u2200"];

export const expandAllQuantifiersToTF = (
  inputArray: string[],
  allDomainValues: string[]
): string[] => {
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
        let depth = 1; // Track bracket depth
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
