import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="Main-page">
      <h1>Main Page</h1>
      <div className="button-container">
        <Link to="/VennDiagramPage">
          <button>Venn Diagram Page</button>
        </Link>
        <Link to="/TruthTablePage">
          <button>Truth Table Page</button>
        </Link>
        <Link to="/PropositionalLogicPage">
          <button>Propositional Logic Page</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
