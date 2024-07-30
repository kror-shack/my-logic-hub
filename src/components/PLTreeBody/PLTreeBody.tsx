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
  const loading = useRef<Boolean>(false);
  const isJestEnv = process.env.NODE_ENV === "test";

  useEffect(() => {
    if (!isJestEnv) {
      workerRef.current = initializeWorker();
      workerRef.current.onmessage = function (event) {
        setRootNode(event.data);
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
            }
          }, 500);
        }
      } else {
        const conc = propositionArr.pop();
        if (!conc) return;
        const node = constructTreeProof(propositionArr, conc);
        setRootNode(node);
      }
    }
    setUrl(copiedPropositionArr, pathName, router);
  };

  return (
    <div className="PL-tree-body">
      <SLInputForm
        setPremiseLength={setPremiseLength}
        propositionArr={initialPropositionArr}
        isQuantifiable={false}
        isSemenaticTableax={true}
        getProof={getProof}
      />
      {rootNode && (
        <div className="tree-node-container">
          <TreeNodeComponent node={rootNode} />
        </div>
      )}
    </div>
  );
};

export default PLTreeBody;
