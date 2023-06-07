import React, { useEffect, useState } from "react";
import "./App.css";
import VennCanvas from "./components/VennDiagramComponents/Body/VennCanvas/VennCanvas";
import convertArgumentToSyllogismFigure from "./utils/VennDiagramUtils/convertArgumentToSyllogismFigure/convertArgumentToSyllogismFigure";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VennDiagramPage from "./pages/VennDiagramPage";

type Structure = {
  subject: string;
  predicate: string;
  type: string;
};

type SyllogisticDetails = {
  figure: string;
  majorPremise: string;
  minorPremise: string;
  majorTerm: string;
  minorTerm: string;
  middleTerm: string;
  premise1: Structure;
  premise2: Structure;
  conc: Structure;
};

interface Circle {
  x: number;
  y: number;
  r: number;
  color: string;
}

function App() {
  const [syllogisticfigure, setSyllogisticFigure] =
    useState<SyllogisticDetails | null>();
  const [input1, setInput1] = useState("Some P is M");
  const [input2, setInput2] = useState("All M is S.");
  const [input3, setInput3] = useState("Some S is P.");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const syllogisticFigure = convertArgumentToSyllogismFigure(
      input1,
      input2,
      input3
    );
    setSyllogisticFigure(syllogisticFigure);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/VennWizard" element={<VennDiagramPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
