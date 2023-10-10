import getAndOperatorTruthTable from "../getAndOperatorTruthTable/getAndOperatorTruthTable";
import getNegatedTruthValues from "../getNegatedTruthValues/getNegatedTruthValues";
import getOrOperatorTruthTable from "../getOrOperatorTruthTable/getOrOperatorTruthTable";

/**
 * Get BiConditional expression Truth table
 *
 * @param arrayOne - the first wff
 * @param arrayTwo - the second wff
 * @returns - the truth values of the result of the BiConditional operation.
 */
const getBiconditionalTruthTable = (arrayOne: string[], arrayTwo: string[]) => {
  const negatedArrayOne = getNegatedTruthValues(arrayOne);
  const negatedArrayTwo = getNegatedTruthValues(arrayTwo);
  const andTruthTable = getAndOperatorTruthTable(arrayOne, arrayTwo);
  const negatedAndTruthTable = getAndOperatorTruthTable(
    negatedArrayOne,
    negatedArrayTwo
  );

  const completeOrTruthTable = getOrOperatorTruthTable(
    andTruthTable,
    negatedAndTruthTable
  );

  return completeOrTruthTable;
};

export default getBiconditionalTruthTable;
