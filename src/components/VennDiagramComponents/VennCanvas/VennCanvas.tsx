import React, { useEffect, useRef, useState } from "react";
import {
  Circle,
  Structure,
  SyllogisticFigure,
} from "../../../types/VennDiagramTypes/types";
import checkValidity from "../../../utils/VennDiagramUtils/checkValidity/checkValidity";
import drawCircles from "./VennCanvasFunctions/drawCircles/drawCircles";
import fillCirlces from "./VennCanvasFunctions/fillCircles/fillCircles";
import getCircleDrawOrder from "../../../utils/VennDiagramUtils/getCircleDrawOrder/getCircleDrawOrder";
import getCirclesRelation from "../../../utils/VennDiagramUtils/getCirclesRelation/getCirclesRelation";
import "./VennCanvas.scss";

type Props = {
  syllogisticFigure: SyllogisticFigure;
};

const VennCanvas = ({ syllogisticFigure }: Props) => {
  console.log(syllogisticFigure);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<Circle[]>([
    {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: syllogisticFigure.minorTerm,
      offset: { x: -220, y: -50 },
    },
    {
      center: {
        x: 270,
        y: 100,
      },
      radius: 80,
      color: "blue",
      label: syllogisticFigure.majorTerm,
      offset: { x: 10, y: -50 },
    },
    {
      center: {
        x: 210,
        y: 180,
      },
      radius: 80,
      color: "green",
      label: syllogisticFigure.middleTerm,
      offset: {
        x: -110,
        y: 120,
      },
    },
  ]);

  const clearCanvas = (context: CanvasRenderingContext2D) => {
    // Clear the entire canvas
    console.log("clearing the entire canvas function");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  useEffect(
    () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      console.log(syllogisticFigure.minorTerm);
      if (context) clearCanvas(context);
      console.log(circles);
      drawCircles({ canvasRef, circles });
      const relations = getCirclesRelation({ circles, syllogisticFigure });
      const drawOrder = getCircleDrawOrder({
        relations,
        syllogisticFigure,
      });
      console.log(drawOrder);
      if (!drawOrder) return;
      fillCirlces({ canvasRef, circles, drawOrder });
    }
    // [
    //   // syllogisticFigure.figure,
    //   // syllogisticFigure.majorTerm,
    //   // syllogisticFigure.middleTerm,
    //   // syllogisticFigure.minorTerm,
    // ]
  );

  useEffect(() => {
    // Update the circles state whenever syllogisticFigure changes
    setCircles([
      {
        center: { x: 150, y: 100 },
        radius: 80,
        color: "red",
        label: syllogisticFigure.minorTerm,
        offset: { x: -220, y: -50 },
      },
      {
        center: { x: 270, y: 100 },
        radius: 80,
        color: "blue",
        label: syllogisticFigure.majorTerm,
        offset: { x: 10, y: -50 },
      },
      {
        center: { x: 210, y: 180 },
        radius: 80,
        color: "green",
        label: syllogisticFigure.middleTerm,
        offset: { x: -110, y: 120 },
      },
    ]);
  }, [
    syllogisticFigure.majorTerm,
    syllogisticFigure.middleTerm,
    syllogisticFigure.minorTerm,
  ]);

  return (
    <div className="Venn-diagram-canvas">
      {" "}
      <canvas role="canvas" ref={canvasRef} width={450} height={400} />
    </div>
  );
};

const propsComparator = (
  prevProps: { syllogisticFigure: SyllogisticFigure },
  nextProps: { syllogisticFigure: SyllogisticFigure }
): boolean => {
  const prevFigure = prevProps.syllogisticFigure;
  const nextFigure = nextProps.syllogisticFigure;

  return (
    prevFigure.figure === nextFigure.figure &&
    prevFigure.majorPremise === nextFigure.majorPremise &&
    prevFigure.minorPremise === nextFigure.minorPremise &&
    prevFigure.majorTerm === nextFigure.majorTerm &&
    prevFigure.minorTerm === nextFigure.minorTerm &&
    prevFigure.middleTerm === nextFigure.middleTerm
  );
};
export default React.memo(VennCanvas);
