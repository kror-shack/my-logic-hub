import { DeductionStep } from "../../../../types/sharedTypes";
import {
  addDeductionStep,
  convertDisjunctionToImp,
  convertImplicationToDisjunction,
  getNegatedBiconditionalCasesToExist,
  getOperator,
  removeOuterBrackets,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkForHypotheticalSyllogism from "../../checkForHypotheticalSyllogism/checkForHypotheticalSyllogism";
import getDeMorganTransform from "../../getDeMorganTransform/getDeMorganTransform";
import checkKnowledgeBase from "../checkKnowledgeBase";

export const handleOrOperatorCase = (
  premise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  const operator = getOperator(premise);
  if (!operator) return false;
  const [before, after] = splitArray(premise, operator);

  const disjToImp = convertDisjunctionToImp(premise);

  const existingElement = searchInArray(knowledgeBase, before)
    ? before
    : searchInArray(knowledgeBase, after)
    ? after
    : false;
  if (existingElement && !searchInArray(knowledgeBase, premise)) {
    addDeductionStep(
      deductionStepsArr,
      premise,
      "Addition",
      `${searchIndex(knowledgeBase, existingElement)}`
    );
    knowledgeBase.push(premise);

    return true;
  } else if (searchInArray(knowledgeBase, disjToImp)) {
    addDeductionStep(
      deductionStepsArr,
      premise,
      "Material Implication",
      `${searchIndex(knowledgeBase, disjToImp)}`
    );
    knowledgeBase.push(premise);

    return true;
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
        if (
          checkKnowledgeBase(
            simplifiableElement[i],
            knowledgeBase,
            deductionStepsArr
          ) &&
          !searchInArray(knowledgeBase, premise)
        ) {
          addDeductionStep(
            deductionStepsArr,
            premise,
            "Addition",
            `${searchIndex(knowledgeBase, simplifiableElement[i])}`
          );
          knowledgeBase.push(premise);

          return true;
        }
      }
    }
  }
  return false;
};

export const handleAndOperatorCase = (
  premise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  const operator = getOperator(premise);
  if (!operator) return false;
  const [before, after] = splitArray(premise, operator);
  const existingBefore = searchInArray(knowledgeBase, before);
  const exisitngAfter = searchInArray(knowledgeBase, after);
  if (
    existingBefore &&
    exisitngAfter &&
    !searchInArray(knowledgeBase, premise)
  ) {
    addDeductionStep(
      deductionStepsArr,
      premise,
      "Conjunction",
      `${searchIndex(knowledgeBase, before)},${searchIndex(
        knowledgeBase,
        after
      )}`
    );
    knowledgeBase.push(premise);

    return true;
  } else {
    const simplifiableElements = getOperator(before)
      ? getOperator(after)
        ? [before, after]
        : [before]
      : getOperator(after)
      ? [after]
      : undefined;
    if (simplifiableElements) {
      return (
        checkKnowledgeBase(before, knowledgeBase, deductionStepsArr) &&
        checkKnowledgeBase(after, knowledgeBase, deductionStepsArr) &&
        checkKnowledgeBase(premise, knowledgeBase, deductionStepsArr)
      );
    }
    return false;
  }
};

export const handleConditionalOperatorCase = (
  premise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  const impToDisj = convertImplicationToDisjunction(premise);
  const bracketedPremise = convertDisjunctionToImp(impToDisj);
  if (checkKnowledgeBase(impToDisj, knowledgeBase, deductionStepsArr)) {
    addDeductionStep(
      deductionStepsArr,
      bracketedPremise,
      "Material Implication",
      `${searchIndex(knowledgeBase, impToDisj)}`
    );
    knowledgeBase.push(bracketedPremise);

    return true;
  } else if (
    checkForHypotheticalSyllogism(premise, knowledgeBase, deductionStepsArr)
  ) {
    return true;
  }
  return false;
};

export const handleBiConditionalOperatorCase = (
  premise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  const operator = getOperator(premise);
  if (!operator) return false;
  const [before, after] = splitArray(premise, operator);
  const eliminatedBiconditional = [
    ...["(", ...before, "->", ...after, ")"],
    "&",
    ...["(", ...after, "->", ...before, ")"],
  ];

  if (
    checkKnowledgeBase(
      eliminatedBiconditional,
      knowledgeBase,
      deductionStepsArr
    )
  ) {
    addDeductionStep(
      deductionStepsArr,
      premise,
      "Biconditional Introduction",
      `${searchIndex(knowledgeBase, eliminatedBiconditional)}`
    );
    knowledgeBase.push(eliminatedBiconditional);

    return true;
  }
  return false;
};

export const handleNegatedBiConditionalCase = (
  premise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  const secondPremise = [...premise];
  const secondaryPremise = removeOuterBrackets(secondPremise.slice(1));

  const [
    firstCasePartOne,
    firstCasePartTwo,
    secondCasePartOne,
    secondCasePartTwo,
  ] = getNegatedBiconditionalCasesToExist(secondaryPremise);

  if (
    checkKnowledgeBase(firstCasePartOne, knowledgeBase, deductionStepsArr) &&
    checkKnowledgeBase(firstCasePartTwo, knowledgeBase, deductionStepsArr)
  ) {
    addDeductionStep(
      deductionStepsArr,
      premise,
      "Biconditional Introduction",
      `${searchIndex(knowledgeBase, firstCasePartOne)}, ${searchIndex(
        knowledgeBase,
        firstCasePartTwo
      )}`
    );

    knowledgeBase.push(premise);

    return true;
  } else if (
    checkKnowledgeBase(secondCasePartOne, knowledgeBase, deductionStepsArr) &&
    checkKnowledgeBase(secondCasePartTwo, knowledgeBase, deductionStepsArr)
  ) {
    addDeductionStep(
      deductionStepsArr,
      premise,
      "Biconditional Introduction",
      `${searchIndex(knowledgeBase, secondCasePartOne)}, ${searchIndex(
        knowledgeBase,
        secondCasePartTwo
      )}`
    );
    knowledgeBase.push(premise);

    return true;
  }

  return false;
};

export const handleNegatedDeMorganCase = (
  premise: string[],
  impToDisj: string[],
  secondPremise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
) => {
  const deMorganized =
    impToDisj.length > 1
      ? getDeMorganTransform(impToDisj)
      : getDeMorganTransform(secondPremise);

  if (checkKnowledgeBase(deMorganized, knowledgeBase, deductionStepsArr)) {
    const implicationExists = impToDisj.length > 1;

    impToDisj = impToDisj.length > 1 ? impToDisj : premise;
    addDeductionStep(
      deductionStepsArr,
      impToDisj,
      "DeMorgan Theorem",
      `${searchIndex(knowledgeBase, deMorganized)}`
    );

    knowledgeBase.push(impToDisj);

    if (implicationExists) {
      addDeductionStep(
        deductionStepsArr,
        premise,
        "Material Implication",
        `${searchIndex(knowledgeBase, impToDisj)}`
      );
      knowledgeBase.push(premise);
    }

    return true;
  }
  return false;
};
