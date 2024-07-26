"use client";
import React, { useEffect, useState, useRef } from "react";
import { DeductionStep } from "../../types/propositionalLogicTypes/types";
import getDeductionSteps from "../../utils/propositionalLogicUtils/getDeductionSteps/getDeductionsteps";
import NotebookLines from "../NotebookLines/NotebookLines";
import SLInputForm from "../SLInputForm/SLInputForm";
import SLDeductionSteps from "../SLDeductionSteps/SLDeductionSteps";
import InfoLink from "../InfoLink/InfoLink";
import "../../styles/shared-page-layout.scss";

function intializeWorker() {
  return new Worker(new URL("./worker.ts", import.meta.url));
}

/**
 * Renders propositional logic page body
 *
 * @component
 * @returns A JSX element containing the SL input form and SL deduction steps.
 */

const PropositionalLogicBody = () => {
  const [deductionSteps, setDeductionSteps] = useState<DeductionStep[] | false>(
    []
  );
  const [propositionArr, setPropositionArr] = useState<string[]>([
    "( ¬ Q -> P ) ∧ (R -> T )",
    " ¬ ( ¬P -> S )",
    " (¬ U ∨ R ) ∧ U ",
    " ¬B -> ¬T ",
    "T -> Y",
    "¬K -> ¬Y",
    "( ¬ ( B -> ¬Q ) ∧ ( ¬ S ∧ T ) )∧ ( X ∨ K )",
  ]);
  const [premiseLength, setPremiseLength] = useState<number>(
    propositionArr.length
  );
  const [firstRender, setFirstRender] = useState(true);
  const workerRef = useRef<Worker>();
  const loading = useRef<Boolean>(false);

  useEffect(() => {
    workerRef.current = intializeWorker();
    workerRef.current.onmessage = function (event) {
      setDeductionSteps(event.data);
      loading.current = false;
    };
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    if (propositionArr) {
      const conc = propositionArr.pop();
      if (!conc) return;
      if (workerRef.current) {
        loading.current = true;
        workerRef.current.postMessage({ propositionArr, conc });
        setTimeout(() => {
          if (loading.current && workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = intializeWorker();
            setDeductionSteps(false);
          }
        }, 1000);
      }
    }
  }, [propositionArr]);

  return (
    <div className="Page-body">
      <SLInputForm
        setPropositionArr={setPropositionArr}
        setPremiseLength={setPremiseLength}
        propositionArr={propositionArr}
        isQuantifiable={false}
      />
      <SLDeductionSteps
        deductionSteps={deductionSteps}
        premiseLength={premiseLength}
      />
    </div>
  );
};

export default PropositionalLogicBody;
