"use client";
import React, { useEffect, useState, useRef } from "react";
import { DeductionStep } from "../../types/propositionalLogicTypes/types";
import NotebookLines from "../NotebookLines/NotebookLines";
import inferThroughPermutations from "../../utils/quantifiableLogicUtils/inferThroughPermutations/inferThroughPermutations";
import SLInputForm from "../SLInputForm/SLInputForm";
import SLDeductionSteps from "../SLDeductionSteps/SLDeductionSteps";
import { transformSymbolsForDisplay } from "../../utils/helperFunctions/tranfromSymbols/transformSymbols";
import InfoLink from "../InfoLink/InfoLink";
import "../../styles/shared-page-layout.scss";

function initializeWorker() {
  return new Worker(new URL("./worker.ts", import.meta.url));
}

/**
 * Renders FOL page body
 *
 * @component
 * @returns A JSX element containing the SL input form and SL deduction steps.
 */
const QuantifiableLogicBody = () => {
  const isJestEnv = process.env.NODE_ENV === "test";
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
  const workerRef = useRef<Worker>();
  const loading = useRef<Boolean>(false);

  useEffect(() => {
    if (!isJestEnv) {
      workerRef.current = initializeWorker();
      workerRef.current.onmessage = function (event) {
        setDeductionSteps(event.data);
        loading.current = false;
      };
    }
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    if (propositionArr) {
      if (!isJestEnv) {
        const conc = propositionArr.pop();
        if (!conc) return;
        if (workerRef.current) {
          loading.current = true;
          workerRef.current.postMessage({ propositionArr, conc });
          setTimeout(() => {
            if (loading.current && workerRef.current) {
              workerRef.current.terminate();
              workerRef.current = initializeWorker();
              setDeductionSteps(false);
            }
          }, 500);
        }
      } else {
        const conc = propositionArr.pop();
        if (!conc) return;
        const newDeductionSteps = inferThroughPermutations(
          propositionArr,
          conc
        );
        setDeductionSteps(newDeductionSteps);
      }
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
