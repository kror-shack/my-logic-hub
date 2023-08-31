import React from "react";
import { SyllogisticFigure } from "../../../types/VennDiagramTypes/types";
import "./SyllogisticDetails.scss";

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
    <div className="Syllogistic-details">
      <h2>Syllogistic Details:-</h2>
      <ul>
        <li>
          <h6>Figure:</h6>
          <p> {syllogisticFigure.figure}</p>
        </li>
        <li>
          <h6>Major Premise:</h6>
          <p> {syllogisticFigure.majorPremise}</p>
        </li>
        <li>
          <h6>Minor Premise:</h6>
          <p>{syllogisticFigure.minorPremise}</p>
        </li>
        <li>
          <h6>Major Term:</h6>
          <p>{syllogisticFigure.majorTerm}</p>
        </li>
        <li>
          <h6>Minor Term:</h6>
          <p>{syllogisticFigure.minorTerm}</p>
        </li>
        <li>
          <h6>Middle Term: </h6>
          <p>{syllogisticFigure.middleTerm}</p>
        </li>
      </ul>
    </div>
  );
};

export default SyllogisticDetails;
