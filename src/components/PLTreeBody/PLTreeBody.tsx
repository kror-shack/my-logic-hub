import React, { useEffect, useState } from "react";
import "./PLTreeBody.scss";
import NotebookLines from "../NotebookLines/NotebookLines";
import SLInputForm from "../SLInputForm/SLInputForm";
import constructTreeProof from "../../utils/PLTreeUtils/constructTreeProof/constructTreeProof";
import TreeNodeComponent from "../TreeNodeComponent/TreeNodeComponent";
import TreeNode from "../../utils/PLTreeUtils/TreeNode/TreeNode";

const PLTreeBody = () => {
  const [rootNode, setRootNode] = useState<TreeNode>();
  const [propositionArr, setPropositionArr] = useState<string[]>([
    "\u2200(x)(Rx)",
    "\u2200(x)(Px & ~Px)",
  ]);

  const [firstRender, setFirstRender] = useState(true);
  const [premiseLength, setPremiseLength] = useState<number>(
    propositionArr.length + 1
  );

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    if (propositionArr) {
      const copiedPropositionArr = [...propositionArr];
      const conc = copiedPropositionArr.pop();
      if (!conc) return;
      const node = constructTreeProof(copiedPropositionArr, conc);
      setRootNode(node);
    }
  }, [propositionArr]);

  return (
    <div className="PL-tree-body">
      <NotebookLines />
      <SLInputForm
        setPropositionArr={setPropositionArr}
        setPremiseLength={setPremiseLength}
        propositionArr={propositionArr}
        isQuantifiable={true}
        isSemenaticTableax={true}
      />
      {rootNode && <TreeNodeComponent node={rootNode} />}
    </div>
  );
};

export default PLTreeBody;
