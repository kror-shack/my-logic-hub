import React, { useEffect, useState } from "react";
import "./App.css";
import getStatementStructure from "./utils/getStatementStructure/getStatementStructure";
import getSyllogismFigure from "./utils/getSyllogismFigure/getSyllogismFigure";
import getSyllogismMood from "./utils/getSyllogismMood/getSyllogsimMood";
import getSyllogismTerms from "./utils/getSyllogismTerms/getSyllogismTerms.ts";
import { checkForWordInString } from "./utils/getSyllogismTerms/gstHelperFunctions/gstHelperFunctions";

function App() {
  const [figure, setFigure] = useState("nothing");

  useEffect(() => {
    const p1 = getStatementStructure("All artists are egotists.");
    const p2 = getStatementStructure("Some artists are paupers.");
    const conc = getStatementStructure("Therefore some paupers are egotists.");
    const terms = getSyllogismTerms(p1!, p2!, conc!);
    const mood = getSyllogismMood(terms, p1!, p2!, conc!);
    const figure = getSyllogismFigure(mood, p1!, p2!, conc!);
    setFigure(figure);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {figure}
        </a>
      </header>
    </div>
  );
}

export default App;
