/**
 * This files contain code from approaches that
 * are not currently being used but might be implemented
 * later on.
 */

// /**
//  * Making the constants
//  */

// export function makeConstantsArray(premiseArr: string[][]): {
//   freeConstants: string[];
//   usedConstants: string[];
// } {
//   const freeConstants = Array.from({ length: 26 }, (_, index) =>
//     String.fromCharCode("a".charCodeAt(0) + index)
//   ); // all lowercase alphabets

//   const usedConstants: string[] = [];

//   for (let i = 0; i < premiseArr.length; i++) {
//     const premise = premiseArr[i];
//     const unboundConstants = getAllFreeConstants(premise);
//     if (unboundConstants.length > 0) {
//       moveStringsBetweenArrays(freeConstants, usedConstants, unboundConstants);
//     }
//   }

//   console.log({
//     freeConstants: freeConstants,
//     usedConstants: usedConstants,
//   });
//   return {
//     freeConstants: freeConstants,
//     usedConstants: usedConstants,
//   };
// }

// export function getAllFreeConstants(premise: string[]) {
//   const boundVariables: string[] = [];

//   for (let i = 0; i < premise.length; i++) {
//     const element = premise[i];
//     if (isQuantifier(element)) {
//       boundVariables.push(element[element.length - 1]);
//     }
//   }

//   const freeConstants = getFilteredLowercaseLetters(premise, boundVariables);
//   return freeConstants;
// }

// function isQuantifier(element: string) {
//   if (element.includes("\u2203") || element.includes("\u2200")) {
//     return true;
//   } else return false;
// }

// function getFilteredLowercaseLetters(
//   inputArray: string[],
//   noUseArray: string[]
// ): string[] {
//   const filteredLetters = inputArray.join("").match(/[a-z]/g);

//   if (!filteredLetters) {
//     return [];
//   }

//   const filteredSet = new Set(filteredLetters);

//   for (const letter of noUseArray) {
//     filteredSet.delete(letter);
//   }

//   return Array.from(filteredSet);
// }

// function moveStringsBetweenArrays(
//   sourceArray: string[],
//   targetArray: string[],
//   stringsToMove: string[]
// ): void {
//   for (const stringToMove of stringsToMove) {
//     const sourceIndex = sourceArray.indexOf(stringToMove);

//     if (sourceIndex !== -1) {
//       sourceArray.splice(sourceIndex, 1);
//     }

//     if (!targetArray.includes(stringToMove)) {
//       targetArray.push(stringToMove);
//     }
//   }
// }

// /**
//  * Making the constants
//  */

// /**
//  * Converting to skolem form
//  */

// export function convertPremisesToSkolemStandardForm(
//   premiseArr: string[][],
//   freeConstants: string[],
//   usedConstants: string[]
// ) {
//   let freeVariablesIndex = 1;
//   const orderedPremises = orderPremises(premiseArr); //unquantified -> existential -> universal

//   const skolemizedPremises: string[][] = [];
//   for (let i = 0; i < orderedPremises.length; i++) {
//     const premise = orderedPremises[i];
//     if (!isQuantifier(premise[0])) {
//       skolemizedPremises.push(premise);
//     } else if (premise[0].includes("\u2203")) {
//       const variable = premise[0][premise[0].length - 1];
//       const scopedElements = extractElementsInBrackets(premise);

//       const skolemSub = freeConstants.shift();
//       const skolemExistentialSub = `_${skolemSub}`;
//       if (!skolemSub || !scopedElements) return;
//       usedConstants.push(skolemSub);
//       const skolemizedPremise = replaceVariables(
//         scopedElements,
//         variable,
//         skolemExistentialSub
//       );

//       skolemizedPremises.push(skolemizedPremise);
//     } else if (premise[0].includes("\u2200")) {
//       /**
//        * skolem functions logic here
//        */
//       const variable = premise[0][premise[0].length - 1];
//       const scopedElements = extractElementsInBrackets(premise);

