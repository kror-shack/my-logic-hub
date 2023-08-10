import getNegation from "../getNegation/getNegation";
import {
  addDeductionStep,
  areStringArraysEqual,
  convertDisjunctionToImp,
  convertImplicationToDisjunction,
  getOperator,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { DeductionStep } from "../../../types/sharedTypes";
import getDeMorganTransform from "../getDeMorganTransform/getDeMorganTransform";
import checkForHypotheticalSyllogism from "../checkForHypotheticalSyllogism/checkForHypotheticalSyllogism";
import checkForCommutativity from "../checkForCommutativity/checkForCommutativity";

// recursive function to check different
// combinations within the knowledge base
const checkKnowledgeBase = (
  premise: string[],
  knowledgeBase: string[][],
  deductionStepsArr: DeductionStep[]
): boolean => {
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
    if (elementExists) return true;

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
    //     console.log("pushinggggggggggggggggg the identity law");
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
        if (secondaryOperator === "->") {
          impToDisj = convertImplicationToDisjunction(secondPremise.slice(1));
          impToDisj = ["~", "(", ...impToDisj, ")"];
        }
        const deMorganized =
          impToDisj.length > 1
            ? getDeMorganTransform(impToDisj)
            : getDeMorganTransform(secondPremise);

        console.log("searching the knowledge base for : " + deMorganized);
        if (
          checkKnowledgeBase(deMorganized, knowledgeBase, deductionStepsArr)
        ) {
          console.log("the search is finished");
          console.log(knowledgeBase);
          console.log(deductionStepsArr);
          const implicationExists = impToDisj.length > 1;

          impToDisj = impToDisj.length > 1 ? impToDisj : premise;
          console.log("this is the implcation to disj" + impToDisj);
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

      console.log("before the getNEfations");
      const negatedPremise = getNegation(premise);
      if (
        !searchInArray(knowledgeBase, negatedPremise) &&
        checkKnowledgeBase(negatedPremise, knowledgeBase, deductionStepsArr)
      ) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "Negation",
          `${searchIndex(knowledgeBase, negatedPremise)}`
        );
        knowledgeBase.push(premise);
        return true;
      }
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
        console.log("just added  " + premise);
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
      const eliminatedBicondional = [
        ...["(", ...before, "->", ...after, ")"],
        "&",
        ...["(", ...after, "->", ...before, ")"],
      ];
      console.log(
        "this was the eleiminated biconditonal: " + eliminatedBicondional
      );
      if (
        checkKnowledgeBase(
          eliminatedBicondional,
          knowledgeBase,
          deductionStepsArr
        )
      ) {
        addDeductionStep(
          deductionStepsArr,
          premise,
          "Bicondional Introduction",
          `${searchIndex(knowledgeBase, eliminatedBicondional)}`
        );
        knowledgeBase.push(eliminatedBicondional);
        return true;
      }
    }
  }
  return false;
};

export default checkKnowledgeBase;
