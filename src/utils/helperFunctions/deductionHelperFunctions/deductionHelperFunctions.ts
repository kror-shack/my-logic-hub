import { DeductionStep } from "../../../types/sharedTypes";
import getNegation from "../../sharedFunctions/getNegation/getNegation";
import checkInputForErrors from "../checkInputForErrors/checkInputForError";
import checkQLInputForErrors from "../checkQLInputForErrors/checkQLInputForErrors";
import convertToReversePolishNotation from "../convertToReversePolishNotation/convertToReversePolishNotation";
import removeOutermostBrackets from "../removeOutermostBrackets/removeOutermostBrackets";

export function getOperator(premise: string[]): string | undefined {
  const rpn = convertToReversePolishNotation(premise);
  if (!rpn) return undefined;
  return isOperator(rpn[rpn.length - 1]) ? rpn[rpn.length - 1] : undefined;
}

export function createNegation(arr: string[]) {
  if (arr.length === 1) {
    const element = arr[0];
    if (element.startsWith("~")) {
      return [element.substring(1)];
    } else {
      return ["~" + element];
    }
  } else {
    return []; // Return an empty array if there are more than one element
  }
}

export function removeOuterBrackets(arr: string[]): string[] {
  let nestingLevel = 0;
  let hasOuterBrackets = false;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === "(") {
      if (nestingLevel === 0) {
        hasOuterBrackets = true;
      }
      nestingLevel++;
    } else if (arr[i] === ")") {
      nestingLevel--;
      if (nestingLevel === 0) {
        hasOuterBrackets = false;
        return arr; // Set to false if nesting level returns to zero more than once
      }
    }
  }
  if (
    hasOuterBrackets &&
    nestingLevel === 1 &&
    arr[arr.length - 1] === ")" &&
    arr[0] === "("
  ) {
    return arr.slice(1, arr.length - 1);
  } else {
    return arr;
  }
}

export function addDeductionStep(
  deductionArr: DeductionStep[],
  obtained: string[],
  rule: string,
  from: string | number
) {
  deductionArr.push({
    obtained: obtained,
    rule: rule,
    from: from,
  });
}

export function searchInArray(mainArray: string[][], targetArray: string[]) {
  const mainUpdatedArray: string[][] = [];
  mainArray.forEach((innerArray: string[]) => {
    const transformedArray: string[] = removeUnderscores(innerArray);

    mainUpdatedArray.push(transformedArray);
  });
  const updatedTargetArray = removeUnderscores(targetArray);
  return mainUpdatedArray.some(
    (subArray) =>
      JSON.stringify(subArray) === JSON.stringify(updatedTargetArray)
  );
}

export function searchIndex(mainArray: string[][], targetArray: string[]) {
  const mainUpdatedArray: string[][] = [];
  mainArray.forEach((innerArray: string[]) => {
    const transformedArray: string[] = removeOutermostBrackets(
      removeUnderscores(innerArray)
    );

    mainUpdatedArray.push(transformedArray);
  });
  const updatedTargetArray = removeOutermostBrackets(
    removeUnderscores(targetArray)
  );
  const index = mainUpdatedArray.findIndex(
    (subArray) =>
      JSON.stringify(subArray) === JSON.stringify(updatedTargetArray)
  );
  return index !== -1 ? index : 0;
}

export function strictSearchInArray(
  mainArray: string[][],
  targetArray: string[]
) {
  return mainArray.some(
    (subArray) => JSON.stringify(subArray) === JSON.stringify(targetArray)
  );
}

export function splitArray(arr: string[], element: string): string[][] {
  let index = arr.indexOf(element);
  let openBracketCount = 0;
  let closedBracketCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      openBracketCount++;
    } else if (arr[i] === ")") {
      closedBracketCount++;
    } else if (arr[i] === element && openBracketCount === closedBracketCount) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    return [...[arr], [""]]; // Element not found, return original array and an empty array
  }

  const before = removeOutermostBrackets(arr.slice(0, index));
  const after = removeOutermostBrackets(arr.slice(index + 1));

  return [before, after];
}

export function convertImplicationToDisjunction(propositionArr: string[]) {
  let proposition = removeOutermostBrackets(propositionArr);

  const [before, after] = splitArray(proposition, "->");
  const beforeOperator = getOperator(before);
  const afterOperator = getOperator(after);

  if (beforeOperator || afterOperator) {
    let negatedBefore;
    let bracketedAfter = addBracketsIfNecessary(after);
    if (!afterOperator) {
      negatedBefore = getBracketedNegation(before);
      return [...negatedBefore, "|", ...after];
    }
    if (!beforeOperator) {
      const negatedBefore = getNegation(before);
      return [...negatedBefore, "|", ...bracketedAfter];
    } else if (beforeOperator && afterOperator) {
      negatedBefore = getBracketedNegation(before);
      return [...negatedBefore, "|", ...bracketedAfter];
    }
  }

  const negatedBefore = getNegation(before);
  return [...negatedBefore, "|", ...after];
}

