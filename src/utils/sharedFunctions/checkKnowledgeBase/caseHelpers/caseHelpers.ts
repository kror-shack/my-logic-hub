import { DeductionStep } from "../../../../types/sharedTypes";
import {
  addDeductionStep,
  convertDisjunctionToImp,
  convertImplicationToDisjunction,
  getNegatedBiconditionalCasesToExist,
  getOperator,
  removeOuterBrackets,
  searchInArray,
  getSearchIndexInDS,
  splitArray,
  searchInDS,
} from "../../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkForHypotheticalSyllogism from "../../checkForHypotheticalSyllogism/checkForHypotheticalSyllogism";
import getDeMorganTransform from "../../getDeMorganTransform/getDeMorganTransform";
import checkKnowledgeBase from "../checkKnowledgeBase";

export const handleOrOperatorCase = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  const operator = getOperator(premise);
  if (!operator) return false;
  const [before, after] = splitArray(premise, operator);

  const disjToImp = convertDisjunctionToImp(premise);

  const existingElement = searchInDS(deductionStepsArr, before)
    ? before
    : searchInDS(deductionStepsArr, after)
    ? after
    : false;
  const elementExists =
    existingElement && !searchInDS(deductionStepsArr, premise);
  if (elementExists) {
    addDeductionStep(
      deductionStepsArr,
      premise,
      "Addition",
      `${getSearchIndexInDS(deductionStepsArr, existingElement)}`
    );

    return deductionStepsArr;
  }
  const disjToImpExists = searchInDS(deductionStepsArr, disjToImp);
  if (disjToImpExists) {
    addDeductionStep(
      deductionStepsArr,
      premise,
      "Material Implication",
      `${getSearchIndexInDS(deductionStepsArr, disjToImp)}`
    );

    return deductionStepsArr;
  } else {
    const simplifiableElement = getOperator(before)
      ? getOperator(after)
        ? [before, after]
        : [before]
      : getOperator(after)
      ? [after]
      : undefined;
    if (simplifiableElement) {
      for (let i = 0; i < simplifiableElement?.length; i++) {
        const simplifiableElementDeductionSteps = checkKnowledgeBase(
          simplifiableElement[i],
          deductionStepsArr
        );
        if (simplifiableElementDeductionSteps) {
          const premiseExistsInKb = searchInDS(
            simplifiableElementDeductionSteps,
            premise
          );
          if (!premiseExistsInKb) {
            addDeductionStep(
              simplifiableElementDeductionSteps,
              premise,
              "Addition",
              `${getSearchIndexInDS(
                simplifiableElementDeductionSteps,
                simplifiableElement[i]
              )}`
            );

            return simplifiableElementDeductionSteps;
          }
        }
      }
    }
  }
  return false;
};

export const handleAndOperatorCase = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  const operator = getOperator(premise);
  if (!operator) return false;
  const [before, after] = splitArray(premise, operator);
  const existingBefore = searchInDS(deductionStepsArr, before);
  const exisitngAfter = searchInDS(deductionStepsArr, after);
  const beforeAndAfterExists =
    existingBefore && exisitngAfter && !searchInDS(deductionStepsArr, premise);
  if (beforeAndAfterExists) {
    console.log("🚀 ~ beforeAndAfterExists:", beforeAndAfterExists);
    addDeductionStep(
      deductionStepsArr,
      premise,
      "Conjunction",
      `${getSearchIndexInDS(deductionStepsArr, before)},${getSearchIndexInDS(
        deductionStepsArr,
        after
      )}`
    );
    console.log(JSON.stringify(deductionStepsArr));
    return deductionStepsArr;
  } else {
    const simplifiableElements = getOperator(before)
      ? getOperator(after)
        ? [before, after]
        : [before]
      : getOperator(after)
      ? [after]
      : undefined;
    if (simplifiableElements) {
      const beforeDeductionSteps = checkKnowledgeBase(
        before,
        deductionStepsArr
      );
      if (beforeDeductionSteps) {
        const afterDeductionSteps = checkKnowledgeBase(
          after,
          beforeDeductionSteps
        );
        if (afterDeductionSteps) {
          const premiseDeductionsSteps = checkKnowledgeBase(
            premise,
            afterDeductionSteps
          );

          if (premiseDeductionsSteps) return premiseDeductionsSteps;
        }
      }
    }
    return false;
  }
};

