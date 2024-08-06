import {
  addDeductionStep,
  areStringArraysEqual,
  convertDisjunctionToImp,
  convertImplicationToDisjunction,
  getNegatedBiconditionalCasesToExist,
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { DeductionStep } from "../../../types/sharedTypes";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import { pushLocallyDeducedPremise } from "../helperFunctions/helperFunction";
import { checkDisjunctionDerivation } from "../checkDisjunctionDerivation/checkDisjuntionDerivation";
import { checkConjunctionDerivation } from "../checkConjunctionDerivation/checkConjunctionDerivation";
import { checkConditionalDerivation } from "../checkConditionalDerivation/checkConditionalDerivation";
import { ModernLogicDeductionStep } from "../../../types/modernLogic/types";
import { checkBiConditionalDerivation } from "../checkBiConditionalDerivation/checkBiConditionalDerivation";

const checkMLKnowledgeBase = (
  originalPremise: string[],
  localKnowledgeBase: string[][],
  allDeductionsArray: string[][],
  deductionStepsArr: ModernLogicDeductionStep[]
): boolean => {
  const premise = removeOutermostBrackets(originalPremise);
  console.log("🚀 ~ premise:", premise);

  if (searchInArray(localKnowledgeBase, originalPremise)) {
    return true;
  }

  const operator = getOperator(premise);

  // if the proposition is not simplifiable
  if (!operator) {
    console.log("🚀 ~ operator:", operator);

    const elementExists = searchInArray(localKnowledgeBase, premise);
    if (elementExists) {
      console.log(localKnowledgeBase);
      return true;
    }
    console.log("returning false");
    return false;
  } else if (operator === "~")
    return false; //since it is not further simlifiable
  else {
    if (operator === "|") {
      return checkDisjunctionDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
    } else if (operator === "&") {
      return checkConjunctionDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
    } else if (operator === "->") {
      return checkConditionalDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
    } else if (operator === "<->") {
      return checkBiConditionalDerivation(
        premise,
        deductionStepsArr,
        localKnowledgeBase,
        allDeductionsArray
      );
    }
    //   else {
    //     const simplifiableElement = getOperator(before)
    //       ? getOperator(after)
    //         ? [before, after]
    //         : [before]
    //       : getOperator(after)
    //       ? [after]
    //       : undefined;
    //     if (simplifiableElement) {
    //       for (let i = 0; i < simplifiableElement?.length; i++) {
    //         if (
    //           checkMLKnowledgeBase(
    //             simplifiableElement[i],
    //             knowledgeBase,
    //             deductionStepsArr
    //           ) &&
    //           !searchInArray(knowledgeBase, premise)
    //         ) {
    //           addDeductionStep(
    //             deductionStepsArr,
    //             premise,
    //             "Addition",
    //             `${searchIndex(knowledgeBase, simplifiableElement[i])}`
    //           );
    //           knowledgeBase.push(premise);

    //           return true;
    //         }
    //       }
    //     }
    //   }
    // }

    //     if (operator === "~") {
    //
    //       }
    //       const secondPremise = [...premise];
    //       const secondaryOperator = getOperator(secondPremise.slice(1));
    //       if (secondaryOperator) {
    //         let impToDisj: string[] = [];
    //         if (secondaryOperator === "<->") {
    //           const secondaryPremise = removeOutermostBrackets(
    //             secondPremise.slice(1)
    //           );

    //           const [
    //             firstCasePartOne,
    //             firstCasePartTwo,
    //             secondCasePartOne,
    //             secondCasePartTwo,
    //           ] = getNegatedBiconditionalCasesToExist(secondaryPremise);

    //           if (
    //             checkMLKnowledgeBase(
    //               firstCasePartOne,
    //               knowledgeBase,
    //               deductionStepsArr
    //             ) &&
    //             checkMLKnowledgeBase(
    //               firstCasePartTwo,
    //               knowledgeBase,
    //               deductionStepsArr
    //             )
    //           ) {
    //             addDeductionStep(
    //               deductionStepsArr,
    //               premise,
    //               "Biconditional Introduction",
    //               `${searchIndex(knowledgeBase, firstCasePartOne)}, ${searchIndex(
    //                 knowledgeBase,
    //                 firstCasePartTwo
    //               )}`
    //             );

    //             knowledgeBase.push(premise);

    //             return true;
    //           } else if (
    //             checkMLKnowledgeBase(
    //               secondCasePartOne,
    //               knowledgeBase,
    //               deductionStepsArr
    //             ) &&
    //             checkMLKnowledgeBase(
    //               secondCasePartTwo,
    //               knowledgeBase,
    //               deductionStepsArr
    //             )
    //           ) {
    //             addDeductionStep(
    //               deductionStepsArr,
    //               premise,
    //               "Biconditional Introduction",
    //               `${searchIndex(knowledgeBase, secondCasePartOne)}, ${searchIndex(
    //                 knowledgeBase,
    //                 secondCasePartTwo
    //               )}`
    //             );
    //             knowledgeBase.push(premise);

    //             return true;
    //           }

    //           return false;
    //         } else if (secondaryOperator === "->") {
    //           impToDisj = convertImplicationToDisjunction(secondPremise.slice(1));
    //           impToDisj = ["~", "(", ...impToDisj, ")"];
    //         }
    //         const deMorganized =
    //           impToDisj.length > 1
    //             ? getDeMorganTransform(impToDisj)
    //             : getDeMorganTransform(secondPremise);

    //         if (
    //           checkMLKnowledgeBase(deMorganized, knowledgeBase, deductionStepsArr)
    //         ) {
    //           const implicationExists = impToDisj.length > 1;

    //           impToDisj = impToDisj.length > 1 ? impToDisj : premise;
    //           addDeductionStep(
    //             deductionStepsArr,
    //             impToDisj,
    //             "DeMorgan Theorem",
    //             `${searchIndex(knowledgeBase, deMorganized)}`
    //           );

    //           knowledgeBase.push(impToDisj);

    //           if (implicationExists) {
    //             addDeductionStep(
    //               deductionStepsArr,
    //               premise,
    //               "Material Implication",
    //               `${searchIndex(knowledgeBase, impToDisj)}`
    //             );
    //             knowledgeBase.push(premise);
    //           }

    //           return true;
    //         }
    //       }

    //       // const negatedPremise = getNegation(premise);
    //       // if (
    //       //   !searchInArray(knowledgeBase, negatedPremise) &&
    //       //   checkMLKnowledgeBase(negatedPremise, knowledgeBase, deductionStepsArr)
    //       // ) {
    //       //   addDeductionStep(
    //       //     deductionStepsArr,
    //       //     premise,
    //       //     "Negation",
    //       //     `${searchIndex(knowledgeBase, negatedPremise)}`
    //       //   );
    //       //   knowledgeBase.push(premise);

    //       //   return true;
    //       // }
    //     }

    // else if (operator === "&") {
    //       const existingBefore = searchInArray(knowledgeBase, before);
    //       const exisitngAfter = searchInArray(knowledgeBase, after);
    //       if (
    //         existingBefore &&
    //         exisitngAfter &&
    //         !searchInArray(knowledgeBase, premise)
    //       ) {
    //         addDeductionStep(
    //           deductionStepsArr,
    //           premise,
    //           "Conjunction",
    //           `${searchIndex(knowledgeBase, before)},${searchIndex(
    //             knowledgeBase,
    //             after
    //           )}`
    //         );
    //         knowledgeBase.push(premise);

    //         return true;
    //       } else {
    //         const simplifiableElements = getOperator(before)
    //           ? getOperator(after)
    //             ? [before, after]
    //             : [before]
    //           : getOperator(after)
    //           ? [after]
    //           : undefined;
    //         if (simplifiableElements) {
    //           return (
    //             checkMLKnowledgeBase(before, knowledgeBase, deductionStepsArr) &&
    //             checkMLKnowledgeBase(after, knowledgeBase, deductionStepsArr) &&
    //             checkMLKnowledgeBase(premise, knowledgeBase, deductionStepsArr)
    //           );
    //         }
    //       }
    //     } else if (operator === "->") {
    //       const impToDisj = convertImplicationToDisjunction(premise);

    //       if (checkMLKnowledgeBase(impToDisj, knowledgeBase, deductionStepsArr)) {
    //         addDeductionStep(
    //           deductionStepsArr,
    //           premise,
    //           "Material Implication",
    //           `${searchIndex(knowledgeBase, impToDisj)}`
    //         );
    //         knowledgeBase.push(premise);

    //         return true;
    //       } else if (
    //         checkForHypotheticalSyllogism(premise, knowledgeBase, deductionStepsArr)
    //       ) {
    //         return true;
    //       }
    //     } else if (operator === "<->") {
    //       const eliminatedBiconditional = [
    //         ...["(", ...before, "->", ...after, ")"],
    //         "&",
    //         ...["(", ...after, "->", ...before, ")"],
    //       ];

    //       if (
    //         checkMLKnowledgeBase(
    //           eliminatedBiconditional,
    //           knowledgeBase,
    //           deductionStepsArr
    //         )
    //       ) {
    //         addDeductionStep(
    //           deductionStepsArr,
    //           premise,
    //           "Biconditional Introduction",
    //           `${searchIndex(knowledgeBase, eliminatedBiconditional)}`
    //         );
    //         knowledgeBase.push(eliminatedBiconditional);

    //         return true;
    //       }
  }

  return false;
};

export default checkMLKnowledgeBase;
