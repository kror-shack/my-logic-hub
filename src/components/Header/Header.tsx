import { Link } from "react-router-dom";
import TodaysDate from "../TodaysDate/TodaysDate";
import "./Header.scss";

type Props = {
  heading: string;
  home?: boolean;
};

const Header = ({ heading, home = false }: Props) => {
  return (
    <header className="Header">
      {!home ? <Link to="/">Home</Link> : <p></p>}
      <h1>{heading}</h1>
      <TodaysDate />
    </header>
  );
};

export default Header;
