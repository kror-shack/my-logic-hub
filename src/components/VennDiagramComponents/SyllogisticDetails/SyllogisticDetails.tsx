import React from "react";
import { SyllogisticFigure } from "../../../types/VennDiagramTypes/types";

type Structure = {
  statement: string;
  mood: string;
  figure: string;
};

type Props = {
  syllogisticFigure: SyllogisticFigure;
};

const SyllogisticDetails: React.FC<Props> = ({ syllogisticFigure }) => {
  return (
    <div>
      <h2>Syllogistic Details</h2>
      <p>Figure: {syllogisticFigure.figure}</p>
      <p>Major Premise: {syllogisticFigure.majorPremise}</p>
      <p>Minor Premise: {syllogisticFigure.minorPremise}</p>
      <p>Major Term: {syllogisticFigure.majorTerm}</p>
      <p>Minor Term: {syllogisticFigure.minorTerm}</p>
      <p>Middle Term: {syllogisticFigure.middleTerm}</p>
    </div>
  );
};

export default SyllogisticDetails;
