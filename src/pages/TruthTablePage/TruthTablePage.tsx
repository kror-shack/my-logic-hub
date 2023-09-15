import { useState } from "react";
import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import TruthTableBody from "../../components/TruthTableBody/TruthTableBody";

/**
 * A React component displaying the truth table page.
 *
 * @returns - A JSX element with the respective page.
 */
const TruthTablePage = () => {
  const [notebookLinesRender, setNotebookLinesRender] = useState(0);

  return (
    <div className="Propositional-logic-page">
      <Header heading="Truth Table" />
      <NotebookLines key={notebookLinesRender} />
      <TruthTableBody setNotebookLinesRender={setNotebookLinesRender} />
      <InfoLink url="/info/truth-table" />
    </div>
  );
};

export default TruthTablePage;

export {};
