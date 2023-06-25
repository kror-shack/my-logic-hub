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
  numPoints: number = 40
): { x: number; y: number }[] {
  const circle = circles[circleIndex];
  const wrtCircle = circles[wrtCircleIndex];

  const points: { x: number; y: number }[] = [];
  const angleIncrement: number = (2 * Math.PI) / numPoints;
  const angleIncrementStart = circleIndex === 2 ? 80 : 0;

  for (let i = 0; i < numPoints; i++) {
    const angle: number = angleIncrementStart + i * angleIncrement;
    let x: number = circle.center.x + circle.radius * Math.cos(angle);
    let y: number = circle.center.y + circle.radius * Math.sin(angle);
    let axis = calculateAxis(circleIndex, wrtCircleIndex);
    let symPoints = checkPointInCircle(
      { x: wrtCircle.center.x, y: wrtCircle.center.y },
      wrtCircle.radius,
      {
        x,
        y,
      },
      axis
    );
    if (!symPoints) points.push({ x, y });
    //  (symPoints.x && symPoints.y) ? points.push(symPoints) : points.push({x1, y1})
    else points.push(symPoints);
  }
  return points;
}

export { calculateCirclePoints };
