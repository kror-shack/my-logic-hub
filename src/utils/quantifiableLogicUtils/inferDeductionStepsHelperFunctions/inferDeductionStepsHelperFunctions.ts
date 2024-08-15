import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import {
  addDeductionStep,
  searchInArray,
  searchIndex,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { DeductionStep } from "../../../types/sharedTypes";

type QuanitifiableProp = string[];

/**
 * Instantiate a FOL wff
 *
 * @param prop - The wff to be instantiated
 * @param substitute - The substitute to instantiate the wff with
 * @returns - An instantiated version of the initial wff.
 */
export function getInstantiation(prop: QuanitifiableProp, substitute: string) {
  const quanitfier = prop[0];

  const variable = extractElementsInBrackets(quanitfier);

  const updatedArray = prop.map((element) => {
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
  return removeOutermostBrackets(updatedArray.slice(1));
}

export function extractElementsInBrackets(input: string): string {
  const regex = /\((.*?)\)/;
  const matches = input.match(regex);

  if (matches && matches[1]) {
    const elements = matches[1].split(",").map((element) => element.trim());
    return elements.length === 1 ? elements[0] : elements.join("");
  }

  return "";
}

/**
 * Order FOL premises
 *
 * This function orders FOL premises as Non quantified > Existentially Quantified > Universally Quantified.
 * As substitution depends on the order for effecient processing.
 *
 *
 * @param premiseArr
 * @returns
 */
export function orderPremises(premiseArr: string[][]) {
  const quanitfiedProps: string[][] = [];
  const existentialProps: string[][] = [];
  const universalProps: string[][] = [];

  for (let i = 0; i < premiseArr.length; i++) {
    const premise = premiseArr[i];
    if (!premise[0].includes("\u2200") && !premise[0].includes("\u2203"))
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
  originalPremiseArr: string[][],
  existentialSubstitutes: string[],
  usedSubstitutes: string[],
  deductionStepsArr: DeductionStep[],
  alreadyInstantiatedPremise: string[][]
) {
  const instantiatedPremisesArr: string[][] = [];

  for (let i = 0; i < premiseArr.length; i++) {
    const premise = premiseArr[i];
    if (premise[0].includes("\u2203")) {
      alreadyInstantiatedPremise.push(premise);
      const substitute = existentialSubstitutes[0];
      usedSubstitutes.push(existentialSubstitutes.shift()!);
      const instantiatedPremise = getInstantiation(premise, substitute);

      instantiatedPremisesArr.push(instantiatedPremise);

      addDeductionStep(
        deductionStepsArr,
        instantiatedPremise,
        "Existential Instantiation",
        searchIndex(originalPremiseArr, premise)
      );
    }
    if (premise[0].includes("\u2200")) {
      alreadyInstantiatedPremise.push(premise);

      const substitute = usedSubstitutes[0]
        ? usedSubstitutes[0]
        : existentialSubstitutes[0];
      const instantiatedPremise = getInstantiation(premise, substitute);
      usedSubstitutes.push(substitute);

      instantiatedPremisesArr.push(instantiatedPremise);
      addDeductionStep(
        deductionStepsArr,
        instantiatedPremise,
        "Universal Instantiation",
        searchIndex(originalPremiseArr, premise)
      );
    }
  }
  return instantiatedPremisesArr;
}

export function searchInKnowledgeBaseForInstantiatedPremsise(
  knowledgeBase: string[][],
  premise: string[]
): number {
  const existentialSubstitutes = ["a", "b", "c", "d", "e", "f"];
  for (let i = 0; i < existentialSubstitutes.length; i++) {
    const instantiatedConc = getInstantiation(
      premise,
      existentialSubstitutes[i]
    );
    const index = searchIndex(knowledgeBase, instantiatedConc);
    if (index) return index;
  }
  return 0;
}

// export default function getNeededSubstitute(
//   premise: string[],
//   knowledgeBase: string[][]
// ) {

//   const quanitfier = premise[0];
//   const variable = extractElementsInBrackets(quanitfier);

//   for(let i = 0; i < premise.length; i++){
//      const element = premise[i]
//      if (!/[A-Z]/.test(element)) {
//        return null;
//      }

//     for(let j = 0; j < knowledgeBase.length; j++){
//       const knowledgeBasePremise = knowledgeBase[i];
//       if(knowledgeBasePremise === premise) continue;
//         for(let k =0; k < knowledgeBasePremise.length; k++){
//           const nestedElement = knowledgeBasePremise[i]
//           if(nestedElement.includes(element[0])){

//           }
//         }
//     }

//   }

// }

/**
 * INFER THROUGH PERMUTAIONS HELPER FUNCTIONS
 */

export function instantiateExistentialPremise(
  premiseArr: string[][],
  usedSubstitutes: string[],
  deductionStepsArr: DeductionStep[],
  alreadyInstantiatedPremises: string[][]
) {
  const instantiatedPremisesArr: string[][] = [];
  const substitutes = [...usedSubstitutes];

  for (let i = 0; i < premiseArr.length; i++) {
    const premise = premiseArr[i];
    if (premise[0].includes("\u2203")) {
      const substitute = substitutes.shift();
      const existentialSub = `_${substitute}`; //??
      if (!substitute) continue;
      const instantiatedPremise = getInstantiation(premise, existentialSub); //??

      instantiatedPremisesArr.push(instantiatedPremise);
      alreadyInstantiatedPremises.push(premise);

      addDeductionStep(
        deductionStepsArr,
        instantiatedPremise,
        "Existential Instantiation",
        searchIndex(premiseArr, premise)
      );
    } else {
      /**
       * Hence the name existentiallyInstantiatedArray
       */
      instantiatedPremisesArr.push(premise);
    }
  }
  return {
    instantiatedPremisesArr: instantiatedPremisesArr,
    usedSubs: substitutes,
  };
}

export function calculateTotalQuantifiers(
  strings: string[],
  char1 = "\u2200",
  char2 = "\u2203"
): number {
  let frequencyChar1 = 0;
  let frequencyChar2 = 0;

  for (const str of strings) {
    if (str.includes(char1)) {
      frequencyChar1++;
    }
    if (str.includes(char2)) {
      frequencyChar2++;
    }
  }

  return frequencyChar1 + frequencyChar2;
}