export const handleConditionalOperatorCase = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  const impToDisj = convertImplicationToDisjunction(premise);
  const bracketedPremise = convertDisjunctionToImp(impToDisj);
  const impToDjisDeductionSteps = checkKnowledgeBase(
    impToDisj,
    deductionStepsArr
  );
  if (impToDjisDeductionSteps) {
    addDeductionStep(
      impToDjisDeductionSteps,
      bracketedPremise,
      "Material Implication",
      `${getSearchIndexInDS(impToDjisDeductionSteps, impToDisj)}`
    );

    return impToDjisDeductionSteps;
  }
  const hypotheticalSyllogismDeductionSteps = checkForHypotheticalSyllogism(
    premise,
    deductionStepsArr
  );

  if (hypotheticalSyllogismDeductionSteps) {
    return hypotheticalSyllogismDeductionSteps;
  }
  return false;
};

export const handleBiConditionalOperatorCase = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  const operator = getOperator(premise);
  if (!operator) return false;
  const [before, after] = splitArray(premise, operator);
  const eliminatedBiconditional = [
    ...["(", ...before, "->", ...after, ")"],
    "&",
    ...["(", ...after, "->", ...before, ")"],
  ];

  const eliminatedBiconditionalSteps = checkKnowledgeBase(
    eliminatedBiconditional,
    deductionStepsArr
  );
  if (eliminatedBiconditionalSteps) {
    addDeductionStep(
      eliminatedBiconditionalSteps,
      premise,
      "Biconditional Introduction",
      `${getSearchIndexInDS(
        eliminatedBiconditionalSteps,
        eliminatedBiconditional
      )}`
    );

    return eliminatedBiconditionalSteps;
  }
  return false;
};

export const handleNegatedBiConditionalCase = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  const secondPremise = [...premise];
  const secondaryPremise = removeOuterBrackets(secondPremise.slice(1));

  const [
    firstCasePartOne,
    firstCasePartTwo,
    secondCasePartOne,
    secondCasePartTwo,
  ] = getNegatedBiconditionalCasesToExist(secondaryPremise);

  const firstCasePartOneDS = checkKnowledgeBase(
    firstCasePartOne,
    deductionStepsArr
  );
  if (firstCasePartOneDS) {
    const firstCaseSecondPartDS = checkKnowledgeBase(
      firstCasePartTwo,
      firstCasePartOneDS
    );
    if (firstCaseSecondPartDS) {
      addDeductionStep(
        firstCaseSecondPartDS,
        premise,
        "Biconditional Introduction",
        `${getSearchIndexInDS(
          firstCaseSecondPartDS,
          firstCasePartOne
        )}, ${getSearchIndexInDS(firstCaseSecondPartDS, firstCasePartTwo)}`
      );
      return firstCaseSecondPartDS;
    }
  }
  const secondCasePartOneDS = checkKnowledgeBase(
    secondCasePartOne,
    deductionStepsArr
  );
  if (secondCasePartOneDS) {
    const secondCasePartTwoDS = checkKnowledgeBase(
      secondCasePartTwo,
      secondCasePartOneDS
    );
    if (secondCasePartTwoDS) {
      addDeductionStep(
        secondCasePartTwoDS,
        premise,
        "Biconditional Introduction",
        `${getSearchIndexInDS(
          secondCasePartTwoDS,
          secondCasePartOne
        )}, ${getSearchIndexInDS(secondCasePartTwoDS, secondCasePartTwo)}`
      );

      return secondCasePartTwoDS;
    }
  }
  return false;
};

export const handleNegatedDeMorganCase = (
  premise: string[],
  impToDisj: string[],
  secondPremise: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];
  const deMorganized =
    impToDisj.length > 1
      ? getDeMorganTransform(impToDisj)
      : getDeMorganTransform(secondPremise);

  const deMorganDeductionSteps = checkKnowledgeBase(
    deMorganized,
    deductionStepsArr
  );
  if (deMorganDeductionSteps) {
    const implicationExists = impToDisj.length > 1;

    impToDisj = impToDisj.length > 1 ? impToDisj : premise;
    addDeductionStep(
      deMorganDeductionSteps,
      impToDisj,
      "DeMorgan Theorem",
      `${getSearchIndexInDS(deMorganDeductionSteps, deMorganized)}`
    );

    if (implicationExists) {
      addDeductionStep(
        deMorganDeductionSteps,
        premise,
        "Material Implication",
        `${getSearchIndexInDS(deMorganDeductionSteps, impToDisj)}`
      );
    }

    return deMorganDeductionSteps;
  }
  return false;
};
