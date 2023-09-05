import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import PropositionalLogicBody from "../../components/PropositionalLogicBody/PropositionalLogicBody";

/**
 * A React component for displaying a propositional logic calculator page.
 *
 * @component
 * @returns - A React JSX element representing the Propositional Logic Page.
 */
const PropositionalLogicPage = () => {
  return (
    <div className="Propositional-logic-page">
      <Header heading="Propositional Logic" />
      <NotebookLines />
      <PropositionalLogicBody />
    </div>
  );
};

export default PropositionalLogicPage;

export {};
