import { useState } from "react";
import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import PropositionalLogicBody from "../../components/PropositionalLogicBody/PropositionalLogicBody";
import "./PropositionalLogicPage.scss";

/**
 * A React component for displaying a propositional logic calculator page.
 *
 * @component
 * @returns - A React JSX element representing the Propositional Logic Page.
 */
const PropositionalLogicPage = () => {
  const [notebookLinesRender, setNotebookLinesRender] = useState(0);

  return (
    <div className="Propositional-logic-page">
      <Header heading="Propositional Logic" />
      <NotebookLines key={notebookLinesRender} />
      <PropositionalLogicBody setNotebookLinesRender={setNotebookLinesRender} />
      <InfoLink url="/info/propositional-logic" />
    </div>
  );
};

export default PropositionalLogicPage;

export {};
