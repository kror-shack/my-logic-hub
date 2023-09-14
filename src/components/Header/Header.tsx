import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodaysDate from "../TodaysDate/TodaysDate";
import "./Header.scss";

type Props = {
  heading: string;
  home?: boolean;
};

/**
 * Renders a sticky header on the page.
 *
 *
 * @component
 * @param Props.heading - The heading to be displayed for the respective page.
 * @param Props.home - Boolean for whether the current page is the home page or not.
 * @returns - A JSX element with the header, date and conditional home button.
 */
const Header = ({ heading, home = false }: Props) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={isSticky ? "Header sticky" : "Header"}>
      {!home ? (
        <Link className="home-link" to="/">
          Home
        </Link>
      ) : (
        <Link className="home-link" to="/info">
          Info
        </Link>
      )}

      <h1>{heading}</h1>
      <TodaysDate />
    </header>
  );
};

export default Header;
