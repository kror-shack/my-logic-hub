import React, { useEffect, useState } from "react";
import "./TodaysDate.scss";

/**
 * A React component that displays today's date in a dd/mm/yy.
 *
 * @component
 * @returns- A React JSX element displaying the formatted date.
 */
const TodaysDate = () => {
  const [isWideScreen, setIsWideScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth > 768);
    };

    checkScreenWidth(); // Initial check

    const handleResize = () => {
      checkScreenWidth();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = isWideScreen
    ? {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }
    : {
        day: "2-digit",
        month: "2-digit",
      };
  const formattedDate: string = today.toLocaleDateString(undefined, options);

  return <p className="Date">{formattedDate}</p>;
};

export default TodaysDate;
