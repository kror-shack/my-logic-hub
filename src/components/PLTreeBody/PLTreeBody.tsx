"use client";
import React, { useEffect, useState, useRef } from "react";
import "./PLTreeBody.scss";
import NotebookLines from "../NotebookLines/NotebookLines";
import SLInputForm from "../SLInputForm/SLInputForm";
import constructTreeProof from "../../utils/pLTreeUtils/constructTreeProof/constructTreeProof";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import TreeNode from "../../utils/pLTreeUtils/treeNode/treeNode";
import InfoLink from "../InfoLink/InfoLink";

function intializeWorker() {
  return new Worker(new URL("./worker.ts", import.meta.url));
}

/**
 * Renders the Semantic Tableaux Body
 *
 * @returns A JSX element with the argument input form, and tableaux on form submit.
 */
const PLTreeBody = () => {
  const [rootNode, setRootNode] = useState<TreeNode>();
  const [propositionArr, setPropositionArr] = useState<string[]>([
    "P ∨ ( Q ∧ R )",
    "( P ∨ Q ) ∧ ( P ∨ R )",
  ]);

  const [firstRender, setFirstRender] = useState(true);
  const [premiseLength, setPremiseLength] = useState<number>(
    propositionArr.length + 1
  );

  const workerRef = useRef<Worker>();
  const loading = useRef<Boolean>(false);

  useEffect(() => {
    workerRef.current = intializeWorker();
    workerRef.current.onmessage = function (event) {
      setRootNode(event.data);
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
          }
        }, 1000);
      }
    }
  }, [propositionArr]);

  return (
    <div className="PL-tree-body">
      <SLInputForm
        setPropositionArr={setPropositionArr}
        setPremiseLength={setPremiseLength}
        propositionArr={propositionArr}
        isQuantifiable={false}
        isSemenaticTableax={true}
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
