import parseInput from "../parseInput/parseInput";

function checkinputForErrors(input: string): true | string {
  const inputArr = parseInput(input);
  const symbolArray = ["&", "|", "->", "<->"];
  const unAllowedElementArr = [
    "@",
    "#",
    "!",
    "$",
    "%",
    "^",
    "*",
    "+",
    "=",
    ";",
    ":",
    "'",
    '"',
    ",",
    ".",
    "<",
    ">",
    "-",
    "/",
    "?",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  // Add your unallowed elements array here

  const stack: string[] = [];
  console.log(inputArr);

  for (let i = 0; i < inputArr.length; i++) {
    const current = inputArr[i];

    if (current === "~") {
      if (!inputArr[i + 1] || symbolArray.includes(inputArr[i + 1])) {
        return `Negation must be followed by a variable`;
      }
    }

    if (current === "(") {
      stack.push(current);
    } else if (current === ")") {
      if (stack.length === 0 || stack[stack.length - 1] !== "(") {
        return "Closing bracket ')' without matching opening bracket '('";
      }
      stack.pop();
    } else if (symbolArray.includes(current)) {
      console.log("symbol array inclues it");
      if (i === 0 || i === inputArr.length - 1) {
        return `Operator '${current}' cannot be at the start or end of the string`;
      }
      const prev = inputArr[i - 1];
      const next = inputArr[i + 1];

      if (
        symbolArray.includes(prev) ||
        symbolArray.includes(next) ||
        prev === "(" ||
        next === ")"
      ) {
        return `Invalid placement of operator '${current}'`;
      }
    } else if (unAllowedElementArr.includes(current)) {
      return `Invalid element '${current}' found in the input string`;
    }
  }

  if (stack.length > 0) {
    return "Opening bracket '(' without matching closing bracket ')'";
  }

  return true;
}

export default checkinputForErrors;
