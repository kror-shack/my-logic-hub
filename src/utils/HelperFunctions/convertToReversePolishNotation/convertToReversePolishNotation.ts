/**
 * Convert an infix expression to Reverse Polish Notation (RPN).
 *
 * @param argumentArr - An array of strings representing an infix expression.
 * @returns - An array of strings representing the RPN expression.
 */

const convertToReversePolishNotation = (argumentArr: string[]) => {
  const operatorStack: string[] = [];
  const outputQueue: string[] = [];

  for (let i = 0; i < argumentArr.length; i++) {
    const token = argumentArr[i];
    if (!symbolArr.includes(token)) {
      outputQueue.push(token);
    } else {
      if (operatorsArr.includes(token)) {
        const lastStackedOperator = operatorStack[operatorStack.length - 1];

        if (!lastStackedOperator) {
          operatorStack.push(token);
        } else if (lastStackedOperator === "(") {
          operatorStack.push(token);
        } else if (
          operatorPrecedence[lastStackedOperator] <= operatorPrecedence[token]
        ) {
          operatorStack.push(token);
        } else {
          do {
            let lastStackedOperator = operatorStack.pop();

            if (lastStackedOperator) outputQueue.push(lastStackedOperator);
          } while (
            operatorPrecedence[operatorStack[operatorStack.length - 1]] <
              operatorPrecedence[token] &&
            operatorStack[operatorStack.length - 1] !== "("
          );
          operatorStack.push(token);
        }
      } else {
        if (token === "(") operatorStack.push(token);
        else if (token === ")") {
          let lastStackedOperator = operatorStack.pop();

          do {
            if (lastStackedOperator && lastStackedOperator !== "(") {
              outputQueue.push(lastStackedOperator);
              lastStackedOperator = operatorStack.pop();
            }
          } while (lastStackedOperator !== "(");
        }
      }
    }
  }

  do {
    const lastStackedOperator = operatorStack.pop();
    if (lastStackedOperator) outputQueue.push(lastStackedOperator);
  } while (operatorStack.length > 0);
  return outputQueue;
};

const operatorPrecedence: Record<string, number> = {
  "&": 4,
  "|": 3,
  "~": 5,
  "->": 2,
  "<->": 1,
};

const symbolArr = ["&", "|", "->", "<->", "(", ")", "~"];
const operatorsArr = ["&", "|", "~", "->", "<->"];

export default convertToReversePolishNotation;
