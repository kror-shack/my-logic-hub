import "./NonSFCSDescription.scss";

type Props = {
  premiseOne: string;
  premiseTwo: string;
  conc: string;
};

const NonSFCSDescription = ({ premiseOne, premiseTwo, conc }: Props) => {
  return (
    <div className="fallacy-description">
      <h2>Standard Form Note: </h2>
      <p>
        The argument provided was not in standard form. In a standard form
        categorical syllogism the major premise must come first, followed by the
        minor premise. The argument has been rearranged accordingly, and the
        fallacy details below refer to this updated argument.
      </p>
      <p>p1) {premiseTwo}</p>
      <p>p2) {premiseOne}</p>
      <p>conc) {conc}</p>
    </div>
  );
};

export default NonSFCSDescription;
