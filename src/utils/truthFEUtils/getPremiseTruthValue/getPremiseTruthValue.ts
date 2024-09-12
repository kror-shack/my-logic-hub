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
import {
  convertWffToTF,
  removeAllOuterMostBractets,
} from "../helperFunctions/helperFunctions";

export const getPremiseTruthValue = (
  premiseArr: string[],
  domain: AllDomains
) => {
  /**
   * Write function to remove all outer redundant brackets
   */
  const premise = removeAllOuterMostBractets(premiseArr);
  const truthyConc = convertWffToTF(premise, domain);
  const truthiedConcTruthValue = getTruthValue(truthyConc);

  return truthiedConcTruthValue;
};

const getTruthValue = (premise: string[]) => {
  const premiseArr = removeAllOuterMostBractets(premise);
  const operator = getOperator(premiseArr);
  if (!operator) return getConstantTruthValue(premise);
  const [before, after] = splitArray(premise, operator);

  if (operator === "~") {
    const removedNegationPremise = removeOuterBrackets(premiseArr.slice(1));

    const secondaryOperator = getOperator(removedNegationPremise);
    if (!secondaryOperator) {
      return getConstantTruthValue(removedNegationPremise);
    }
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
    } else if (secondaryOperator === "<->") {
      return handleBiConcOperator(before, after, true);
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
  const beforeIsTrue = getTruthValue(removeAllOuterMostBractets(before));
  if (!beforeIsTrue) return false;
  const afterIsTrue = getTruthValue(removeAllOuterMostBractets(after));
  if (afterIsTrue) return true; // TODO: throws an error if written as return afterIsTrue
  return false;
};

const handleOrOperator = (before: string[], after: string[]) => {
  const beforeIsTrue = getTruthValue(removeAllOuterMostBractets(before));
  if (beforeIsTrue) return true;
  const afterIsTrue = getTruthValue(removeAllOuterMostBractets(after));
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
