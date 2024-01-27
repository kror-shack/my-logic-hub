"use client";
import React, { useEffect, useState } from "react";
import "./InfoLink.scss";
import Link from "next/link";

type Props = {
  url: string;
};

/**
 * Renders a reusable info link.
 *
 * @component
 * @param Props- The objects Props
 * @param Props.url - The url of the link to be redirected to.
 * @returns - A JSX link element.
 */
const InfoLink = ({ url }: Props) => {
  const [isScrolling, setIsScrolling] = useState(false);
  let scrollTimeout: NodeJS.Timeout;

  useEffect(() => {
    //to hide the text as the user is scrolling
    const handleScroll = (): void => {
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {!isScrolling && (
        <p className="Info-link">
          For details, see <Link href={url}>info</Link>
        </p>
      )}
    </>
  );
};

export default InfoLink;
