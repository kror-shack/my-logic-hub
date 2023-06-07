import React, { useEffect, useState } from "react";
import "./App.css";
import VennCanvas from "./components/VennDiagramComponents/Body/VennCanvas/VennCanvas";
import convertArgumentToSyllogismFigure from "./utils/convertArgumentToSyllogismFigure/convertArgumentToSyllogismFigure";
import getStatementStructure from "./utils/convertArgumentToSyllogismFigure/syllogismHelperFuntions/getStatementStructure/getStatementStructure";
import getSyllogismFigure from "./utils/convertArgumentToSyllogismFigure/syllogismHelperFuntions/getSyllogismFigure/getSyllogismFigure";
import getSyllogismMood from "./utils/convertArgumentToSyllogismFigure/syllogismHelperFuntions/getSyllogismMood/getSyllogsimMood";
import getSyllogismTerms from "./utils/convertArgumentToSyllogismFigure/syllogismHelperFuntions/getSyllogismTerms/getSyllogismTerms";
import { checkForWordInString } from "./utils/convertArgumentToSyllogismFigure/syllogismHelperFuntions/getSyllogismTerms/gstHelperFunctions/gstHelperFunctions";

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
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Input 1:
            <input
              type="text"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
          </label>
          <label>
            Input 2:
            <input
              type="text"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
            />
          </label>
          <label>
            Input 3:
            <input
              type="text"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <p>figure: "{syllogisticfigure?.figure}",</p>
        <p>majorPremise: "{syllogisticfigure?.majorPremise}",</p>
        <p>minorPremise: "{syllogisticfigure?.minorPremise}",</p>
        <p>majorTerm: "{syllogisticfigure?.majorTerm}",</p>
        <p>minorTerm: "{syllogisticfigure?.minorTerm}",</p>
        <p>middleTerm: "{syllogisticfigure?.middleTerm}"</p>
        <div id="myCanvas"></div>
      </header>

      {syllogisticfigure && (
        <VennCanvas syllogisticFigure={syllogisticfigure!} />
      )}
    </div>
  );
}

export default App;
