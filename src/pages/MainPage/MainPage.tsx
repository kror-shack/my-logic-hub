import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.scss";
import { ReactComponent as VennDiagram } from "../../assets/svgs/venn-diagram.svg";
import { ReactComponent as TruthTable } from "../../assets/svgs/truth-table.svg";
import { ReactComponent as PropositionalLogic } from "../../assets/svgs/propositional-logic.svg";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const MainPage = () => {
  return (
    <div className="Main-page">
      <Header heading="LOGIC HUB" />
      <main className="button-container">
        <Link to="/PropositionalLogicPage">
          <div>
            <PropositionalLogic />
            <div className="info">
              <p>
                PropCalc is an propositional logic calculator that simplifies
                logical calculations and outputs the deduction steps. Input your
                logical propositions and formulas, and get instant accurate
                results based on standard logic principles.
              </p>
            </div>
          </div>
          <p>Propositional Logic Calculator</p>
          <div className="line"></div>
        </Link>
        <Link to="/VennDiagramPage">
          <div>
            <VennDiagram />
            <div className="info">
              <p>
                LogicVenn is a user-friendly app that generates Venn diagrams
                based on logical arguments. Simply input your statements or
                propositions, and the app instantly constructs accurate diagrams
                that visually depict relationships between sets.
              </p>
            </div>
          </div>
          <p>Logic Venn</p>
          <div className="line"></div>
        </Link>
        <Link to="/TruthTablePage">
          <div>
            <TruthTable />
            <div className="info">
              <p>
                TruthTableGenerator is a tool that simplifies the process of
                generating truth tables based on logical expressions. With this
                app, you can input your logical expressions, and generate truth
                tables that illustrate the truth values of each combination of
                inputs.
              </p>
            </div>
          </div>
          <p>Truth Table Generator</p>
          <div className="line"></div>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
