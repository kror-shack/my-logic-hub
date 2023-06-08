import React, { useEffect, useState } from "react";
import { SyllogisticFigure } from "../../../types/VennDiagramTypes/types";
import convertArgumentToSyllogismFigure from "../../../utils/VennDiagramUtils/convertArgumentToSyllogismFigure/convertArgumentToSyllogismFigure";
import ArgumentInputForm from "../ArgumentInputForm/ArgumentInputForm";
import SyllogisticDetails from "../SyllogisticDetails/SyllogisticDetails";
import VennCanvas from "../VennCanvas/VennCanvas";

const Body = () => {
  console.log("this is the body component");
  const [premiseOne, setPremiseOne] = useState("All men are mortal.");
  const [premiseTwo, setPremiseTwo] = useState("Socrates is a man.");
  const [conc, setConc] = useState("Therefore, Socrates is mortal.");
  const [syllogisticfigure, setSyllogisticFigure] =
    useState<SyllogisticFigure | null>();

  useEffect(() => {
    console.log("in the use effeccccct");
    const updatedSyllogisticFigure = convertArgumentToSyllogismFigure(
      premiseOne,
      premiseTwo,
      conc
    );
    setSyllogisticFigure(updatedSyllogisticFigure);
  }, [premiseOne, premiseTwo, conc]);

  useEffect(() => {
    console.log("the syllogistic fifure has chanhged");
  }, [syllogisticfigure]);

  return (
    <div>
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
    </div>
  );
};

export default Body;
