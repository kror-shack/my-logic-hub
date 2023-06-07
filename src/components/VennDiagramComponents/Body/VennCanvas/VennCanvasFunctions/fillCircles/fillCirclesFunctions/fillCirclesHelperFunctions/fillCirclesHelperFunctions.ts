import { Circle, Point } from "../../../../../../../../types/types";

function calculateCirclePoints(
  context: CanvasRenderingContext2D | undefined,
  circles: Circle[],
  circleIndex: 0 | 1 | 2,
  wrtCircleIndex: 0 | 1 | 2,
  numPoints: number = 50
): { x: number; y: number }[] {
  const circle = circles[circleIndex];
  const wrtCircle = circles[wrtCircleIndex];

  const points: { x: number; y: number }[] = [];
  const angleIncrement: number = (2 * Math.PI) / numPoints;
  const angleIncrementStart = circleIndex === 2 ? 90 : 0;

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

function calculateAxis(
  circleOneIndex: number,
  wrtCircleIndex: number
): "x" | "xy" {
  if (circleOneIndex === 0 && wrtCircleIndex === 2) return "x";
  else return "xy";
}

function checkPointInCircle(
  circleCenter: Point,
  circleRadius: number,
  point: Point,
  axis: "x" | "xy"
): Point | null {
  // Calculate the distance between the circle center and the given point
  const distance = Math.sqrt(
    Math.pow(point.x - circleCenter.x, 2) +
      Math.pow(point.y - circleCenter.y, 2)
  );

  // Check if the distance is less than the circle radius
  if (distance < circleRadius) {
    return pointOnCircle(
      point,
      circleCenter.x,
      circleCenter.y,
      circleRadius,
      axis
    );
  }
  return null;
}

function pointOnCircle(
  point: Point,
  circleX: number,
  circleY: number,
  radius: number,
  axis: "x" | "xy"
): Point {
  const wrtCirclePoints = calculateWRTCirclePoints(
    circleX,
    circleY,
    radius,
    1000
  );

  const closestPoint = findClosestPoint(point, wrtCirclePoints, axis);
  if (closestPoint) return closestPoint;
  else return point;
}

function calculateWRTCirclePoints(
  x_c: number,
  y_c: number,
  radius: number,
  numPoints: number = 40
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const angleIncrement: number = (2 * Math.PI) / numPoints;

  for (let i = 0; i < numPoints; i++) {
    const angle: number = i * angleIncrement;
    let x: number = x_c + radius * Math.cos(angle);
    let y: number = y_c + radius * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

//make into conditional
function findClosestPoint(
  point: Point,
  points: Point[],
  axis: "x" | "y" | "xy"
): Point | null {
  if (points.length === 0) {
    return null;
  }
  let closestPoint: Point | null = null;
  let closestDistance: number = Infinity;

  switch (axis) {
    case "x":
      for (let i = 0; i < points.length; i++) {
        const currentPoint = points[i];

        if (currentPoint.x < point.x) {
          const distance = Math.abs(point.y - currentPoint.y);

          if (distance < closestDistance) {
            closestPoint = currentPoint;
            closestDistance = distance;
          }
        }
      }
      break;

    case "xy":
      for (let i = 0; i < points.length; i++) {
        const currentPoint = points[i];

        if (currentPoint.y > point.y) {
          // Consider only points with y-coordinate lower than the given point
          const distance = Math.abs(point.x - currentPoint.x);

          if (distance < closestDistance) {
            closestPoint = currentPoint;
            closestDistance = distance;
          }
        }
      }
      break;
  }

  return closestPoint;
}

export { calculateCirclePoints };
