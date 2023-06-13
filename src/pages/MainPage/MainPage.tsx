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
        <Link to="/calculator2">
          <button>Calculator 2</button>
        </Link>
        <Link to="/calculator3">
          <button>Calculator 3</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
