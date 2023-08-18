import React from "react";

const TodaysDate: React.FC = () => {
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
