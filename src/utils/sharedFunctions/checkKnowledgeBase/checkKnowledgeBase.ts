import getNegation from "../getNegation/getNegation";
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
import getDeMorganTransform from "../getDeMorganTransform/getDeMorganTransform";
import checkForHypotheticalSyllogism from "../checkForHypotheticalSyllogism/checkForHypotheticalSyllogism";
import checkForCommutativity from "../checkForCommutativity/checkForCommutativity";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";

/**
 *  Execute backward chaining to reach to a conclusion.
 *
 * This function uses backward chaining by recursion to process input data
 * and make decisions based on predefined rules.
 *
 * @param premise - Te conclsuion that needs to be reached.
 * @param knowledgeBase - The knowledge base which the function modifies if applicable..
 * @param deductionStepsArr - The deduction steps in order which the function modifies if applicable..
 * @returns - Boolean based on whether the conclusion can be reached through the current content of the knowledge base.
 */

const checkKnowledgeBase = (
  originalPremise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
): boolean => {
  const premise = removeOutermostBrackets(originalPremise);

  const operator = getOperator(premise);

  for (let i = 0; i < premise.length; i++) {
    if (premise[i].includes("\u2200") || premise[i].includes("\u2203")) {
      if (searchInArray(knowledgeBase, premise)) {
        return true;
      }
      return false;
    }
  }

  if (searchInArray(knowledgeBase, premise)) {
    return true;
  }

  if (checkForCommutativity(premise, knowledgeBase, deductionStepsArr)) {
    return true;
  }

  // if the proposition is not simplifiable
  if (!operator) {
    const elementExists = searchInArray(knowledgeBase, premise);
    if (elementExists) {
      return true;
    }

    /**
     * Tautology rules replaces inferences with the form
     *  P -> P
     */
    // const identityPremise = [...premise, "->", ...premise];
    // if (!searchInArray(knowledgeBase, identityPremise)) {
    //   const lawOfIdentity = checkForHypotheticalSyllogism(
    //     identityPremise,
    //     knowledgeBase,
    //     deductionStepsArr
    //   );
    //   if (lawOfIdentity) {
    //     addDeductionStep(
    //       deductionStepsArr,
    //       premise,
    //       "Law of Identiy",
    //       `${searchIndex(knowledgeBase, identityPremise)}`
    //     );
    //     knowledgeBase.push(premise);
    //     return true;
    //   }
    // }

    return false;
  } else {
    const [before, after] = splitArray(premise, operator);

    if (operator === "~") {
      if (searchInArray(knowledgeBase, premise)) {
        return true;
      }
      const secondPremise = [...premise];
      const secondaryOperator = getOperator(secondPremise.slice(1));
      if (secondaryOperator) {
        let impToDisj: string[] = [];
        if (secondaryOperator === "<->") {
          const secondaryPremise = removeOutermostBrackets(
            secondPremise.slice(1)
          );

          const [
            firstCasePartOne,
            firstCasePartTwo,
            secondCasePartOne,
            secondCasePartTwo,
          ] = getNegatedBiconditionalCasesToExist(secondaryPremise);

          if (
            checkKnowledgeBase(
              firstCasePartOne,
              knowledgeBase,
              deductionStepsArr
            ) &&
            checkKnowledgeBase(
              firstCasePartTwo,
              knowledgeBase,
              deductionStepsArr
            )
          ) {
            addDeductionStep(
              deductionStepsArr,
              premise,
              "Biconditional Introduction",
              `${searchIndex(knowledgeBase, firstCasePartOne)}, ${searchIndex(
                knowledgeBase,
                firstCasePartTwo
              )}`
            );

            knowledgeBase.push(premise);

            return true;
          } else if (
            checkKnowledgeBase(
              secondCasePartOne,
              knowledgeBase,
              deductionStepsArr
            ) &&
            checkKnowledgeBase(
              secondCasePartTwo,
              knowledgeBase,
              deductionStepsArr
            )
          ) {
            addDeductionStep(
              deductionStepsArr,
              premise,
              "Biconditional Introduction",
              `${searchIndex(knowledgeBase, secondCasePartOne)}, ${searchIndex(
                knowledgeBase,
                secondCasePartTwo
              )}`
            );
            knowledgeBase.push(premise);

            return true;
          }

          return false;
        } else if (secondaryOperator === "->") {
          impToDisj = convertImplicationToDisjunction(secondPremise.slice(1));
          impToDisj = ["~", "(", ...impToDisj, ")"];
        }
        const deMorganized =
          impToDisj.length > 1
            ? getDeMorganTransform(impToDisj)
            : getDeMorganTransform(secondPremise);

        if (
          checkKnowledgeBase(deMorganized, knowledgeBase, deductionStepsArr)
        ) {
          const implicationExists = impToDisj.length > 1;

          impToDisj = impToDisj.length > 1 ? impToDisj : premise;
          addDeductionStep(
            deductionStepsArr,
            impToDisj,
            "DeMorgan Theorem",
            `${searchIndex(knowledgeBase, deMorganized)}`
          );

          knowledgeBase.push(impToDisj);

          if (implicationExists) {
            addDeductionStep(
              deductionStepsArr,
              premise,
              "Material Implication",
              `${searchIndex(knowledgeBase, impToDisj)}`
            );
            knowledgeBase.push(premise);
          }

          return true;
        }
      }

      // const negatedPremise = getNegation(premise);
      // if (
      //   !searchInArray(knowledgeBase, negatedPremise) &&
      //   checkKnowledgeBase(negatedPremise, knowledgeBase, deductionStepsArr)
      // ) {
      //   addDeductionStep(
      //     deductionStepsArr,
      //     premise,
      //     "Negation",
      //     `${searchIndex(knowledgeBase, negatedPremise)}`
      //   );
      //   knowledgeBase.push(premise);

      //   return true;
      // }
    }

    if (operator === "|") {
      const disjToImp = convertDisjunctionToImp(premise);

      const existingElement = searchInArray(knowledgeBase, before)
        ? before
        : searchInArray(knowledgeBase, after)
        ? after
        : false;
      if (existingElement && !searchInArray(knowledgeBase, premise)) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "Addition",
          `${searchIndex(knowledgeBase, existingElement)}`
        );
        knowledgeBase.push(premise);

        return true;
      } else if (searchInArray(knowledgeBase, disjToImp)) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "Material Implication",
          `${searchIndex(knowledgeBase, disjToImp)}`
        );
        knowledgeBase.push(premise);

        return true;
      } else {
        const simplifiableElement = getOperator(before)
          ? getOperator(after)
            ? [before, after]
            : [before]
          : getOperator(after)
          ? [after]
          : undefined;
        if (simplifiableElement) {
          for (let i = 0; i < simplifiableElement?.length; i++) {
            if (
              checkKnowledgeBase(
                simplifiableElement[i],
                knowledgeBase,
                deductionStepsArr
              ) &&
              !searchInArray(knowledgeBase, premise)
            ) {
              addDeductionStep(
                deductionStepsArr,
                premise,
                "Addition",
                `${searchIndex(knowledgeBase, simplifiableElement[i])}`
              );
              knowledgeBase.push(premise);

              return true;
            }
          }
        }
      }
    } else if (operator === "&") {
      const existingBefore = searchInArray(knowledgeBase, before);
      const exisitngAfter = searchInArray(knowledgeBase, after);
      if (
        existingBefore &&
        exisitngAfter &&
        !searchInArray(knowledgeBase, premise)
      ) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "Conjunction",
          `${searchIndex(knowledgeBase, before)},${searchIndex(
            knowledgeBase,
            after
          )}`
        );
        knowledgeBase.push(premise);

        return true;
      } else {
        const simplifiableElements = getOperator(before)
          ? getOperator(after)
            ? [before, after]
            : [before]
          : getOperator(after)
          ? [after]
          : undefined;
        if (simplifiableElements) {
          return (
            checkKnowledgeBase(before, knowledgeBase, deductionStepsArr) &&
            checkKnowledgeBase(after, knowledgeBase, deductionStepsArr) &&
            checkKnowledgeBase(premise, knowledgeBase, deductionStepsArr)
          );
        }
      }
    } else if (operator === "->") {
      const impToDisj = convertImplicationToDisjunction(premise);

      if (checkKnowledgeBase(impToDisj, knowledgeBase, deductionStepsArr)) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "Material Implication",
          `${searchIndex(knowledgeBase, impToDisj)}`
        );
        knowledgeBase.push(premise);

        return true;
      } else if (
        checkForHypotheticalSyllogism(premise, knowledgeBase, deductionStepsArr)
      ) {
        return true;
      }
    } else if (operator === "<->") {
      const eliminatedBiconditional = [
        ...["(", ...before, "->", ...after, ")"],
        "&",
        ...["(", ...after, "->", ...before, ")"],
      ];

      if (
        checkKnowledgeBase(
          eliminatedBiconditional,
          knowledgeBase,
          deductionStepsArr
        )
      ) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "Biconditional Introduction",
          `${searchIndex(knowledgeBase, eliminatedBiconditional)}`
        );
        knowledgeBase.push(eliminatedBiconditional);

        return true;
      }
    }
  }

  return false;
};

export default checkKnowledgeBase;
