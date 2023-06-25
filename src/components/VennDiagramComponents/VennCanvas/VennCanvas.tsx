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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [radius, setRadius] = useState(80);
  const [circleOneCenter, setCircleOneCenter] = useState({ x: 150, y: 100 });
  const [circleTwoCenter, setCircleTwoCenter] = useState({ x: 270, y: 100 });
  const [circleThreeCenter, setCircleThreeCenter] = useState({
    x: 210,
    y: 180,
  });

  const [circles, setCircles] = useState<Circle[]>([
    {
      center: circleOneCenter,
      radius: radius,
      color: "red",
      label: syllogisticFigure.minorTerm,
      offset: {
        x: 100,
        y: 100,
      },
    },

    {
      center: circleTwoCenter,
      radius: radius,
      color: "blue",
      label: syllogisticFigure.majorTerm,
      offset: {
        x: 100,
        y: 100,
      },
    },

    {
      center: circleThreeCenter,
      radius: radius,
      color: "green",
      label: syllogisticFigure.middleTerm,
      offset: {
        x: 10,
        y: 100,
      },
    },
  ]);

  const clearCanvas = (context: CanvasRenderingContext2D) => {
    // Clear the entire canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  function calculateCircleOffsetCoordinates(
    circleIndex: 0 | 1 | 2,
    radius: number,
    center: { x: number; y: number }
  ) {
    let offsetX: number;
    let offsetY: number;
    switch (circleIndex) {
      case 0:
        offsetX = center.x - radius - radius / 2;
        offsetY = center.y - radius;
        return { x: offsetX, y: offsetY };
    }
  }

  useEffect(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) clearCanvas(context);
    drawCircles({ canvasRef, circles });
    const relations = getCirclesRelation({ circles, syllogisticFigure });
    console.log("--------------asdkjfhsdajkfnjskadfh----");
    console.log(relations);

    const drawOrder = getCircleDrawOrder({
      relations,
      syllogisticFigure,
    });
    console.log(drawOrder);
    if (!drawOrder) return;
    fillCirlces({ canvasRef, circles, drawOrder });
  });

  useEffect(() => {
    // Update the circles state whenever syllogisticFigure changes
    setCircles([
      {
        center: circleOneCenter,
        radius: radius,
        color: "red",
        label: syllogisticFigure.minorTerm,
        offset: { x: -220, y: -50 },
      },
      {
        center: circleTwoCenter,
        radius: radius,
        color: "blue",
        label: syllogisticFigure.majorTerm,
        offset: { x: 10, y: -50 },
      },
      {
        center: circleThreeCenter,
        radius: radius,
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
