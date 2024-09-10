import { AllDomains } from "../../../types/truthFETypes/truthFETypes";
import {
  addBracketsIfNecessary,
  areStringArraysEqual,
  getOperator,
  getTopLevelNegation,
  removeOuterBrackets,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
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

export const processBracketedPartsTruthValue = (
  expression: string[]
): string[] => {
  const result: string[] = [];
  const stack: string[] = [];

  for (const element of expression) {
    if (element === "(") {
      stack.push(element);
    } else if (element === ")") {
      let bracketedPart: string[] = [];
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        bracketedPart.unshift(stack.pop()!);
      }
      stack.pop();
      const truthValue = getTruthValue(bracketedPart) ? "T" : "F";
      if (truthValue) stack.push(truthValue);
    } else {
      if (stack.length > 0) {
        stack.push(element);
      } else {
        result.push(element);
      }
    }
  }

  // Handle remaining stack elements
  while (stack.length > 0) {
    result.push(stack.shift()!);
  }

  return result;
};

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
      const nextChar = str[i + 1];

      // Check if the current character is uppercase and not immediately followed by a lowercase letter
      if (
        char >= "A" &&
        char <= "Z" &&
        (nextChar === undefined || nextChar < "a" || nextChar > "z")
      ) {
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

export const getPremiseTruthValue = (premise: string[], domain: AllDomains) => {
  const truthyConc = convertWffToTF(premise, domain);
  const truthiedConcTruthValue = getTruthValue(truthyConc);

  return truthiedConcTruthValue;
};

const getTruthValue = (premise: string[]) => {
  const premiseArr = removeOuterBrackets(premise);
  const operator = getOperator(premiseArr);
  if (!operator) return getConstantTruthValue(premise);
  const [before, after] = splitArray(premise, operator);

  if (operator === "~") {
    const removedNegationPremise = removeOuterBrackets(premiseArr.slice(1));
    const secondaryOperator = getOperator(removedNegationPremise);
    if (!secondaryOperator)
      return getConstantTruthValue(removedNegationPremise);
    const [before, after] = splitArray(
      removedNegationPremise,
      secondaryOperator
    );

    // reverse operations since it is negated
    if (secondaryOperator === "|") {
      return handleAndOperator(before, after);
    } else if (secondaryOperator === "&") {
      return handleOrOperator(before, after);
    } else if (secondaryOperator === "->") {
      return handleNegatedImplicationOperator(before, after);
    }
  }

  if (operator === "|") {
    return handleOrOperator(before, after);
  } else if (operator === "&") {
    return handleAndOperator(before, after);
  } else if (operator === "->") {
    return handleImplicationOperator(before, after);
  } else if (operator === "<->") {
    return handleBiConcOperator(before, after, false);
  }

  return false;
};

const handleBiConcOperator = (
  before: string[],
  after: string[],
  negated: boolean
) => {
  const beforeImp = [
    ...addBracketsIfNecessary(before),
    "->",
    ...addBracketsIfNecessary(after),
  ];
  const afterImp = [
    ...addBracketsIfNecessary(after),
    "->",
    ...addBracketsIfNecessary(before),
  ];

  if (!negated) return handleAndOperator(beforeImp, afterImp);
  const negatedBeforeImp = getTopLevelNegation(beforeImp);
  const negatedAfterImp = getTopLevelNegation(afterImp);
  return handleOrOperator(negatedBeforeImp, negatedAfterImp);
};
const handleImplicationOperator = (before: string[], after: string[]) => {
  const negatedBefore = getTopLevelNegation(before);
  return handleOrOperator(negatedBefore, after);
};

const handleNegatedImplicationOperator = (
  before: string[],
  after: string[]
) => {
  const negatedAfter = getTopLevelNegation(after);
  return handleAndOperator(before, negatedAfter);
};

const handleAndOperator = (before: string[], after: string[]) => {
  const beforeIsTrue = getTruthValue(before);
  if (!beforeIsTrue) return false;
  const afterIsTrue = getTruthValue(after);
  if (afterIsTrue) return true; // TODO: throws an error if written as return afterIsTrue
  return false;
};

const handleOrOperator = (before: string[], after: string[]) => {
  const beforeIsTrue = getTruthValue(before);
  if (beforeIsTrue) return true;
  const afterIsTrue = getTruthValue(after);
  if (afterIsTrue) return true; // TODO: throws an error if written as return afterIsTrue
  return false;
};

const getConstantTruthValue = (premise: string[]): boolean => {
  const predicate = premise[0];
  if (predicate === "~T") {
    return false;
  } else if (predicate === "~F") {
    return true;
  }
  return predicate === "T";
};
