"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./NotebookLines.scss";
import { usePathname } from "next/navigation";

/**
 * Renders notebook lines in the background to give notebook like effect on the webpage.
 *
 * @component
 * @returns - A styled JSX element without any content.
 */
const NotebookLines = () => {
  const pageName = usePathname();
  const [totalHeight, setTotalHeight] = useState(0);
  const [optimizedHeight, setOptimizedHeight] = useState(0);

  const divs = Array.from({ length: totalHeight }, (_, index) => index + 1);

  const calculateTotalHeight = useCallback((screenHeight: number) => {
    const subtractedHeight = screenHeight - 5 * 16; // 5rem converted to pixels (1rem = 16px)
    const result = subtractedHeight / 3.3;
    setTotalHeight(Math.floor(result));
  }, []);

  useEffect(() => {
    /**
     * Increases the height of the the document as the
     * user scrolls
     */
    const handleScroll = () => {
      calculateTotalHeight(document.documentElement.scrollHeight);
    };

    window.addEventListener("scroll", handleScroll);

    calculateTotalHeight(document.documentElement.scrollHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [calculateTotalHeight]);

  useEffect(() => {
    /**
     * Resets the total height if the document height decreases
     */
    let page = document.getElementsByClassName("Page-layout")[0];

    const resizeObserver = new ResizeObserver((entries) => {
      if (page.clientHeight < document.documentElement.scrollHeight) {
        calculateTotalHeight(page.getBoundingClientRect().height);
      }
    });

    if (page) {
      resizeObserver.observe(page);
    } else {
      calculateTotalHeight(window.innerHeight);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [pageName]);

  return (
    <div className="notebook-lines" style={{ minHeight: totalHeight * 3.3 }}>
      <span className="column" style={{ minHeight: totalHeight * 3.3 }}></span>
      {divs.map((number) => (
        <span key={number} className="row"></span>
      ))}
    </div>
  );
};

export default NotebookLines;
