"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import NotebookLines from "../../../components/NotebookLines/NotebookLines";
import { getInitials } from "../../../utils/vennDiagramUtils/canvasResizingFunctions/canvasResizingFunctions";
import PageInfoData from "./PageInfoData";
import "./PageInfo.scss";
import { PageDetails } from "../../../types/sharedTypes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/**
 * Renders information about a specific page
 *
 * @component
 * @returns A JSX element encompassing the information about the page.
 */

function PageInfo() {
  function getStringAfterLastSlash(inputString: string) {
    const segments = inputString.split("/");

    const lastSegment = segments.pop();

    return lastSegment;
  }

  const router = useRouter();
  const pageName = getStringAfterLastSlash(usePathname());
  let details: PageDetails = {} as PageDetails;
  const pageInfoData = PageInfoData;
  if (typeof pageName === "string") {
    details = pageInfoData[pageName];
  }

  return (
    <div className="Page-info">
      <Header heading="Info" />

      {details && (
        <div className="info-details-container">
          <h1>{details.header} info</h1>
          <p className="description">{details.description}</p>
          <p>
            For more detailed information, see{" "}
            <a href={details.wikipediaLink}>Wikipedia</a>
          </p>
          <p>
            See {details.header} <Link href={details.webpage}>here</Link>{" "}
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
