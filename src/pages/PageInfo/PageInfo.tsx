import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import { getInitials } from "../../utils/VennDiagramUtils/canvasResizingFunctions/canvasResizingFunctions";
import PageInfoData from "./PageInfoData";
import "./PageInfo.scss";
import { PageDetails } from "../../types/sharedTypes";

/**
 * Renders information about a specific page
 *
 * @component
 * @returns A JSX element encompassing the information about the page.
 */
function PageInfo() {
  const { pageName } = useParams();
  const navigate = useNavigate();
  const pageInfoData = PageInfoData;
  const [details, setDetails] = useState<PageDetails>();

  useEffect(() => {
    if (pageName) {
      const data = pageInfoData[pageName];
      if (data) setDetails(data);
      else navigate("*");
    } else navigate("*");
  }, [pageName]);

  return (
    <div className="Page-info">
      <Header heading="Info" />
      <NotebookLines />

      {details && (
        <div className="info-details-container">
          {/* <p className="right-align-text">
            Go to <Link to="/info">info page</Link>
          </p> */}
          <h1>{details.header} info</h1>
          <p className="description">{details.description}</p>
          <p>
            For more detailed information, see{" "}
            <a href={details.wikipediaLink}>Wikipedia</a>
          </p>
          <p>
            See {details.header} <Link to={details.webpage}>here</Link>{" "}
          </p>

          <h2>Input Syntax</h2>
          <p className="description">{details.inputSyntax.description}</p>

          <ul>
            {details.inputSyntax.symbols &&
              details.inputSyntax.symbols.map((symbol, index) => (
                <li key={index}>
                  <strong>{symbol.name}:</strong> {symbol.usage}
                  <br />
                  <em>Example:</em> {symbol.example}
                </li>
              ))}
          </ul>
          {details.supportedRules && (
            <>
              <h2>Supported Rules</h2>
              <ul>
                {details.supportedRules.map((rule, index) => (
                  <li key={index}>
                    <strong>{rule.name}</strong>
                    {rule.otherName && rule.otherName.length > 0 && (
                      <span> (Also known as: {rule.otherName.join(", ")})</span>
                    )}
                    <p>{rule.description}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PageInfo;
