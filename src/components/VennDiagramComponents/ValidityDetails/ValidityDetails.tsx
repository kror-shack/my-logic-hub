import { useEffect, useState } from "react";
import { SyllogisticFigure } from "../../../types/VennDiagramTypes/types";
import checkValidity from "../../../utils/VennDiagramUtils/checkValidity/checkValidity";
import "./ValidityDetails.scss";

type Props = {
  figure: string;
};

const ValidityDetails = ({ figure }: Props) => {
  const [validityName, setValidityName] = useState<string | null>(null);

  useEffect(() => {
    let validity = checkValidity(figure);
    validity ? setValidityName(validity) : setValidityName(null);
  }, [figure]);

  return (
    <div className="Validity-details">
      <div>{validityName ? <p>Valid</p> : <p>Invalid</p>}</div>
      <div>{validityName ? <p>{validityName}</p> : ""}</div>
    </div>
  );
};

export default ValidityDetails;
