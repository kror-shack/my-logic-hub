import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import PropositionalLogicBody from "../../components/PropositionalLogicBody/PropositionalLogicBody";

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