export function convertDisjunctionToImp(propositionArr: string[]) {
  let proposition = removeOutermostBrackets(propositionArr);

  const [before, after] = splitArray(proposition, "|");
  const beforeOperator = getOperator(before);
  const afterOperator = getOperator(after);

  if (beforeOperator || afterOperator) {
    let negatedBefore;
    let bracketedAfter = addBracketsIfNecessary(after);
    if (!afterOperator) {
      negatedBefore = getBracketedNegation(before);
      return [...negatedBefore, "->", ...after];
    }
    if (!beforeOperator) {
      const negatedBefore = getNegation(before);
      return [...negatedBefore, "->", ...bracketedAfter];
    } else if (beforeOperator && afterOperator) {
      negatedBefore = getBracketedNegation(before);
      return [...negatedBefore, "->", ...bracketedAfter];
    }
  }

  const negatedBefore = getNegation(before);
  return [...negatedBefore, "->", ...after];
}

export function getBracketedNegation(arr: string[]) {
  if (arr.length < 2) {
    let firstElement = arr[0];
    if (firstElement.includes("~")) return [`${firstElement.substring(1)}`];
    return [`~${firstElement}`];
  } else if (arr[0] === "~" && getOperator(arr) === "~") {
    //only remove the negation if it is the main operator i.e., the negation is applied to the entire wff

    // the conditional in return checks whether brackets already exist and if so doesn't add any more.
    // ~( P -> Q) as ( P -> Q ) and not as ((P -> Q))
    return arr[1] !== "(" ? ["(", ...arr.slice(1), ")"] : [...arr.slice(1)];
  } else {
    return ["~", "(", ...arr, ")"];
  }
}

export function checkFurtherSimplification(
  knowledgeBase: string[][],
  premise: string[],
  simplifiableExpressions: string[][]
) {
  const operator = getOperator(premise);
  if (!operator) return undefined;
  const [before, after] = splitArray(premise, operator);
  if (operator === "&") {
    if (getOperator(before) || getOperator(after)) {
      if (!getOperator(after)) return [...before];
      else if (!getOperator(before)) return [...after];
      return [...before, ...after];
    }
  } else {
    if (
      searchInArray(knowledgeBase, before) &&
      searchInArray(knowledgeBase, after)
    ) {
      if (
        searchInArray(simplifiableExpressions, before) ||
        searchInArray(simplifiableExpressions, after)
      ) {
        if (searchInArray(simplifiableExpressions, after)) return [...before];
        if (searchInArray(simplifiableExpressions, before)) return [...after];
        return [...before, ...after];
      }
    }
  }
  return undefined;
}
export function addOneToNumbers(
  input: string | number,
  incrementNum: number = 1
): string {
  let numbers: number[];

  if (typeof input === "number") {
    numbers = [input];
  } else {
    numbers = input.split(",").map(Number);
  }

  const incrementedNumbers = numbers.map((num) => num + incrementNum);
  return incrementedNumbers.join(",");
}

export function changeFromPropertyToStartAtOne(
  input: DeductionStep[],
  incrementNum: number = 1
): DeductionStep[] {
  const updatedArray = input.map((obj) => {
    if (obj.from === "conc") return { ...obj };
    return {
      ...obj,
      from:
        obj.from !== null ? addOneToNumbers(obj.from, incrementNum) : obj.from, //check with null since 0 would be false as well
    };
  });

  return updatedArray;
}

export function prettifyQLOutput(input: DeductionStep[]) {
  const removedUnderscoreInput = removeUnderScoresFromDeductionSteps(input);
  const changedFromPropertyInput = changeFromPropertyToStartAtOne(
    removedUnderscoreInput
  );

  const prettifiedOutput = joinVariablesToQuantifiers(changedFromPropertyInput);
  return prettifiedOutput;
}

function addSpacesForReadability(deductionStepsArr: DeductionStep[]) {
  const updatedArray: DeductionStep[] = deductionStepsArr.map((obj) => {
    const updatedData: string[] = addSpaces(obj.obtained);
    return { ...obj, obtained: updatedData };
  });
  return updatedArray;
}

function joinVariablesToQuantifiers(deductionStepsArr: DeductionStep[]) {
  const updatedArray: DeductionStep[] = deductionStepsArr.map((obj) => {
    const updatedData: string[] = joinVarToQuantifier(obj.obtained);
    return { ...obj, obtained: updatedData };
  });
  return updatedArray;
}

