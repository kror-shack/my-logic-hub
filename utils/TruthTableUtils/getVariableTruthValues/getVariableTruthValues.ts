/**
 * Get primitive wff truth values
 *
 *
 * This function gets the truth values of a primitive wff by using its index number
 * and the total number of primitive wffs present in the argument, to generate consistent truth value
 * combinations for all the wffs.
 *
 * @param index - the index of the current primitive wff, starting from 0 with 0 being the first primitive wff starting at the left.
 * @param combinations - the total number of primitive wffs in the expression.
 * @returns - an array of truth values
 */
const getVariableTruthValues = (
  index: number,
  combinations: number
): string[] => {
  const divisionSeq = getDivisionSequence(combinations);
  const divisionValue = divisionSeq[index];

  const truthTable = getTruthValues(index, combinations, divisionValue);
  return truthTable;
};

function getTruthValues(
  indexValue: number,
  combinations: number,
  divisionValue: number,
  truthValues: string[] = [],
  startValue: "T" = "T"
): string[] {
  const loopCombinations = divisionValue;
  if (truthValues.length >= combinations) {
    return truthValues;
  }

  for (let i = 0; i < combinations / loopCombinations; i++) {
    truthValues.push(startValue);
  }
  const nextStartValue = "F";

  for (let i = 0; i < combinations / loopCombinations; i++) {
    truthValues.push(nextStartValue);
  }

  return getTruthValues(indexValue, combinations, divisionValue, truthValues);
}

function getDivisionSequence(length: number) {
  const sequence: number[] = [];

  for (let i = 1; i < length; i++) {
    const number = Math.pow(2, i);
    sequence.push(number);
  }

  return sequence;
}

export default getVariableTruthValues;
