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
    let prevToken = rpnArr[i - 1];
    let nextToken = rpnArr[i + 1];
    if (!operatorsArr.includes(token)) {
      if (!truthTable[token]) {
        truthTable[token] = getVariableTruthValues(varNumber, combinations);
        varNumber++;
      }
      if (nextToken !== "~") evalutationStack.push(token);
    } else {
      if (token === "~") {
        //conditional to check if the prev token is an operator
        // or a variable, if the prev token is an operator that
        // means the evaluation stack top most element has
        // an euqation instead of a variable
        if (operatorsArr.includes(prevToken)) {
          if (!truthTable[evalutationStack[evalutationStack.length - 1]]) {
            const varTruthTable = getVariableTruthValues(
              varNumber,
              combinations
            );
            console.log(varTruthTable);
            truthTable[prevToken] = varTruthTable;
            varNumber++;
          }

          truthTable[`~${evalutationStack[evalutationStack.length - 1]}`] =
            getNegatedTruthValues(
              truthTable[evalutationStack[evalutationStack.length - 1]]
            );
          evalutationStack.push(
            "~" + evalutationStack[evalutationStack.length - 1]
          );
        } else {
          if (!truthTable[prevToken]) {
            const varTruthTable = getVariableTruthValues(
              varNumber,
              combinations
            );
            console.log(varTruthTable);
            truthTable[prevToken] = varTruthTable;
            varNumber++;
          }

          truthTable[`~${prevToken}`] = getNegatedTruthValues(
            truthTable[prevToken]
          );
          evalutationStack.push("~" + prevToken);
        }
      } else {
        const secondElement = evalutationStack.pop();
        const firstElement = evalutationStack.pop();
        if (token === "<->") {
        }
        if (firstElement && secondElement) {
          const operationResult = getOpertationTruthTable(
            token,
            truthTable[firstElement],
            truthTable[secondElement]
          );
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
