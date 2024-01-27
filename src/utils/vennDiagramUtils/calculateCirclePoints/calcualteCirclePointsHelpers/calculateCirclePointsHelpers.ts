import { Point } from "../../../../types/vennDiagramTypes/types";

function calculateAxis(
  circleOneIndex: number,
  wrtCircleIndex: number
): "x" | "xy" {
  if ((circleOneIndex === 0 || circleOneIndex === 1) && wrtCircleIndex === 2)
    return "x";
  else return "xy";
}

function checkPointInCircle(
  circleCenter: Point,
  circleRadius: number,
  point: Point,
  axis: "x" | "xy",
  relation?: true
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
      axis,
      relation
    );
  }
  return null;
}

function pointOnCircle(
  point: Point,
  circleX: number,
  circleY: number,
  radius: number,
  axis: "x" | "xy",
  relation?: true
): Point {
  const wrtCirclePoints = calculateWRTCirclePoints(
    circleX,
    circleY,
    radius,
    3500
  );

  const closestPoint = findClosestPoint(point, wrtCirclePoints, axis, relation);
  if (closestPoint) return closestPoint;
  else return point;
}

function calculateWRTCirclePoints(
  x_c: number,
  y_c: number,
  radius: number,
  numPoints: number = 100
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
  axis: "x" | "y" | "xy",
  relation?: true
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

        if (relation) {
          if (currentPoint.x > point.x) {
            const distance = Math.abs(point.y + currentPoint.y);

            if (distance < closestDistance) {
              closestPoint = currentPoint;
              closestDistance = distance;
            }
          }
        } else if (currentPoint.x < point.x) {
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

export {
  calculateAxis,
  calculateWRTCirclePoints,
  checkPointInCircle,
  findClosestPoint,
};
