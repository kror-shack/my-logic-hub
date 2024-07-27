"use client";
import React, { useEffect, useState, useRef } from "react";
import { DeductionStep } from "../../types/propositionalLogicTypes/types";
import getDeductionSteps from "../../utils/propositionalLogicUtils/getDeductionSteps/getDeductionsteps";
import NotebookLines from "../NotebookLines/NotebookLines";
import SLInputForm from "../SLInputForm/SLInputForm";
import SLDeductionSteps from "../SLDeductionSteps/SLDeductionSteps";
import InfoLink from "../InfoLink/InfoLink";
import "../../styles/shared-page-layout.scss";
import { useSearchParams } from "next/navigation";
import { samplePropositionalLogicArg } from "../../data/sampleArguments/sampleArguments";
import { usePathname, useRouter } from "next/navigation";

function initializeWorker() {
  return new Worker(new URL("./worker.ts", import.meta.url));
}

/**
 * Renders propositional logic page body
 *
 * @component
 * @returns A JSX element containing the SL input form and SL deduction steps.
 */

const PropositionalLogicBody = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const encodedArgument = searchParams.get("argument");
  let argument = [...samplePropositionalLogicArg]; //shallow copy to not change the value of the sample argument
  if (encodedArgument) {
    argument = JSON.parse(decodeURIComponent(encodedArgument));
  }

  const isJestEnv = process.env.NODE_ENV === "test";
  const [deductionSteps, setDeductionSteps] = useState<DeductionStep[] | false>(
    []
  );
  const initialPropositionArr = argument;
  const [premiseLength, setPremiseLength] = useState<number>(
    initialPropositionArr.length
  );
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

  const getProof = (propositionArr: string[]) => {
    const copiedPropositionArr = [...propositionArr];
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
        const newDeductionSteps = getDeductionSteps(propositionArr, conc);
        setDeductionSteps(newDeductionSteps);
      }
    }
    const url = `${pathName}?argument=${encodeURI(
      JSON.stringify(copiedPropositionArr)
    )}`;
    router.push(url);
  };

  return (
    <div className="Page-body">
      <SLInputForm
        setPremiseLength={setPremiseLength}
        propositionArr={initialPropositionArr}
        isQuantifiable={false}
        getProof={getProof}
      />
      <SLDeductionSteps
        deductionSteps={deductionSteps}
        premiseLength={premiseLength}
      />
    </div>
  );
};

export default PropositionalLogicBody;
