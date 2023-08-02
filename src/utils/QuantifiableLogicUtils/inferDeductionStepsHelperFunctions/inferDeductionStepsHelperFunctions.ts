import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import {
  addDeductionStep,
  searchIndex,
} from "../../PropositionalLogicUtils/propositionalLogicHelperFunctions/propositionalLogicHelperFunction";

type QuanitifiableProp = string[];

export function getInstantiation(prop: QuanitifiableProp, substitute: string) {
  const quanitfier = prop[0];
  const variable = extractElementsInBrackets(quanitfier);

  const updatedArray = prop.map((element) => {
    console.log(element);
    const regex = /[A-Z]/;
    const Predicate = element.match(regex);
    if (!Predicate) return element;
    const elementSubStr =
      element[0] === "~" ? element.substring(2) : element.substring(1);
    const modifiedElement: string[] =
      element[0] === "~" ? ["~", ...Predicate] : [...Predicate];

    for (let i = 0; i < elementSubStr.length; i++) {
      if (elementSubStr[i] === variable) {
        modifiedElement.push(substitute);
      } else {
        modifiedElement.push(elementSubStr[i]);
      }
    }
    return modifiedElement.join("");
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
  const regex = /[a-z]/g;

  const lowercaseLettersArray = arr.join("").match(regex) || [];
  return lowercaseLettersArray;
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
