import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodaysDate from "../TodaysDate/TodaysDate";
import "./Header.scss";

type Props = {
  heading: string;
  home?: boolean;
};

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
      {!home ? <Link to="/">Home</Link> : <p></p>}
      <h1>{heading}</h1>
      <TodaysDate />
    </header>
  );
};

export default Header;