function removeUnderScoresFromDeductionSteps(
  deductionStepsArr: DeductionStep[]
) {
  const updatedArray: DeductionStep[] = deductionStepsArr.map((obj) => {
    const updatedData: string[] = removeUnderscores(obj.obtained);
    return { ...obj, obtained: updatedData };
  });
  return updatedArray;
}

export function getTranspose(proposition: string[]) {
  if (checkIfContainsQuantifier(proposition)) return proposition;
  const operator = getOperator(proposition);
  if (operator !== "->" && operator !== "|") return proposition;
  else if (operator === "->") {
    const [before, after] = splitArray(proposition, "->");
    const negatedBefore = getNegation(before);
    const negatedAfter = getNegation(after);

    return [...negatedAfter, "->", ...negatedBefore];
  } else return proposition;
}

function checkIfContainsQuantifier(premise: string[]) {
  for (let i = 0; i < premise.length; i++) {
    const element = premise[i];
    if (element.includes("\u2203") || element.includes("\u2200")) return true;
  }
  return false;
}

export function isOperator(value: string): boolean {
  const operators = ["&", "->", "|", "~", "<->"]; // Add more operators as needed

  return operators.includes(value);
}

export function addBracketsIfNecessary(proposition: string[]): string[] {
  const operator = getOperator(proposition);
  if (!operator) return proposition;
  if (operator === "~") return proposition;
  else return ["(", ...proposition, ")"];
}

export function areStringArraysEqual(
  array1: string[],
  array2: string[]
): boolean {
  const updatedArrayOne = removeOutermostBrackets(removeUnderscores(array1));
  const updatedArrayTwo = removeOuterBrackets(removeUnderscores(array2));

  // Check if the arrays have the same length
  if (updatedArrayOne.length !== updatedArrayTwo.length) {
    return false;
  }

  // Compare each element of the arrays
  for (let i = 0; i < updatedArrayOne.length; i++) {
    if (updatedArrayOne[i] !== updatedArrayTwo[i]) {
      return false;
    }
  }

  // All elements are equal
  return true;
}

export function addToSimplifiableExpressions(
  knowledgeBase: string[][],
  simplifiableExpressions: string[][]
) {
  /**
   * It checks if the knowledgebase
   * has a new non atomic sentence
   * and adds it into the simplifiable expressions
   */
  for (let k = 0; k < knowledgeBase.length; k++) {
    const premise = knowledgeBase[k];
    if (
      getOperator(premise) &&
      !searchInArray(simplifiableExpressions, premise)
    ) {
      simplifiableExpressions.push(premise);
    }
  }
}

function removeUnderscores(arr: string[]): string[] {
  const updatedArray: string[] = [];
  for (const element of arr) {
    const updatedElement = element.replace(/_/g, "");
    updatedArray.push(updatedElement);
  }

  return updatedArray;
}

function joinVarToQuantifier(arr: string[]): string[] {
  const updatedArray: string[] = [];

  for (const element of arr) {
    if (element.includes("\u2203") || element.includes("\u2200")) {
      const updatedElement = element.replace(/[()]/g, "");
      updatedArray.push(updatedElement);
    } else updatedArray.push(element);
  }

  return updatedArray;
}

function addSpaces(arr: string[]): string[] {
  const updatedArray: string[] = [];

  for (const element of arr) {
    updatedArray.push(element);
    updatedArray.push(" ");
  }

  return updatedArray;
}

export function checkIfIsWff(premise: string[]) {
  const premiseStr = premise.join("");

  const errors = checkInputForErrors(premiseStr);
  const QLErrors = checkQLInputForErrors(premiseStr, false);

  return errors && !QLErrors ? false : true;
}

/**
 * Gets both cases i.e., four wffs
 * in pairs from which a negated biconditional can be inferred
 *
 * ~ (P -> Q) can be inferred from ((~P -> Q) & (Q -> ~P)) || ((P -> ~Q) & (~Q -> P))
 *
 *
 * @param premise - The biconditional which is to be inferred
 * @returns - four wffs representing the two cases from which to infer the biconditional
 */
export function getNegatedBiconditionalCasesToExist(
  premise: string[]
): string[][] {
  const [firstPredicate, secondPredicate] = splitArray(premise, "<->");
  const negatedFirstPredicate = addBracketsIfNecessary(
    getTopLevelNegation(firstPredicate)
  );
  const negatedSecondPredicate = addBracketsIfNecessary(
    getTopLevelNegation(secondPredicate)
  );

  const bracketedFirstPredicate = addBracketsIfNecessary(firstPredicate);
  const bracketedSecondPredicate = addBracketsIfNecessary(secondPredicate);

  const firstCasePartOne = [
    ...bracketedFirstPredicate,
    "->",
    ...negatedSecondPredicate,
  ];
  const firstCasePartTwo = [
    ...bracketedSecondPredicate,
    "->",
    ...negatedFirstPredicate,
  ];

  const secondCasePartOne = [
    ...negatedFirstPredicate,
    "->",
    ...bracketedSecondPredicate,
  ];
  const secondCasePartTwo = [
    ...negatedSecondPredicate,
    "->",
    ...bracketedFirstPredicate,
  ];
  return [
    firstCasePartOne,
    firstCasePartTwo,
    secondCasePartOne,
    secondCasePartTwo,
  ];
}

