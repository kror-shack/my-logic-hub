import { Link } from "react-router-dom";
import "./InfoLink.scss";

type Props = {
  url: string;
};

const InfoLink = ({ url }: Props) => {
  return (
    <p className="Info-link">
      See info <Link to={url}>here</Link>
    </p>
  );
};

export default InfoLink;
