import React, { useEffect, useState } from "react";
import { DeductionStep } from "../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import NotebookLines from "../NotebookLines/NotebookLines";
import inferThroughPermutations from "../../utils/QuantifiableLogicUtils/inferThroughPermutations/inferThroughPermutations";
import SLInputForm from "../SLInputForm/SLInputForm";
import SLDeductionSteps from "../SLDeductionSteps/SLDeductionSteps";
import { transformSymbolsForDisplay } from "../../utils/HelperFunctions/tranfromSymbols/transformSymbols";
import { Link } from "react-router-dom";
import InfoLink from "../InfoLink/InfoLink";

/**
 * Renders FOL page body
 *
 * @component
 * @returns A JSX element containing the SL input form and SL deduction steps.
 */
const QuantifiableLogicBody = () => {
  const [deductionSteps, setDeductionSteps] = useState<DeductionStep[] | false>(
    []
  );
  const [propositionArr, setPropositionArr] = useState<string[]>([
    "\u2200x \u2200y ( ( Axg ∧ Agy ) -> Axy )",
    "\u2200x ( Px -> Agx )",
    "\u2203x ( Px ∧ Axg )",
    "\u2203x ( Px ∧ \u2200y ( Py -> Axy ) )",
  ]);
  const [premiseLength, setPremiseLength] = useState<number>(
    propositionArr.length
  );

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    if (propositionArr) {
      const conc = propositionArr.pop();
      if (!conc) return;
      const newDeductionSteps = inferThroughPermutations(propositionArr, conc);
      setDeductionSteps(newDeductionSteps);
    }
  }, [propositionArr]);

  return (
    <div className="Propositional-logic-body">
      <InfoLink url="/info/quantificational-logic" />
      <SLInputForm
        setPropositionArr={setPropositionArr}
        setPremiseLength={setPremiseLength}
        propositionArr={propositionArr}
        isQuantifiable={true}
      />
      <SLDeductionSteps
        deductionSteps={deductionSteps}
        premiseLength={premiseLength}
        isQuantifiable={true}
      />
    </div>
  );
};

export default QuantifiableLogicBody;
