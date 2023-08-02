import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import {
  addDeductionStep,
  searchIndex,
} from "../../PropositionalLogicUtils/propositionalLogicHelperFunctions/propositionalLogicHelperFunction";

type QuanitifiableProp = string[];

export function getInstantiation(prop: QuanitifiableProp, substitute: string) {
  const quanitfier = prop[0];
  console.log(`this is the quanitfier : ${quanitfier}`);
  const variable = extractElementsInBrackets(quanitfier);
  console.log(`this is the variable: ${variable}`);

  const updatedArray = prop.map((element) => {
    const regex = /\^(.)/;
    return element.replace(regex, (match, p1) => {
      if (p1 === variable) {
        return `^${substitute}`;
      } else {
        return match; // Keep the original matched element after "^"
      }
    });
  });

  return updatedArray.slice(1);
}

function extractElementsInBrackets(input: string): string {
  const regex = /\((.*?)\)/;
  const matches = input.match(regex);

  if (matches && matches[1]) {
    const elements = matches[1].split(",").map((element) => element.trim());
    return elements.length === 1 ? elements[0] : elements.join("");
  }

  return "";
}

// because cannot re-use subtitutes
// in existensial quantifiers
export function orderPremises(premiseArr: string[][]) {
  const quanitfiedProps: string[][] = [];
  const existentialProps: string[][] = [];
  const universalProps: string[][] = [];

  for (let i = 0; i < premiseArr.length; i++) {
    const premise = premiseArr[i];
    if (premise[0].includes("\u2200") && premise[0].includes("\u2203"))
      quanitfiedProps.push(premise);
    else if (premise[0].includes("\u2203")) existentialProps.push(premise);
    else universalProps.push(premise);
  }

  const orderedArguments = [
    ...quanitfiedProps,
    ...existentialProps,
    ...universalProps,
  ];
  return orderedArguments;
}

function extractVariable(arr: string[]): string[] {
  const resultArray: string[] = [];

  for (const element of arr) {
    const varIndex = element.indexOf("^");
    if (varIndex !== -1) {
      const letterAfterCaret = element.charAt(varIndex + 1);
      if (!resultArray.includes(letterAfterCaret)) {
        resultArray.push(letterAfterCaret);
      }
    }
  }

  return resultArray;
}

export function makeSubstituteArr(premiseArr: string[][]) {
  const existentialSubstitutes = ["a", "b", "c", "d", "e", "f"];
  let usedSubstitutes: string[] = [];

  for (let i = 0; i < premiseArr.length; i++) {
    const premise = premiseArr[i];

    if (!premise[0].includes("\u2200") && !premise[0].includes("\u2203")) {
      const variables = extractVariable(premise);
      usedSubstitutes = [...usedSubstitutes, ...variables];
    }
  }
  return [existentialSubstitutes, usedSubstitutes];
}

export function instantiatePremises(
  premiseArr: string[][],
  existentialSubstitutes: string[],
  usedSubstitutes: string[],
  deductionStepsArr: DeductionStep[]
) {
  const instantiatedPremisesArr: string[] = [];

  for (let i = 0; i < premiseArr.length; i++) {
    const premise = premiseArr[i];
    if (premise[0].includes("\u2203")) {
      const substitute = existentialSubstitutes[0];
      usedSubstitutes.push(existentialSubstitutes.shift()!);
      const instantiatedPremise = getInstantiation(premise, substitute);
      const stringPremise = instantiatedPremise.join("");
      instantiatedPremisesArr.push(stringPremise);

      addDeductionStep(
        deductionStepsArr,
        instantiatedPremise,
        "Existential Instantiation",
        i
      );
    }
    if (premise[0].includes("\u2200")) {
      const substitute = usedSubstitutes[0]
        ? usedSubstitutes[0]
        : existentialSubstitutes[0];
      const instantiatedPremise = getInstantiation(premise, substitute);
      usedSubstitutes.push(substitute);
      console.log(`subsititute: ${substitute}`);

      const stringPremise = instantiatedPremise.join("");
      instantiatedPremisesArr.push(stringPremise);
      addDeductionStep(
        deductionStepsArr,
        instantiatedPremise,
        "Universal Instantiation",
        i
      );
    }
  }
  return instantiatedPremisesArr;
}
