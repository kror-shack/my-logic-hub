import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import convertToReversePolishNotation from "../../HelperFunctions/convertToReversePolishNotation/convertToReversePolishNotation";
import getNegation from "../getNegation/getNegation";

function getOperator(arr: string[]): string | undefined {
  const rpn = convertToReversePolishNotation(arr);
  if (!rpn) return undefined;
  return isOperator(rpn[rpn.length - 1]) ? rpn[rpn.length - 1] : undefined;
}

function removeOutermostBrackets(arr: string[]): string[] {
  if (arr.length >= 2 && arr[0] === "~") {
    if (arr[1] === "(" && arr[arr.length - 1] === ")" && arr.length === 3) {
      return ["~", arr[2]];
    } else {
      return arr;
    }
  } else if (arr.length >= 2 && arr[0] === "(" && arr[arr.length - 1] === ")") {
    return arr.slice(1, arr.length - 1);
  } else {
    return arr;
  }
}

// change it to make it get the main operator
function splitArray(arr: string[], element: string): string[][] {
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

function isOperator(value: string): boolean {
  const operators = ["&", "->", "|", "~"]; // Add more operators as needed

  return operators.includes(value);
}

function createNegation(arr: string[]) {
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

function addDeductionStep(
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

// knowledge base is kept as a  string[][] because otherwise
// includes function would not be able to tell ~p and p apart
// so the complexity remains almost the same
function searchInArray(mainArray: string[][], targetArray: string[]) {
  return mainArray.some(
    (subArray) => JSON.stringify(subArray) === JSON.stringify(targetArray)
  );
}

function searchIndex(mainArray: string[][], targetArray: string[]) {
  const index = mainArray.findIndex(
    (subArray) => JSON.stringify(subArray) === JSON.stringify(targetArray)
  );
  return index !== -1 ? index : 0;
}

function convertImplicationToDisjunction(proposition: string[]) {
  const [before, after] = splitArray(proposition, "->");
  const beforeOperator = getOperator(before);
  if (beforeOperator) {
    const negatedBefore = getBracketedNegation(before);
    return [...negatedBefore, "|", ...after];
  }
  const negatedBefore = getNegation(before);
  return [...negatedBefore, "|", ...after];
}

function getBracketedNegation(arr: string[]) {
  if (arr.length < 2) {
    let firstElement = arr[0];
    return [`~${firstElement}`];
  } else if (arr[0] === "~") {
    return ["(", ...arr.slice(1), ")"];
  } else {
    return ["~", "(", ...arr, ")"];
  }
}

function checkFurtherSimplification(
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
function addOneToNumbers(input: string | number): string {
  let numbers: number[];

  if (typeof input === "number") {
    numbers = [input];
  } else {
    numbers = input.split(",").map(Number);
  }

  const incrementedNumbers = numbers.map((num) => num + 1);
  return incrementedNumbers.join(",");
}

// to make it
function changeFromPropertyToStartAtOne(
  input: DeductionStep[]
): DeductionStep[] {
  const updatedArray = input.map((obj) => {
    return { ...obj, from: addOneToNumbers(obj.from) };
  });

  return updatedArray;
}

export {
  getOperator,
  removeOutermostBrackets,
  splitArray,
  isOperator,
  createNegation,
  addDeductionStep,
  searchInArray,
  searchIndex,
  convertImplicationToDisjunction,
  getBracketedNegation,
  checkFurtherSimplification,
  changeFromPropertyToStartAtOne,
};
