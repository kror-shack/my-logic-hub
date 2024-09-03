import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import {
  addBracketsIfNecessary,
  addDeductionStep,
  areStringArraysEqual,
  getOperator,
  getSearchIndexInDS,
  getTopLevelNegation,
  searchIfExistsAsShow,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import {
  addMLDeductionStep,
  closeDeductionStep,
  markUnusableDeductionSteps,
} from "../helperFunctions/helperFunction";

const getDesiredConcFromAssumption = (
  premise: string[],
  previosDeductionStepsArr: DeductionStep[],
  derivedRules: DerivedRules
) => {
  const deductionStepsArr = [...previosDeductionStepsArr];
  const allAssumptions = deductionStepsArr.filter(
    (premise) =>
      premise.rule === "ACD" &&
      getOperator(premise.obtained) &&
      getOperator(premise.obtained) === "->"
  );
  for (let i = 0; i < allAssumptions.length; i++) {
    const currentPremise = allAssumptions[i].obtained;
    const bracketedPremise = addBracketsIfNecessary(premise);
    const negatedPremise = getTopLevelNegation(premise);
    const obtained = [...bracketedPremise, "&", ...negatedPremise];

    const [antecedent, consequent] = splitArray(currentPremise, "->");
    const antecedentOperator = getOperator(antecedent);
    if (!antecedentOperator) return false;

    if (antecedentOperator === "->") {
      const [nestedAntecedent, nestedConsequent] = splitArray(antecedent, "->");
      const nestedAntecedentOperator = getOperator(nestedAntecedent);

      if (
        !nestedAntecedentOperator &&
        areStringArraysEqual(premise, nestedAntecedent)
      ) {
        if (!searchIfExistsAsShow(deductionStepsArr, antecedent)) {
          addMLDeductionStep(deductionStepsArr, antecedent, null, null, true);
        }
        /**
         * THE ADD DEDUCTION STEPS SHOULD NOT BELONG IN THIS FUNCTION
         * IT NEEDS TO BE RECURSIVE AND AS SUCH BELONGS TO THE CHECK
         * ML KB FN.
         */
        addMLDeductionStep(deductionStepsArr, nestedAntecedent, "ACD", null);
        addDeductionStep(
          deductionStepsArr,
          obtained,
          "Conjunction",
          `${getSearchIndexInDS(
            deductionStepsArr,
            premise
          )}, ${getSearchIndexInDS(deductionStepsArr, negatedPremise)}`
        );
        closeDeductionStep(deductionStepsArr, antecedent);

        // addDeductionStep(
        //   deductionStepsArr,
        //   consequent,
        //   "Modus Ponens",
        //   `${getSearchIndexInDS(
        //     deductionStepsArr,
        //     antecedent
        //   )}, ${getSearchIndexInDS(deductionStepsArr, consequent)}`
        // );
        // const negatedConsequent = getTopLevelNegation(consequent);
        // const secondaryNegation = [
        //   ...addBracketsIfNecessary(consequent),
        //   "&",
        //   ...negatedConsequent,
        // ];

        // addDeductionStep(
        //   deductionStepsArr,
        //   secondaryNegation,
        //   "Conjunction",
        //   `${getSearchIndexInDS(
        //     deductionStepsArr,
        //     consequent
        //   )}, ${getSearchIndexInDS(deductionStepsArr, negatedConsequent)}`
        // );
        return markUnusableDeductionSteps(deductionStepsArr);
      }
    }
  }
  return false;
};

export default getDesiredConcFromAssumption;
