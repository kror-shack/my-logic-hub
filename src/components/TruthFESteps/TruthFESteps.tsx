import { transformSymbolsForDisplay } from "../../utils/helperFunctions/tranfromSymbols/transformSymbols";
import ReportArgumentButton from "../ReportArgumentButton/ReportArgumentButton";
import "./TruthFESteps.scss";
type Props = {
  truthFESteps: string[] | false;
};
const TruthFESteps = ({ truthFESteps }: Props) => {
  return (
    <div className="truth-fe">
      <ReportArgumentButton />
      <div className="truth-fe-container">
        {truthFESteps ? (
          truthFESteps.map((el, i) => (
            <p>
              {i + 1}) {transformSymbolsForDisplay(el)}
            </p>
          ))
        ) : (
          <h2 className="invalid-desc">
            A countermodel for this argument could not be generated.
            <br />
            This version is currently in experimental mode. If you believe a
            valid counter-model for this argument can be generated, please feel
            free to report it using the button provided above.{" "}
          </h2>
        )}
      </div>
    </div>
  );
};

export default TruthFESteps;
