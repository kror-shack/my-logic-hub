"use client";
import React, { useEffect, useState } from "react";
import { DeductionStep } from "../../types/propositionalLogicTypes/types";
import NotebookLines from "../NotebookLines/NotebookLines";
import inferThroughPermutations from "../../utils/quantifiableLogicUtils/inferThroughPermutations/inferThroughPermutations";
import SLInputForm from "../SLInputForm/SLInputForm";
import SLDeductionSteps from "../SLDeductionSteps/SLDeductionSteps";
import { transformSymbolsForDisplay } from "../../utils/helperFunctions/tranfromSymbols/transformSymbols";
import InfoLink from "../InfoLink/InfoLink";
import "../../styles/shared-page-layout.scss";

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
    <div className="Page-body">
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
