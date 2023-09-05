import { useCallback, useEffect, useState } from "react";
import "./NotebookLines.scss";

/**
 * Renders notebook lines in the background to give notebook like effect on the webpage.
 *
 * @component
 * @returns - A styled JSX element without any content.
 */
const NotebookLines = () => {
  const [totalHeight, setTotalHeight] = useState(0);
  const divs = Array.from({ length: totalHeight }, (_, index) => index + 1);

  const calculateTotalHeight = useCallback(() => {
    const screenHeight = document.documentElement.scrollHeight;
    const subtractedHeight = screenHeight - 5 * 16; // 5rem converted to pixels (1rem = 16px)
    const result = subtractedHeight / 3.3;
    setTotalHeight(Math.floor(result));
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(calculateTotalHeight, 10);
    };

    window.addEventListener("scroll", handleScroll);

    calculateTotalHeight();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [calculateTotalHeight]);

  return (
    <div className="notebook-lines" style={{ minHeight: totalHeight * 3.3 }}>
      <div className="column" style={{ minHeight: totalHeight * 3.3 }}></div>
      {divs.map((number) => (
        <div key={number} className="row"></div>
      ))}
    </div>
  );
};

export default NotebookLines;
