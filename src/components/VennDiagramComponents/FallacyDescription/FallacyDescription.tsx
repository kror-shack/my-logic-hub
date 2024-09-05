import React from "react";
import "./FallacyDescription.scss";

type Props = {
  text: string;
};
const FallacyDescription = ({ text }: Props) => {
  return (
    <div className="fallacy-description">
      <h2>Fallacy Note: </h2>
      <p>{text}</p>
      <p>
        Due to this syllogistic argument containing a fallacy the details and
        diagram below may not be accurate. If you think this is a mistake please
        feel free to report the argument using the button given above.
      </p>
    </div>
  );
};

export default FallacyDescription;
