import getNegatedTruthValues from "../getNegatedTruthValues/getNegatedTruthValues";
import getOrOperatorTruthTable from "../getOrOperatorTruthTable/getOrOperatorTruthTable";

const getImplicationTruthTable = (arrayOne: string[], arrayTwo: string[]) => {
  const negatedArrayOne = getNegatedTruthValues(arrayOne);
  const orTruthTable = getOrOperatorTruthTable(negatedArrayOne, arrayTwo);

  return orTruthTable;
};

export default getImplicationTruthTable;
