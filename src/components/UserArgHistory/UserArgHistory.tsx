"use client";
import { useEffect, useState } from "react";
import { getDataFromLS } from "../../utils/services/helperFunctions/helperFunctions";
import Link from "next/link";
import "./UserArgHistory.scss";
import LoadingText from "../LoadingText/LoadingText";

const PREFIX = "userInput";

const UserHistory: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadHistory = () => {
      const items: string[] = [];

      // Collect and sort keys in descending order
      const sortedKeys = Object.keys(localStorage)
        .filter((key) => key.startsWith(PREFIX))
        .sort(
          (a, b) =>
            parseInt(b.substring(PREFIX.length)) -
            parseInt(a.substring(PREFIX.length))
        );

      // Fetch data in sorted order
      for (const key of sortedKeys) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            items.push(data);
          } catch (error) {
            console.log(error);
          }
        }
      }

      setHistory(items);
    };

    loadHistory();
  }, []);

  const clearAllArgsInLS = (): void => {
    setDeleting(true);
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    setDeleting(false);
    setHistory([]);
  };

  return (
    <div className="user-arg-history">
      <div className="container">
        <button className="clear-storage" onClick={clearAllArgsInLS}>
          Clear History
        </button>
        {!deleting && history.length === 0 ? (
          <p>No history available</p>
        ) : (
          history.map((item, index) => <ArgumentLink item={item} key={index} />)
        )}
        {deleting && <LoadingText />}
      </div>
    </div>
  );
};

export default UserHistory;

type ArgumentLinkProps = {
  item: string | URL;
};

const ArgumentLink = ({ item }: ArgumentLinkProps) => {
  const urlObj = new URL(item);
  const params = new URLSearchParams(urlObj.search);
  const encodedArgument = params.get("argument");
  const decodedArgument = encodedArgument
    ? JSON.parse(decodeURIComponent(encodedArgument))
    : "No argument";

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Link href={item}>
      {Array.isArray(decodedArgument) ? (
        decodedArgument.map((arg: string, i: number) => (
          <div key={i}>{arg}</div>
        ))
      ) : (
        <div>{decodedArgument}</div>
      )}
    </Link>
  );
};
