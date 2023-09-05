import React from "react";

/**
 * A React component that displays today's date in a dd/mm/yy.
 *
 * @component
 * @returns {JSX.Element} - A React JSX element displaying the formatted date.
 */
const TodaysDate = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  const formattedDate: string = today.toLocaleDateString(undefined, options);

  return <p>{formattedDate}</p>;
};

export default TodaysDate;
