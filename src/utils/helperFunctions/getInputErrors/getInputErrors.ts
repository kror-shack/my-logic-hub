import checkPropositionalInputForErrors from "../checkPropositionalInputForErrors/checkPropositionalInputForErrors";
import checkQLInputForErrors from "../checkQLInputForErrors/checkQLInputForErrors";

export function getInputError(
  inputValues: string[],
  isQuantifiable: boolean,
  conclusion: string
) {
  for (let i = 0; i < inputValues.length; i++) {
    const input = inputValues[i];
    const errors = isQuantifiable
      ? checkQLInputForErrors(input)
      : checkPropositionalInputForErrors(input);
    if (errors) {
      return `Error on premise ${i + 1}:  ${errors}`;
    }
  }

  if (!conclusion) {
    return "Please enter a conclusion";
  }

  const concErrors = isQuantifiable
    ? checkQLInputForErrors(conclusion)
    : checkPropositionalInputForErrors(conclusion);
  if (concErrors) {
    return "Error on conclusion: " + concErrors;
  }
  if (inputValues.includes(conclusion)) {
    return `The conclusion corresponds with premise ${
      inputValues.indexOf(conclusion) + 1
    }`;
  }
  return null;
}
