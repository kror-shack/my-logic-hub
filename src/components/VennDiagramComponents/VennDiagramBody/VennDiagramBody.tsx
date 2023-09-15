import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SyllogisticFigure } from "../../../types/VennDiagramTypes/types";
import convertArgumentToSyllogismFigure from "../../../utils/VennDiagramUtils/convertArgumentToSyllogismFigure/convertArgumentToSyllogismFigure";
import InfoLink from "../../InfoLink/InfoLink";
import NotebookLines from "../../NotebookLines/NotebookLines";
import ArgumentInputForm from "../ArgumentInputForm/ArgumentInputForm";
import SyllogisticDetails from "../SyllogisticDetails/SyllogisticDetails";
import ValidityDetails from "../ValidityDetails/ValidityDetails";
import VennCanvas from "../VennCanvas/VennCanvas";
import "./VennDiagramBody.scss";

/**
 * A React component which displays the Venn Diagram body.
 *
 *
 * @returns A JSX Element with the input form, canvas, syllogistic detail, and validity details.
 */
const VennDiagramBody = () => {
  const [premiseOne, setPremiseOne] = useState("All men are mortal.");
  const [premiseTwo, setPremiseTwo] = useState("Socrates is a man.");
  const [conc, setConc] = useState("Therefore, Socrates is mortal.");
  const [syllogisticfigure, setSyllogisticFigure] =
    useState<SyllogisticFigure | null>();

  useEffect(() => {
    const updatedSyllogisticFigure = convertArgumentToSyllogismFigure(
      premiseOne,
      premiseTwo,
      conc
    );
    setSyllogisticFigure(updatedSyllogisticFigure);
  }, [premiseOne, premiseTwo, conc]);

  useEffect(() => {}, [syllogisticfigure]);

  return (
    <main>
      <div className="Venn-diagram-body">
        <ArgumentInputForm
          premiseOne={premiseOne}
          premiseTwo={premiseTwo}
          conc={conc}
          setPremiseOne={setPremiseOne}
          setPremiseTwo={setPremiseTwo}
          setConc={setConc}
        />
        {syllogisticfigure && (
          <VennCanvas syllogisticFigure={syllogisticfigure} />
        )}
        {syllogisticfigure && (
          <SyllogisticDetails syllogisticFigure={syllogisticfigure} />
        )}
        {syllogisticfigure && (
          <ValidityDetails figure={syllogisticfigure.figure} />
        )}
      </div>
    </main>
  );
};

export default VennDiagramBody;
