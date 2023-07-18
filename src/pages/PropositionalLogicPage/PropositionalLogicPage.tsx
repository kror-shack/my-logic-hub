import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PropositionalLogicBody from "../../components/PropositionalLogicComponents/PropositionalLogicBody/PropositionalLogicBody";

const PropositionalLogicPage = () => {
  return (
    <div className="Propositional-logic-page">
      <Header heading="PROPOSITIONAL LOGIC CALCULATOR" />
      <PropositionalLogicBody />
      <Footer />
    </div>
  );
};

export default PropositionalLogicPage;

export {};
