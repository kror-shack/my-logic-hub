import { useCallback, useEffect, useState } from "react";
import "./NotebookLines.scss";

const NotebookLines = () => {
  const [totalHeight, setTotalHeight] = useState(0);
  console.log(`height: ${totalHeight}`);
  const divs = Array.from({ length: totalHeight }, (_, index) => index + 1);

  const calculateTotalHeight = useCallback(() => {
    console.log("calculating total height");
    const screenHeight = document.documentElement.scrollHeight;
    const subtractedHeight = screenHeight - 5 * 16; // 5rem converted to pixels (1rem = 16px)
    const result = subtractedHeight / 3.3;
    console.log(result);
    setTotalHeight(Math.floor(result));
  }, []);

  useEffect(() => {
    // Use debouncing to limit the calculation during scrolling
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(calculateTotalHeight, 100); // 500ms debounce delay
    };

    // Listen to scroll events and call the debounced handler
    window.addEventListener("scroll", handleScroll);

    // Calculate total height initially when the component mounts
    calculateTotalHeight();

    // Clean up the event listener when the component unmounts
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
