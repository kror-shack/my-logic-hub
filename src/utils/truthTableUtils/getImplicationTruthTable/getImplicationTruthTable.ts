import getNegatedTruthValues from "../getNegatedTruthValues/getNegatedTruthValues";
import getOrOperatorTruthTable from "../getOrOperatorTruthTable/getOrOperatorTruthTable";

/**
 * Get Implication expression Truth table
 *
 * @param arrayOne - the first wff
 * @param arrayTwo - the second wff
 * @returns - the truth values of the result of the Implication operation.
 */
const getImplicationTruthTable = (arrayOne: string[], arrayTwo: string[]) => {
  const negatedArrayOne = getNegatedTruthValues(arrayOne);
  const orTruthTable = getOrOperatorTruthTable(negatedArrayOne, arrayTwo);

  return orTruthTable;
};

export default getImplicationTruthTable;