//       const skolemSub = `x${freeVariablesIndex}`;
//       if (!skolemSub || !scopedElements) return;
//       usedConstants.push(skolemSub);
//       const skolemizedPremise = replaceVariables(
//         scopedElements,
//         variable,
//         skolemSub
//       );

//       skolemizedPremises.push(skolemizedPremise);
//     }
//   }
//   return skolemizedPremises;
// }

// function replaceVariables(
//   prop: string[],
//   variable: string,
//   substitute: string
// ) {
//   const updatedArray = prop.map((element) => {
//     const regex = /[A-Z]/;
//     const Predicate = element.match(regex);
//     if (!Predicate) return element;
//     const elementSubStr =
//       element[0] === "~" ? element.substring(2) : element.substring(1);
//     const modifiedElement: string[] =
//       element[0] === "~" ? ["~", ...Predicate] : [...Predicate];

//     for (let i = 0; i < elementSubStr.length; i++) {
//       if (elementSubStr[i] === variable) {
//         modifiedElement.push(substitute);
//       } else {
//         modifiedElement.push(elementSubStr[i]);
//       }
//     }
//     return modifiedElement.join("");
//   });
//   return updatedArray;
// }

// export function extractElementsInBrackets(
//   inputArray: string[]
// ): string[] | null {
//   const result: string[] = [];
//   let openCount = 0;
//   let foundOpeningBracket = false;

//   for (let i = 0; i < inputArray.length; i++) {
//     if (inputArray[i] === "(") {
//       if (!foundOpeningBracket) {
//         foundOpeningBracket = true;
//         openCount++;
//       } else {
//         openCount++;
//         result.push(inputArray[i]);
//       }
//     } else if (inputArray[i] === ")") {
//       openCount--;
//       if (foundOpeningBracket && openCount === 0) {
//         break;
//       } else if (openCount > 0) {
//         result.push(inputArray[i]);
//       }
//     } else if (foundOpeningBracket) {
//       result.push(inputArray[i]);
//     }
//   }

//   if (foundOpeningBracket && openCount === 0) {
//     return result;
//   } else {
//     return null;
//   }
// }

// export function orderPremises(premiseArr: string[][]) {
//   const quanitfiedProps: string[][] = [];
//   const existentialProps: string[][] = [];
//   const universalProps: string[][] = [];

//   for (let i = 0; i < premiseArr.length; i++) {
//     const premise = premiseArr[i];
//     if (!premise[0].includes("\u2200") && !premise[0].includes("\u2203"))
//       quanitfiedProps.push(premise);
//     else if (premise[0].includes("\u2203")) existentialProps.push(premise);
//     else universalProps.push(premise);
//   }

//   const orderedArguments = [
//     ...quanitfiedProps,
//     ...existentialProps,
//     ...universalProps,
//   ];
//   return orderedArguments;
// }

// /**
//  * Converting to skolem form
//  */

// /**
//  * Unification algorithm
//  */

// export function subUnify(t1: string[], t2: string[]): string[] | false {
//   const variableRegex = /^[a-zA-Z]+$/;

//   //t1 constians variable, t2 contains constant
//   if (includesNumber(t1) && !includesNumber(t2)) {
//     if (t1.length === 1 && t2.length === 1 && t1[0][0] === t2[0][0]) {
//       const usedConstant = t2[0].slice(1);

//       if (usedConstant[0] === "_") return removeUnderscores(t2);
//       return t2;
//     }
//   }
//   return false;

//   //   if (t1.length === 1 && t2.length === 1 && t1[0] === t2[0]) {
//   //     return [true, {}];
//   //   } else if (
//   //     t2.length === 1 &&
//   //     variableRegex.test(t2[0]) &&
//   //     t1.includes(t2[0])
//   //   ) {
//   //     return [false, {}];
//   //   } else {
//   //     return [true, { [t1[0]]: t2 }];
//   //   }
// }

