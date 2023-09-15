import { useState } from "react";
import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import PLIndirectProofBody from "../../components/PLIndirectProofBody/PLIndirectProofBody";
import "./PLIndirectProofPage.scss";

/**
 * A React component displaying the propositional logic indirect proof page.
 *
 * @returns - A JSX element with the respective page.
 */
const PLIndirectProofPage = () => {
  const [notebookLinesRender, setNotebookLinesRender] = useState(0);

  return (
    <div className="Propositional-logic-page">
      <Header heading="PL Indirect Proof" />
      <NotebookLines key={notebookLinesRender} />
      <PLIndirectProofBody setNotebookLinesRender={setNotebookLinesRender} />
      <InfoLink url="/info/propositional-logic-indirect-proof" />
    </div>
  );
};

export default PLIndirectProofPage;
