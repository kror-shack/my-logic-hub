import { DeductionStep } from "../../../../types/sharedTypes";
import {
  addDeductionStep,
  convertImplicationToDisjunction,
  getOperator,
  getSearchIndexInDS,
  splitArray,
} from "../../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import getNegation from "../../../sharedFunctions/getNegation/getNegation";
import checkWithQuantifiableConclusion from "../checkWithQuantifiableConclusion";

export const handleQuantificationalAndOperatorCase = (
  deductionStepsArr: DeductionStep[],
  instantiatedConc: string[],
  conclusion: string[],
  usedSubstitutes: string[]
) => {
  const operator = getOperator(instantiatedConc);
  if (!operator) return;
  const [before, after] = splitArray(instantiatedConc, operator);

  const beforeDS = checkWithQuantifiableConclusion(
    deductionStepsArr,
    before,
    usedSubstitutes
  );
  if (beforeDS) {
    const afterDS = checkWithQuantifiableConclusion(
      beforeDS,
      after,
      usedSubstitutes
    );

    if (afterDS) {
      addDeductionStep(
        afterDS,
        instantiatedConc,
        "Conjunction",
        `${getSearchIndexInDS(afterDS, before)}, ${getSearchIndexInDS(
          afterDS,
          after
        )}`
      );
      addDeductionStep(
        afterDS,
        conclusion,
        "Existential Generalization",
        `${getSearchIndexInDS(afterDS, instantiatedConc)}`
      );
      return afterDS;
    }
  }
};

export const handleQuantificationalOrOperatorCase = (
  deductionStepsArr: DeductionStep[],
  instantiatedConc: string[],
  conclusion: string[],
  usedSubstitutes: string[]
) => {
  const operator = getOperator(instantiatedConc);
  if (!operator) return;
  const [before, after] = splitArray(instantiatedConc, operator);

  let existingElementIndex = 0;
  let existingDS: DeductionStep[] | false = [];

  const beforeDS = checkWithQuantifiableConclusion(
    deductionStepsArr,
    before,
    usedSubstitutes
  );
  if (beforeDS) {
    existingElementIndex = getSearchIndexInDS(beforeDS, before);
    existingDS = beforeDS;
  }
  // only look for the element after if the before is not found
  if (!beforeDS) {
    const afterDS = checkWithQuantifiableConclusion(
      deductionStepsArr,
      after,
      usedSubstitutes
    );
    if (afterDS) {
      existingElementIndex = getSearchIndexInDS(afterDS, after);
      existingDS = afterDS;
    }
  }

  // since either exising before or after can be used to infer the conc
  // i.e., P | Q to get P | Q via addition
  if (existingDS && existingElementIndex) {
    addDeductionStep(
      existingDS,
      instantiatedConc,
      "Addition",
      existingElementIndex
    );

    addDeductionStep(
      existingDS,
      conclusion,
      "Existential Generalization",
      `${getSearchIndexInDS(existingDS, instantiatedConc)}`
    );
    return existingDS;
  }
};

export const handleQuantificationalImplicationOperatorCase = (
  deductionStepsArr: DeductionStep[],
  instantiatedConc: string[],
  conclusion: string[],
  usedSubstitutes: string[]
) => {
  const operator = getOperator(instantiatedConc);
  if (!operator) return;
  const [before, after] = splitArray(instantiatedConc, operator);
  const negatedBefore = getNegation(before);

  let existingElementIndex = 0;
  let existingDS: DeductionStep[] | false = [];

  const negatedBeforeDS = checkWithQuantifiableConclusion(
    deductionStepsArr,
    negatedBefore,
    usedSubstitutes
  );
  if (negatedBeforeDS) {
    existingElementIndex = getSearchIndexInDS(negatedBeforeDS, negatedBefore);

    existingDS = negatedBeforeDS;
  }

  if (!negatedBeforeDS) {
    const afterDS = checkWithQuantifiableConclusion(
      deductionStepsArr,
      after,
      usedSubstitutes
    );

    if (afterDS) {
      existingElementIndex = getSearchIndexInDS(afterDS, after);
      existingDS = afterDS;
    }

    const impToDisj = convertImplicationToDisjunction(instantiatedConc);
    addDeductionStep(existingDS, impToDisj, "Addition", existingElementIndex);

    addDeductionStep(
      existingDS,
      instantiatedConc,
      "Material Implication",
      getSearchIndexInDS(existingDS, impToDisj)
    );

    addDeductionStep(
      existingDS,
      conclusion,
      "Existential Generalization",
      `${getSearchIndexInDS(existingDS, instantiatedConc)}`
    );
    return afterDS;
  }
};

export const handleQuantificationalBiCondOperatorCase = (
  deductionStepsArr: DeductionStep[],
  instantiatedConc: string[],
  conclusion: string[],
  usedSubstitutes: string[]
) => {
  const operator = getOperator(instantiatedConc);
  if (!operator) return;
  const [before, after] = splitArray(instantiatedConc, operator);
  const eliminatedBiConditional = [
    ...["(", ...before, "->", ...after, ")"],
    "&",
    ...["(", ...after, "->", ...before, ")"],
  ];
  const eliminatedBiConditionalDS = checkWithQuantifiableConclusion(
    deductionStepsArr,
    eliminatedBiConditional,
    usedSubstitutes
  );
  if (eliminatedBiConditionalDS) {
    addDeductionStep(
      eliminatedBiConditionalDS,
      instantiatedConc,
      "Biconditional Introuduction",
      getSearchIndexInDS(eliminatedBiConditionalDS, eliminatedBiConditional)
    );

    addDeductionStep(
      eliminatedBiConditionalDS,
      conclusion,
      "Existential Generalization",
      `${getSearchIndexInDS(eliminatedBiConditionalDS, instantiatedConc)}`
    );
    return eliminatedBiConditionalDS;
  }
};
