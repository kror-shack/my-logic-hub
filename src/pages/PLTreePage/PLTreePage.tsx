import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
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
  const [notebookLinesRender, setNotebookLinesRender] = useState(0);

  return (
    <div className="Propositional-logic-page">
      <Header heading="Semantic Tableaux" />
      <NotebookLines key={notebookLinesRender} />
      <PLTreeBody setNotebookLinesRender={setNotebookLinesRender} />
      <InfoLink url="/info/semantic-tableaux" />
    </div>
  );
};

export default PLTreePage;
