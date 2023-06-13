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

const getVariableTruthValues = (
  index: number,
  combinations: number
): string[] => {
  const divisionSeq = getDivisionSequence(combinations);
  const divisionValue = divisionSeq[index];

  const truthTable = getTruthValues(index, combinations, divisionValue);
  return truthTable;
};

export default getVariableTruthValues;
