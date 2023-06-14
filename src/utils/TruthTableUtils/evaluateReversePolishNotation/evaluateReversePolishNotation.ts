import getAndOperatorTruthTable from "../getAndOperatorTruthTable/getAndOperatorTruthTable";
import getBiconditionalTruthTable from "../getBiconditionalTruthTable/getBiconditionalTruthTable";
import getImplicationTruthTable from "../getImplicationTruthTable/getImplicationTruthTable";
import getNegatedTruthValues from "../getNegatedTruthValues/getNegatedTruthValues";
import getOrOperatorTruthTable from "../getOrOperatorTruthTable/getOrOperatorTruthTable";
import getVariableTruthValues from "../getVariableTruthValues/getVariableTruthValues";

const evalulateReversePolishNotaion = (
  rpnArr: string[],
  combinations: number
) => {
  const evalutationStack: string[] = [];
  const truthTable: {
    [key: string]: string[];
  } = {};
  let result: string;
  let varNumber = 0;

  for (let i = 0; i < rpnArr.length; i++) {
    let token = rpnArr[i];
    if (!operatorsArr.includes(token)) {
      console.log(`pushing ${token}`);
      truthTable[token] = getVariableTruthValues(varNumber, combinations);
      varNumber++;
      evalutationStack.push(token);
    } else {
      if (token === "~") {
        const varTruthTable = getVariableTruthValues(varNumber, combinations);
        truthTable[token] = varTruthTable;

        truthTable[`~${token}`] = getNegatedTruthValues(varTruthTable);
      } else {
        console.log("there is an operator");
        const secondElement = evalutationStack.pop();
        const firstElement = evalutationStack.pop();
        if (firstElement && secondElement) {
          const operationResult = getOpertationTruthTable(
            token,
            truthTable[firstElement],
            truthTable[secondElement]
          );
          console.log(`this is the operation result ${operationResult}`);
          const operation = firstElement + token + secondElement;
          if (operationResult) truthTable[operation] = operationResult;

          if (operationResult) {
            result = operation;
            evalutationStack.push(result);
          }
        }
      }
    }
  }
  console.log(truthTable.p);
  console.log(truthTable.q);
  console.log(truthTable["p&q"]);
  return truthTable;
};

function getOpertationTruthTable(
  operator: string,
  arrayOne: string[],
  arrayTwo: string[]
) {
  if (!operator) return null;
  switch (operator) {
    case "&":
      return getAndOperatorTruthTable(arrayOne, arrayTwo);

    case "->":
      return getImplicationTruthTable(arrayOne, arrayTwo);

    case "|":
      return getOrOperatorTruthTable(arrayOne, arrayTwo);

    case "<->":
      return getBiconditionalTruthTable(arrayOne, arrayTwo);
  }
}

const symbolArr = ["&", "|", "->", "<->", "(", ")", "~"];
const operatorsArr = ["&", "|", "~", "->", "<->"];

export default evalulateReversePolishNotaion;
