import React, { useEffect } from "react";
import "./App.css";
import getStatementStructure from "./utils/getStatementStructure/getStatementStructure";

function App() {
  useEffect(() => {
    console.log(getStatementStructure("socrates isn't immortal"));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        s
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