/**
 * This function returns a bracketed negation if the
 * premise passed in is not a atomic proposition otherwise
 * it negates it.
 *
 */
export function getTopLevelNegation(premise: string[]) {
  // conditional check to not infer the DeMorgan from the negation
  // and hence, apply bracketed negation if an operator is present
  // in the wff
  const operator = getOperator(premise);
  const negatedPremise = operator
    ? getBracketedNegation(premise)
    : getNegation(premise);

  return negatedPremise;
}

export function getKbFromDS(deductionSteps: DeductionStep[]): string[][] {
  return deductionSteps.map((step) => step.obtained);
}

// only get those steps that can be used
export function getUsableKbFromDS(deductionSteps: DeductionStep[]): string[][] {
  const filteredDeductionSteps = deductionSteps.filter(
    (premise) => !premise.show
  );
  return filteredDeductionSteps.map((step) => step.obtained);
}

export function getSearchIndexInDS(
  deductionSteps: DeductionStep[],
  targetStep: string[]
): number {
  const index = deductionSteps.findIndex(
    (step) =>
      (!step.show || step.closed) &&
      areStringArraysEqual(
        removeOuterBrackets(removeUnderscores(step.obtained)),
        removeOuterBrackets(removeUnderscores(targetStep))
      )
  );

  return index !== -1 ? index : 0;
}

export function searchInDS(
  deductionSteps: DeductionStep[],
  targetArray: string[]
): boolean {
  if (!deductionSteps.length) return false;
  const mainUpdatedArray: DeductionStep[] = deductionSteps.map((step) => ({
    ...step,
    obtained: removeUnderscores(step.obtained),
  }));

  const updatedTargetArray = removeUnderscores(targetArray);

  return mainUpdatedArray.some(
    (subArray) =>
      JSON.stringify(subArray.obtained) ===
        JSON.stringify(updatedTargetArray) && !subArray.show
  );
}

export function searchIfExistsAsShow(
  deductionSteps: DeductionStep[],
  targetArray: string[]
): boolean {
  if (!deductionSteps.length) return false;
  const mainUpdatedArray: DeductionStep[] = deductionSteps.map((step) => ({
    ...step,
    obtained: removeUnderscores(step.obtained),
  }));

  const updatedTargetArray = removeUnderscores(targetArray);

  return mainUpdatedArray.some(
    (subArray) =>
      JSON.stringify(subArray.obtained) ===
        JSON.stringify(updatedTargetArray) && subArray.show
  );
}

export function removePremiseSteps(
  deductionSteps: DeductionStep[]
): DeductionStep[] {
  return deductionSteps.filter((step) => step.rule !== "premise");
}

export function convertKBToDeductionSteps(arrays: string[][]): DeductionStep[] {
  return arrays.map((array) => ({
    obtained: array,
    rule: "premise",
    from: 0,
  }));
}

export function isPremiseInQuantifierEnclosure(premise: string[]): boolean {
  if (premise.length === 0) return false;
  const containsQuantifier = premise.some(
    (el) => el.includes("\u2203") || el.includes("\u2200")
  );

  if (!containsQuantifier) return false;
  const operator = getOperator(premise);
  if ((!operator || operator === "~") && premise.length <= 3) return true;
  const firstOpeningBracket = premise.indexOf("(");
  const [before, after] = splitArray(premise, "(");
  const lastElement = premise[premise.length - 1];
  const hasClosingBracket = lastElement === ")";

  if (!hasClosingBracket && !operator) return true;
  if (!hasClosingBracket) return false;

  const supposedOperator = getOperator(before);
  const beforeOperator = supposedOperator && supposedOperator !== "~";

  const areBracketsBalanced = isBalancedPair(
    premise.slice(firstOpeningBracket)
  );

  return !beforeOperator && areBracketsBalanced;
}

function isBalancedPair(brackets: string[]): boolean {
  if (brackets.length < 2) {
    return false;
  }

  let openCount = 0;

  if (brackets[0] !== "(" || brackets[brackets.length - 1] !== ")") {
    return false;
  }

  for (let i = 0; i < brackets.length; i++) {
    if (brackets[i] === "(") {
      openCount++;
    } else if (brackets[i] === ")") {
      openCount--;
    }

    if (openCount === 0 && i !== brackets.length - 1) {
      return false;
    }
  }

  return openCount === 0;
}
