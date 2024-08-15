"use client";
import React, { useEffect, useState, useRef } from "react";
import NotebookLines from "../NotebookLines/NotebookLines";
import inferThroughPermutations from "../../utils/quantifiableLogicUtils/inferThroughPermutations/inferThroughPermutations";
import SLInputForm from "../SLInputForm/SLInputForm";
import SLDeductionSteps from "../SLDeductionSteps/SLDeductionSteps";
import {
  transformSymbolsForDisplay,
  transformSymbolsForUrl,
} from "../../utils/helperFunctions/tranfromSymbols/transformSymbols";
import InfoLink from "../InfoLink/InfoLink";
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { sampleQuantificationalLogicArg } from "../../data/sampleArguments/sampleArguments";
import { setUrl } from "../../utils/helperFunctions/setUrl/setUrl";
import { logArgs } from "../../utils/services/logArgs/logArgs";
import LoadingText from "../LoadingText/LoadingText";
import { DeductionStep } from "../../types/sharedTypes";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const encodedArgument = searchParams.get("argument");
  let argument = [...sampleQuantificationalLogicArg]; //shallow copy to not change the value of the sample argument
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

  // the ref is needed for the setTimeout fn since
  // otherwise the previous state is used as the value
  const loadingRef = useRef<Boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isJestEnv) {
      workerRef.current = initializeWorker();
      workerRef.current.onmessage = onMessageFunction;
    }
  }, []);

  const onMessageFunction = (event: MessageEvent<any>) => {
    setDeductionSteps(event.data);
    loadingRef.current = false;
    setLoading(false);
  };
  const getProof = (propositionArr: string[]) => {
    const copiedPropositionArr = [...propositionArr];

    if (propositionArr) {
      if (!isJestEnv) {
        const conc = propositionArr.pop();
        if (!conc) return;
        if (workerRef.current) {
          loadingRef.current = true;
          setLoading(true);
          workerRef.current.postMessage({ propositionArr, conc });
          setTimeout(() => {
            if (loadingRef.current && workerRef.current) {
              workerRef.current.terminate();
              workerRef.current = initializeWorker();
              workerRef.current.onmessage = onMessageFunction;
              setDeductionSteps(false);
              setLoading(false);
            }
          }, 5000);
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
    setUrl(copiedPropositionArr, pathName, router);
    logArgs("quantificational-logic");
  };

  return (
    <div className="Page-body">
      <SLInputForm
        setPremiseLength={setPremiseLength}
        propositionArr={initialPropositionArr}
        isQuantifiable={true}
        getProof={getProof}
      />
      {loading ? (
        <LoadingText />
      ) : (
        <SLDeductionSteps
          deductionSteps={deductionSteps}
          premiseLength={premiseLength}
          isQuantifiable={true}
        />
      )}
    </div>
  );
};

export default QuantifiableLogicBody;