// function includesNumber(arr: string[]): boolean {
//   const numberRegex = /\d/;

//   for (const element of arr) {
//     if (numberRegex.test(element)) {
//       return true;
//     }
//   }

//   return false;
// }

// function removeUnderscores(arr: string[]): string[] {
//   const updatedArray: string[] = [];

//   for (const element of arr) {
//     const updatedElement = element.replace(/_/g, "");
//     updatedArray.push(updatedElement);
//   }

//   return updatedArray;
// }

// class ListNode {
//   value: string;
//   next: ListNode | null;

//   constructor(value: string) {
//     this.value = value;
//     this.next = null;
//   }
// }

// const inferThroughSkolemization = (
//   initialPremiseArr: string[],
//   conclusion: string
// ) => {
//   const conclusionArr = parseSymbolicLogicInput(conclusion, true);

//   let knowledgeBase: string[][] = [];
//   const variableLinkedLists: ListNode[] = [];
//   const deductionStepsArr: DeductionStep[] = [];

//   for (let i = 0; i < initialPremiseArr.length; i++) {
//     const parsedPremise = parseSymbolicLogicInput(initialPremiseArr[i], true);

//     knowledgeBase.push(parsedPremise);
//   }

//   const folConstants = makeConstantsArray(knowledgeBase);
//   const freeConstants = folConstants.freeConstants;
//   const usedConstants = folConstants.usedConstants;

//   const skolemizedPremises = convertPremisesToSkolemStandardForm(
//     knowledgeBase,
//     freeConstants,
//     usedConstants
//   );

//   return skolemizedPremises;
// };

// const checkForUnification = (
//   premise: string[],
//   knowledgeBase: string[][],
//   variableLinkedLists: []
// ) => {
//   if (premise.length === 1) {
//     const predicate = premise[0];
//     for (let i = 0; i < knowledgeBase.length; i++) {
//       const secondaryPremise = knowledgeBase[i];
//       if (premise.length === 1) {
//         if (areStringArraysEqual(premise, secondaryPremise)) {
//           return null;
//         } else {
//           const mainVariable = premise[1];
//           const secondaryPredicate = secondaryPremise[1];
//           // if(mainVariable.in)
//         }
//       }
//     }
//   }
// };

// const createKnowledgeBase = (premiseArr: string[][]) => {
//   const knowledgeBase: string[][] = [...premiseArr];
//   const deductionSteps: DeductionStep[] = [];
//   const simplifiableExpressions: string[][] = [];
//   let addedExpressions = 0;

//   do {
//     for (let i = 0; i < knowledgeBase.length; i++) {
//       let premise = knowledgeBase[i];
//       let operator = getOperator(premise);

//       if (premise.length === 1) {
//         continue;
//       } else if (operator) {
//         switch (operator) {
//           case "&":
//             const [firstElement, secondElement] = splitArray(premise, "&");
//             if (!knowledgeBase.includes(firstElement)) {
//               knowledgeBase.push(firstElement);

//               addDeductionStep(deductionSteps, firstElement, "Conjunction", i);
//               addedExpressions++;
//             }
//             if (!knowledgeBase.includes(secondElement)) {
//               knowledgeBase.push(secondElement);
//               addDeductionStep(deductionSteps, secondElement, "Conjunction", i);

//               addedExpressions++;
//             }
//             addedExpressions = 0;

//             break;

//           case "|":
//           case "->":
//             if (!simplifiableExpressions.includes(premise)) {
//               simplifiableExpressions.push(premise);
//               addedExpressions++;
//             }
//             addedExpressions = 0;

//             break;
//           default:
//             addedExpressions = 0;
//         }
//       }
//     }
//   } while (addedExpressions !== 0);

//   return { knowledgeBase, deductionSteps, simplifiableExpressions };
// };

export {};
