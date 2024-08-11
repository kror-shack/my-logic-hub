"use client";
import React, { useEffect, useState, useRef } from "react";
import "./PLTreeBody.scss";
import NotebookLines from "../NotebookLines/NotebookLines";
import SLInputForm from "../SLInputForm/SLInputForm";
import constructTreeProof from "../../utils/pLTreeUtils/constructTreeProof/constructTreeProof";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import TreeNode from "../../utils/pLTreeUtils/treeNode/treeNode";
import InfoLink from "../InfoLink/InfoLink";
import { useSearchParams } from "next/navigation";
import { samplePLTreeArgument } from "../../data/sampleArguments/sampleArguments";
import { usePathname, useRouter } from "next/navigation";
import { setUrl } from "../../utils/helperFunctions/setUrl/setUrl";
import ReportArgumentButton from "../ReportArgumentButton/ReportArgumentButton";
import { logArgs } from "../../utils/services/logArgs/logArgs";
import LoadingText from "../LoadingText/LoadingText";

function initializeWorker() {
  return new Worker(new URL("./worker.ts", import.meta.url));
}

/**
 * Renders the Semantic Tableaux Body
 *
 * @returns A JSX element with the argument input form, and tableaux on form submit.
 */
const PLTreeBody = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const encodedArgument = searchParams.get("argument");
  let argument = [...samplePLTreeArgument]; //shallow copy to not change the value of the sample argument
  if (encodedArgument) {
    argument = JSON.parse(decodeURIComponent(encodedArgument));
  }

  const [rootNode, setRootNode] = useState<TreeNode>();
  const initialPropositionArr = argument;

  const [premiseLength, setPremiseLength] = useState<number>(
    initialPropositionArr.length + 1
  );

  const workerRef = useRef<Worker>();
  // the ref is needed for the setTimeout fn since
  // otherwise the previous state is used as the value
  const loadingRef = useRef<Boolean>(false);
  const [loading, setLoading] = useState(false);

  const isJestEnv = process.env.NODE_ENV === "test";

  useEffect(() => {
    if (!isJestEnv) {
      workerRef.current = initializeWorker();
      workerRef.current.onmessage = onMessageFunction;
    }
  }, []);

  const onMessageFunction = (event: MessageEvent<any>) => {
    setRootNode(event.data);
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
              setLoading(false);
            }
          }, 10000);
        }
      } else {
        const conc = propositionArr.pop();
        if (!conc) return;
        const node = constructTreeProof(propositionArr, conc);
        setRootNode(node);
      }
    }
    setUrl(copiedPropositionArr, pathName, router);
    logArgs("tree-proof");
  };

  return (
    <div className="PL-tree-body Page-body">
      <SLInputForm
        setPremiseLength={setPremiseLength}
        propositionArr={initialPropositionArr}
        isQuantifiable={false}
        isSemenaticTableax={true}
        getProof={getProof}
      />
      {rootNode && (
        <>
          <ReportArgumentButton />
          {loading ? (
            <LoadingText />
          ) : (
            <div className="tree-node-container">
              <TreeNodeComponent node={rootNode} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PLTreeBody;
