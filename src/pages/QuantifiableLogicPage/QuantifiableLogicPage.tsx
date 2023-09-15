import { useState } from "react";
import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import QuantifiableLogicBody from "../../components/QuantifiableLogicBody/QuantifiableLogicBody";

/**
 * A React component for displaying a First order logic calculator page.
 *
 * @component
 * @returns - A React JSX element representing the FOL Page.
 */
const QuantifiableLogicPage = () => {
  const [notebookLinesRender, setNotebookLinesRender] = useState(0);
  return (
    <div className="Propositional-logic-page">
      <Header heading="First Order Logic" />
      <NotebookLines key={notebookLinesRender} />
      <QuantifiableLogicBody setNotebookLinesRender={setNotebookLinesRender} />
      <InfoLink url="/info/quantificational-logic" />
    </div>
  );
};

export default QuantifiableLogicPage;
