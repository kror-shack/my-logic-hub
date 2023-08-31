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
      <div>
        {validityName ? (
          <p>
            This argument is a <span>valid</span> syllogistic argument.
          </p>
        ) : (
          <p>
            THis argument is an <span>invalid</span> syllogistic argument
          </p>
        )}
      </div>
      <div>
        {validityName ? (
          <p>
            The argument has the form of: <span>{validityName}</span>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ValidityDetails;
