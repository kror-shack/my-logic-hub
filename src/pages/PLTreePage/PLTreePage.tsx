import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import PLTreeBody from "../../components/PLTreeBody/PLTreeBody";
import SLInputForm from "../../components/SLInputForm/SLInputForm";
import { TreeNode } from "../../types/TreeTypes/TreeTypes";
import constructTreeProof from "../../utils/PLTreeUtils/constructTreeProof/constructTreeProof";
import "./PLTreePage.scss"; // Import the CSS file for styling

/**
 * A React component for displaying a semantic tableaux page.
 *
 * @component
 * @returns - A React JSX element representing the ST Page.
 */
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
