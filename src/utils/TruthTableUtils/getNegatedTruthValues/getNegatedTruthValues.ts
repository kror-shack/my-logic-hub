const getNegatedTruthValues = (truthValues: string[]): string[] => {
  let negatedTruthValues: string[] = [];
  for (let i = 0; i < truthValues.length; i++) {
    truthValues[i] === "T"
      ? negatedTruthValues.push("F")
      : negatedTruthValues.push("T");
  }
  return negatedTruthValues;
};

export default getNegatedTruthValues;
