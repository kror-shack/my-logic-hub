import { Circle } from "../../../types/VennDiagramTypes/types";
import {
  calculateAxis,
  checkPointInCircle,
} from "./calcualteCirclePointsHelpers/calculateCirclePointsHelpers";

function calculateCirclePoints(
  context: CanvasRenderingContext2D | undefined,
  circles: Circle[],
  circleIndex: 0 | 1 | 2,
  wrtCircleIndex: 0 | 1 | 2,
  relation?: true,
  numPoints: number = 40
): { x: number; y: number }[] {
  /**
   * RELATION INDICATES THAT IT IS A RELATION BW 1 AND 2
   */
  const circle = circles[circleIndex];

  const points: { x: number; y: number }[] = [];
  const wrtCircle = circles[wrtCircleIndex];
  const angleIncrement: number = (2 * Math.PI) / numPoints;

  //THE ANGLE INCREMENT START IS KEPT DIFFERENT SO ALL THE LINES DO NOT
  // GO FROM LEFT TO RIGHT
  let angleIncrementStart = circleIndex === 2 ? 80 : 0;

  if (circleIndex === 1 && wrtCircleIndex === 2) {
    angleIncrementStart = 20;
  }

  for (let i = 0; i < numPoints; i++) {
    const angle: number = angleIncrementStart + i * angleIncrement;
    let x: number = circle.center.x + circle.radius * Math.cos(angle);
    let y: number = circle.center.y + circle.radius * Math.sin(angle);
    let axis = calculateAxis(circleIndex, wrtCircleIndex);
    console.log("axis for " + circleIndex + axis);
    let symPoints = checkPointInCircle(
      { x: wrtCircle.center.x, y: wrtCircle.center.y },
      wrtCircle.radius,
      {
        x,
        y,
      },
      axis,
      relation
    );

    if (!symPoints) points.push({ x, y });
    //  (symPoints.x && symPoints.y) ? points.push(symPoints) : points.push({x1, y1})
    else points.push(symPoints);
  }
  return points;
}

export { calculateCirclePoints };
