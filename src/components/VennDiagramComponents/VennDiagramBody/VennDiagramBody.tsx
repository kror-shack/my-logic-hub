"use client";
import React, { useEffect, useState } from "react";
import { SyllogisticFigure } from "../../../types/vennDiagramTypes/types";
import convertArgumentToSyllogismFigure from "../../../utils/vennDiagramUtils/convertArgumentToSyllogismFigure/convertArgumentToSyllogismFigure";
import InfoLink from "../../InfoLink/InfoLink";
import NotebookLines from "../../NotebookLines/NotebookLines";
import ArgumentInputForm from "../ArgumentInputForm/ArgumentInputForm";
import SyllogisticDetails from "../SyllogisticDetails/SyllogisticDetails";
import ValidityDetails from "../ValidityDetails/ValidityDetails";
import VennCanvas from "../VennCanvas/VennCanvas";
import "./VennDiagramBody.scss";
import { useSearchParams } from "next/navigation";
import { sampleVennDiagramArg } from "../../../data/sampleArguments/sampleArguments";
import { usePathname, useRouter } from "next/navigation";
import ReportArgumentButton from "../../ReportArgumentButton/ReportArgumentButton";
import { logArgs } from "../../../utils/services/logArgs/logArgs";

/**
 * A React component which displays the Venn Diagram body.
 *
 *
 * @returns A JSX Element with the input form, canvas, syllogistic detail, and validity details.
 */
const VennDiagramBody = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const encodedArgument = searchParams.get("argument");
  let argument = sampleVennDiagramArg;
  if (encodedArgument) {
    argument = JSON.parse(decodeURIComponent(encodedArgument));
  }

  const premiseOne = argument[0];
  const premiseTwo = argument[1];
  const conc = argument[2];

  const [syllogisticfigure, setSyllogisticFigure] =
    useState<SyllogisticFigure | null>();

  const getVennDetails = (
    premiseOne: string,
    premiseTwo: string,
    conc: string
  ) => {
    const updatedSyllogisticFigure = convertArgumentToSyllogismFigure(
      premiseOne,
      premiseTwo,
      conc
    );
    setSyllogisticFigure(updatedSyllogisticFigure);
    const vennArg = [premiseOne, premiseTwo, conc];
    const url = `${pathName}?argument=${encodeURI(JSON.stringify(vennArg))}`;
    router.push(url);
    logArgs("venn-diagram");
  };

  return (
    <main>
      <div className="Venn-diagram-body Page-body">
        <ArgumentInputForm
          premiseOne={premiseOne}
          premiseTwo={premiseTwo}
          conc={conc}
          getVennDetails={getVennDetails}
        />

        {syllogisticfigure && (
          <>
            <VennCanvas syllogisticFigure={syllogisticfigure} />
            <ReportArgumentButton />
          </>
        )}
        {syllogisticfigure && (
          <SyllogisticDetails syllogisticFigure={syllogisticfigure} />
        )}
        {syllogisticfigure && (
          <ValidityDetails figure={syllogisticfigure.figure} />
        )}
      </div>
    </main>
  );
};

export default VennDiagramBody;
