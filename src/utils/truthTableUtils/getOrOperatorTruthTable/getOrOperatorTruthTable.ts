/**
 * Get OR expression Truth table
 *
 * @param arrays the truth values of wffs from a conjunction expression.
 * @returns - the truth values of the result of the OR operation.
 */
const getOrOperatorTruthTable = (...arrays: string[][]) => {
  const truthTable: string[] = [];

  const minLength = Math.min(...arrays.map((array) => array.length));

  for (let i = 0; i < minLength; i++) {
    const combination: string[] = [];

    for (const array of arrays) {
      combination.push(array[i]);
    }

    const result = combination.some((value) => value === "T") ? "T" : "F";
    truthTable.push(result);
  }

  return truthTable;
};

export default getOrOperatorTruthTable;
