import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VennDiagramPage from "./pages/VennDiagramPage";

type Structure = {
  subject: string;
  predicate: string;
  type: string;
};

type SyllogisticFigure = {
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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VennDiagramPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
