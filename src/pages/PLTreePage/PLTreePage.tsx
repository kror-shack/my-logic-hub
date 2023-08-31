import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import PLTreeBody from "../../components/PLTreeBody/PLTreeBody";
import SLInputForm from "../../components/SLInputForm/SLInputForm";
import constructTreeProof from "../../utils/PLTreeUtils/constructTreeProof/constructTreeProof";
import "./PLTreePage.scss"; // Import the CSS file for styling

type TreeNode = {
  data: string[];
  primitive: boolean;
  orderNumber: number | string;
  originNumber: number | string | null;
  unpacked: boolean;
  absurdity: boolean;
  left: TreeNode | null;
  right: TreeNode | null;
  middle: TreeNode | null;
};

const PLTreePage = () => {
  const [rootNode, setRootNode] = useState<TreeNode>();
  useEffect(() => {
    const node = constructTreeProof(["(p|(q&r))"], "((p|q)&(p|r))");
    setRootNode(node);
  }, []);
  return (
    <div className="PL-tree-page">
      <Header heading="Semantic Tableaux" />
      <NotebookLines />
      <PLTreeBody />
    </div>
  );
};

export default PLTreePage;
