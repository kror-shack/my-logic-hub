import { DeductionStep } from "../../../types/sharedTypes";
import getNegation from "../../sharedFunctions/getNegation/getNegation";
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
  return mainArray.some(
    (subArray) => JSON.stringify(subArray) === JSON.stringify(targetArray)
  );
}

export function searchIndex(mainArray: string[][], targetArray: string[]) {
  const index = mainArray.findIndex(
    (subArray) => JSON.stringify(subArray) === JSON.stringify(targetArray)
  );
  return index !== -1 ? index : 0;
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
  } else if (arr[0] === "~") {
    return ["(", ...arr.slice(1), ")"];
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

// to make it
export function changeFromPropertyToStartAtOne(
  input: DeductionStep[],
  incrementNum: number = 1
): DeductionStep[] {
  const updatedArray = input.map((obj) => {
    return { ...obj, from: addOneToNumbers(obj.from, incrementNum) };
  });

  return updatedArray;
}

export function getTranspose(proposition: string[]) {
  const operator = getOperator(proposition);
  if (operator !== "->" && operator !== "|") return proposition;
  else if (operator === "->") {
    const [before, after] = splitArray(proposition, "->");
    const negatedBefore = getNegation(before);
    const negatedAfter = getNegation(after);

    return [...negatedAfter, "->", ...negatedBefore];
  } else return proposition;
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
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Compare each element of the arrays
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  // All elements are equal
  return true;
}