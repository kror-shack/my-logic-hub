import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { DeductionStep } from "../../../types/sharedTypes";

export const pushLocallyDeducedPremise = (
  premise: string[],
  targetArray: string[][],
  secondTargetArray: string[][]
) => {
  if (!targetArray.includes(premise)) targetArray.push(premise);
  if (!secondTargetArray.includes(premise)) secondTargetArray.push(premise);
};

export const addMLDeductionStep = (
  deductionArr: ModernLogicDeductionStep[],
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
  steps: ModernLogicDeductionStep[],
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
