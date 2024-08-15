import { DeductionStep, DerivedRules } from "../../../../types/sharedTypes";
import {
  convertDisjunctionToImp,
  getOperator,
  getSearchIndexInDS,
  addDeductionStep,
  convertImplicationToDisjunction,
  getNegatedBiconditionalCasesToExist,
  removeOuterBrackets,
  searchInArray,
  splitArray,
  searchInDS,
  addBracketsIfNecessary,
  getTopLevelNegation,
} from "../../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkForHypotheticalSyllogism from "../../../sharedFunctions/checkForHypotheticalSyllogism/checkForHypotheticalSyllogism";
import getDeMorganTransform from "../../../sharedFunctions/getDeMorganTransform/getDeMorganTransform";
import getNegation from "../../../sharedFunctions/getNegation/getNegation";
import checkWithQuantifiableConclusion from "../checkWithQuantifiableConclusion";

export const handleQuantificationalAndOperatorCase = (
  deductionStepsArr: DeductionStep[],
  instantiatedConc: string[],

  usedSubstitutes: string[],
  derivedRules: DerivedRules
) => {
  const operator = getOperator(instantiatedConc);
  if (!operator) return;
  const [before, after] = splitArray(instantiatedConc, operator);

  const beforeDS = checkWithQuantifiableConclusion(
    before,
    deductionStepsArr,
    usedSubstitutes,
    derivedRules
  );
  if (beforeDS) {
    const afterDS = checkWithQuantifiableConclusion(
      after,
      beforeDS,
      usedSubstitutes,
      derivedRules
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

      return afterDS;
    }
  }
};

export const handleQuantificationalOrOperatorCase = (
  deductionStepsArr: DeductionStep[],
  instantiatedConc: string[],
  usedSubstitutes: string[],
  derivedRules: DerivedRules
) => {
  const operator = getOperator(instantiatedConc);
  if (!operator) return;
  const [before, after] = splitArray(instantiatedConc, operator);

  let existingElementIndex = 0;
  let existingDS: DeductionStep[] | false = [];

  const beforeDS = checkWithQuantifiableConclusion(
    before,
    deductionStepsArr,
    usedSubstitutes,
    derivedRules
  );
  if (beforeDS) {
    existingElementIndex = getSearchIndexInDS(beforeDS, before);
    existingDS = beforeDS;
  }
  // only look for the element after if the before is not found
  if (!beforeDS) {
    const afterDS = checkWithQuantifiableConclusion(
      after,
      deductionStepsArr,
      usedSubstitutes,
      derivedRules
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

    return existingDS;
  }
};

export const handleQuantificationalImplicationOperatorCase = (
  deductionStepsArr: DeductionStep[],
  instantiatedConc: string[],
  usedSubstitutes: string[],
  derivedRules: DerivedRules
) => {
  const operator = getOperator(instantiatedConc);
  if (!operator) return;
  const [before, after] = splitArray(instantiatedConc, operator);
  const negatedBefore = getNegation(before);

  let existingElementIndex = 0;
  let existingDS: DeductionStep[] | false = [];

  const negatedBeforeDS = checkWithQuantifiableConclusion(
    negatedBefore,
    deductionStepsArr,
    usedSubstitutes,
    derivedRules
  );
  if (negatedBeforeDS) {
    existingElementIndex = getSearchIndexInDS(negatedBeforeDS, negatedBefore);

    existingDS = negatedBeforeDS;
  }

  if (!negatedBeforeDS) {
    const afterDS = checkWithQuantifiableConclusion(
      after,
      deductionStepsArr,
      usedSubstitutes,
      derivedRules
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

    return afterDS;
  }
};

export const handleQuantificationalBiCondOperatorCase = (
  deductionStepsArr: DeductionStep[],
  instantiatedConc: string[],
  usedSubstitutes: string[],
  derivedRules: DerivedRules
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
    eliminatedBiConditional,
    deductionStepsArr,
    usedSubstitutes,
    derivedRules
  );
  if (eliminatedBiConditionalDS) {
    addDeductionStep(
      eliminatedBiConditionalDS,
      instantiatedConc,
      "Biconditional Introuduction",
      getSearchIndexInDS(eliminatedBiConditionalDS, eliminatedBiConditional)
    );

    return eliminatedBiConditionalDS;
  }
};
