import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { DeductionStep } from "../../../types/sharedTypes";
import {
  addBracketsIfNecessary,
  areStringArraysEqual,
  createNegation,
  getBracketedNegation,
  getOperator,
  getTopLevelNegation,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import getNegation from "../../sharedFunctions/getNegation/getNegation";

export const pushLocallyDeducedPremise = (
  premise: string[],
  targetArray: string[][],
  secondTargetArray: string[][]
) => {
  if (!targetArray.includes(premise)) targetArray.push(premise);
  if (!secondTargetArray.includes(premise)) secondTargetArray.push(premise);
};

export const addMLDeductionStep = (
  deductionArr: DeductionStep[],
  obtained: string[],
  rule: string | null,
  from: number | string | null,
  show = false,
  closed = null
) => {
  deductionArr.push({
    obtained: obtained,
    rule: rule,
    from: from,
    show: show,
    closed: closed,
  });
};

export const convertToModernLogicDeductions = (
  steps: DeductionStep[]
): ModernLogicDeductionStep[] => {
  return steps.map((step) => ({
    obtained: step.obtained,
    rule: step.rule,
    from: step.from,
    show: false,
    closed: null,
  }));
};

export const closeDeductionStep = (
  steps: DeductionStep[],
  obtainedValue: string[]
): void => {
  steps.forEach((step) => {
    if (
      step.obtained.length === obtainedValue.length &&
      step.obtained.every((val, index) => val === obtainedValue[index]) &&
      step.show === true
    ) {
      step.closed = true;
    }
  });
};

export const existsInMLDS = (
  array: ModernLogicDeductionStep[],
  element: ModernLogicDeductionStep
): boolean => {
  return array.some(
    (item) =>
      areStringArraysEqual(item.obtained, element.obtained) &&
      item.rule === element.rule &&
      item.from === element.from &&
      item.show === element.show &&
      item.closed === element.closed
  );
};

//gets negation w/o distributing the negation with the premise
export const getNegationWithoutDeMorgan = (premise: string[]) => {
  const operator = getOperator(premise);
  if (!operator) {
    const negatedStatement = createNegation(premise);
    return negatedStatement;
  } else if (operator === "~") {
    return getNegation(premise);
  } else {
    const [before, after] = splitArray(premise, operator);

    const negatedBefore = getBracketedNegation(before);
    const negatedAfter = getBracketedNegation(after);

    if (operator) {
      switch (operator) {
        case "|":
          return [...negatedBefore, "->", ...negatedAfter];

        case "->":
          return [...negatedBefore, "|", ...negatedAfter];
      }
    }
    const negatedStatement = createNegation(premise);

    return negatedStatement;
  }
};

export const matchArrayLengthsByAddingEmptyStrings = (
  first: string[][],
  second: string[][]
): string[][] => {
  let secondIndex = 0;
  return first.map((firstElement) => {
    if (
      secondIndex < second.length &&
      JSON.stringify(firstElement) === JSON.stringify(second[secondIndex])
    ) {
      return second[secondIndex++];
    } else {
      return [""];
    }
  });
};

export const getSimplifiableExpressions = (
  knowledgeBase: string[][]
): string[][] => {
  return knowledgeBase.filter(
    (premise) =>
      getOperator(premise) || premise.some((element) => element.includes("~~"))
  );
};

export const removeEmptyArrays = (array: string[][]): string[][] => {
  return array.filter((subArray) => subArray[0] !== "");
};

export const getOperatorByIgnoringNegations = (
  input: string[]
): string | null => {
  const operators = ["<->", "->", "&", "|"];
  let mainOperator: string | null = null;
  let negationDepth = 0;

  for (let i = 0; i < input.length; i++) {
    const token = input[i];

    if (token === "~") {
      negationDepth++;
    } else if (operators.includes(token)) {
      const before = input.slice(0, i);
      const after = input.slice(i + 1);

      // Check if there are unmatched parentheses around the operator
      const hasUnmatchedParens =
        (before.includes("(") && !before.includes(")")) ||
        (after.includes(")") && !after.includes("("));

      if (negationDepth % 2 === 0 && !hasUnmatchedParens) {
        // Ignore negations that don't apply to the entire expression
        mainOperator = token;
      } else {
        // Return negation as the main operator if it applies to the whole expression
        mainOperator = "~";
      }
      break;
    }
  }

  return mainOperator;
};

export const getDoubleNegation = (premise: string): string[] => {
  if (premise.length >= 2 && premise[0] === "~" && premise[1] === "~") {
    return [premise.slice(2)];
  }
  return ["~", "~", premise];
};

export const markUnusableDeductionSteps = (
  deductionStepsArr: DeductionStep[]
) => {
  let steps = [...deductionStepsArr];
  let currentClose = false;
  for (let i = 0; i < steps.length; i++) {
    const currentStep = steps[i];

    if (currentStep.show && currentStep.closed) {
      if (currentClose) currentStep.nonUsable = true;
      currentClose = true;
    } else if (currentStep.show && !currentStep.closed) {
      currentClose = false;
    } else if (currentClose) {
      currentStep.nonUsable = true;
    }
  }
  return steps;
};
