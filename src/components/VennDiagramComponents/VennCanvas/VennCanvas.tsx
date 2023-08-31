import React, { useEffect, useRef, useState } from "react";
import {
  Circle,
  SyllogisticFigure,
} from "../../../types/VennDiagramTypes/types";
import drawCircles from "./VennCanvasFunctions/drawCircles/drawCircles";
import fillCirlces from "./VennCanvasFunctions/fillCircles/fillCircles";
import getCircleDrawOrder from "../../../utils/VennDiagramUtils/getCircleDrawOrder/getCircleDrawOrder";
import getCirclesRelation from "../../../utils/VennDiagramUtils/getCirclesRelation/getCirclesRelation";
import "./VennCanvas.scss";
import {
  calculateBottomCircleMidpoints,
  calculateCircleRadius,
  calculateFirstCircleLabelOffset,
  calculateMidPointWithOffset,
  calculateSecondCircleLabelOffset,
  calculateThirdCircleLabelOffset,
  calculateTopCirclesMidPoints,
} from "../../../utils/VennDiagramUtils/canvasResizingFunctions/canvasResizingFunctions";
import getVennShading from "../../../utils/VennDiagramUtils/getVennShading/getVennShading";

type Props = {
  syllogisticFigure: SyllogisticFigure;
};

const VennCanvas = ({ syllogisticFigure }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [radius, setRadius] = useState(
    calculateCircleRadius(canvasWidth, canvasWidth)
  );
  const [circleOneCenter, setCircleOneCenter] = useState(
    calculateTopCirclesMidPoints(
      radius,
      calculateMidPointWithOffset(canvasWidth, canvasHeight)
    ).leftMidPoint
  );
  const [circleTwoCenter, setCircleTwoCenter] = useState(
    calculateTopCirclesMidPoints(
      radius,
      calculateMidPointWithOffset(canvasWidth, canvasHeight)
    ).rightMidPoint
  );
  const [circleThreeCenter, setCircleThreeCenter] = useState(
    calculateBottomCircleMidpoints(
      radius,
      calculateMidPointWithOffset(canvasWidth, canvasHeight)
    )
  );

  const [circles, setCircles] = useState<Circle[]>([]);

  const clearCanvas = (context: CanvasRenderingContext2D) => {
    // Clear the entire canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  useEffect(() => {
    // Update the circles state whenever syllogisticFigure changes
    setCircles([
      {
        center: circleOneCenter,
        radius: radius,
        color: "red",
        label: syllogisticFigure.minorTerm,
        offset: calculateFirstCircleLabelOffset(circleOneCenter, radius),
      },
      {
        center: circleTwoCenter,
        radius: radius,
        color: "blue",
        label: syllogisticFigure.majorTerm,
        offset: calculateSecondCircleLabelOffset(circleTwoCenter, radius),
      },
      {
        center: circleThreeCenter,
        radius: radius,
        color: "green",
        label: syllogisticFigure.middleTerm,
        offset: calculateThirdCircleLabelOffset(circleThreeCenter, radius),
      },
    ]);
  }, [
    syllogisticFigure.majorTerm,
    syllogisticFigure.middleTerm,
    syllogisticFigure.minorTerm,
    radius,
    circleOneCenter,
    circleTwoCenter,
    circleThreeCenter,
    syllogisticFigure,
  ]);

  useEffect(() => {
    if (circles.length === 0) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      clearCanvas(context);
    }
    drawCircles({ canvasRef, circles });
    const drawOrder = getVennShading(circles, syllogisticFigure);

    if (!drawOrder) return;
    fillCirlces({ canvasRef, circles, drawOrder });
  }, [
    radius,
    circleOneCenter,
    circleTwoCenter,
    circleThreeCenter,
    syllogisticFigure,
    circles,
  ]);

  useEffect(() => {
    const radius = calculateCircleRadius(canvasWidth, canvasHeight);
    setRadius(radius);
    const midPointOfCanvas = calculateMidPointWithOffset(
      canvasWidth,
      canvasHeight
    );
    const topCirclesMidPoint = calculateTopCirclesMidPoints(
      radius,
      midPointOfCanvas
    );
    setCircleOneCenter(topCirclesMidPoint.leftMidPoint);
    setCircleTwoCenter(topCirclesMidPoint.rightMidPoint);
    const bottomCircleMidPoint = calculateBottomCircleMidpoints(
      radius,
      midPointOfCanvas
    );
    setCircleThreeCenter(bottomCircleMidPoint);
  }, [canvasWidth, canvasHeight]);

  function findNearestMultiple(targetNumber: number, multiple: number) {
    const remainder = targetNumber % multiple;
    const lowerMultiple = targetNumber - remainder;
    const upperMultiple = lowerMultiple + multiple;

    if (
      Math.abs(targetNumber - lowerMultiple) <=
      Math.abs(targetNumber - upperMultiple)
    ) {
      return lowerMultiple;
    } else {
      return upperMultiple;
    }
  }

  useEffect(() => {
    /**
     * TO SET UP DIMENSIONS FOR CANVAS
     */
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const viewportWidth = window.outerWidth;
      const desiredWidth = 400;
      const desiredHeight = 350;

      const width =
        viewportWidth >= desiredWidth + 50 ? desiredWidth : viewportWidth * 0.8;

      const baseHeight = (width / desiredWidth) * desiredHeight;
      let height: number;
      if (viewportWidth < 380) {
        // to account for the notebook lines
        height = findNearestMultiple(baseHeight, 14 * 2.5);
      } else {
        height = findNearestMultiple(baseHeight, 16 * 2.5);
      }

      setCanvasWidth(width);

      setCanvasHeight(height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Venn-diagram-canvas">
      {" "}
      <canvas
        role="canvas"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
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

// function calculateCircleOffsetCoordinates(
//   circleIndex: 0 | 1 | 2,
//   radius: number,
//   center: { x: number; y: number }
// ) {
//   let offsetX: number;
//   let offsetY: number;
//   switch (circleIndex) {
//     case 0:
//       offsetX = center.x - radius - radius / 2;
//       offsetY = center.y - radius;
//       return { x: offsetX, y: offsetY };
//   }
// }
