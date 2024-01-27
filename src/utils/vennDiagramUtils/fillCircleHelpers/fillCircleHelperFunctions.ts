import { Point } from "../../../types/vennDiagramTypes/types";

export function drawCrossOnCanvas(
  context: CanvasRenderingContext2D,
  x: number,
  y: number
): void {
  const crossSize = 10; // Size of the cross
  const rotationAngle = Math.PI / 1.7; // 90 degrees in radians

  context.strokeStyle = "red"; // Set cross color (black in this example)

  context.save(); // Save the current context state

  // Apply rotation transformation
  context.translate(x, y);
  context.rotate(rotationAngle);

  // Draw vertical line of the rotated cross
  context.beginPath();
  context.moveTo(0, -crossSize);
  context.lineTo(0, crossSize);
  context.stroke();

  // Draw horizontal line of the rotated cross
  context.beginPath();
  context.moveTo(-crossSize, 0);
  context.lineTo(crossSize, 0);
  context.stroke();

  context.restore(); // Restore the saved context state
}

export function drawLinesFromArray(
  context: CanvasRenderingContext2D | undefined | null,
  points: { x: number; y: number }[]
) {
  if (points.length < 3) {
    return;
  }

  const firstArray = points.slice(0, points.length / 2);
  const secondArray = points.slice(points.length / 2);

  const firstArrayFirstPoint = firstArray[0];
  const firstArrayLastPoint = firstArray[firstArray.length - 1];

  const secondArrayFirstPoint = secondArray[0];
  const secondArrayLastPoint = secondArray[secondArray.length - 1];

  drawLine(
    firstArrayFirstPoint.x,
    firstArrayFirstPoint.y,
    firstArrayLastPoint.x,
    firstArrayLastPoint.y,
    context
  );
  drawLine(
    secondArrayFirstPoint.x,
    secondArrayFirstPoint.y,
    secondArrayLastPoint.x,
    secondArrayLastPoint.y,
    context
  );

  firstArray.shift();
  firstArray.pop();

  secondArray.shift();
  secondArray.pop();

  drawLinesFromArray(context, firstArray.concat(secondArray));
}

export function drawLinesBetweenPoints(
  ctx: CanvasRenderingContext2D,
  array1: Point[],
  array2: Point[]
): void {
  const length = Math.min(array1.length, array2.length);

  for (let i = 0; i < length; i++) {
    const point1 = array1[i];
    const point2 = array2[i];

    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
  }
}

export function findMidPoint(point1: Point, point2: Point): Point {
  const midX = (point1.x + point2.x) / 2;
  const midY = (point1.y + point2.y) / 2;

  return { x: midX, y: midY };
}

export function filterPointsBetween(
  point1: Point,
  point2: Point,
  pointsArray: Point[],
  direction: "top" | "bottom" | "left" | "right"
): Point[] {
  const filteredPoints: Point[] = [];

  for (const point of pointsArray) {
    switch (direction) {
      case "top":
        if (
          ((point.x >= point1.x && point.x <= point2.x) ||
            (point.x >= point2.x && point.x <= point1.x)) &&
          (point.y <= point1.y || point.y <= point2.y)
        ) {
          filteredPoints.push(point);
        }
        break;

      case "bottom":
        if (
          ((point.x >= point1.x && point.x <= point2.x) ||
            (point.x >= point2.x && point.x <= point1.x)) &&
          (point.y >= point1.y || point.y >= point2.y)
        ) {
          filteredPoints.push(point);
        }
        break;

      case "right":
        if (
          point.x >= point1.x &&
          point.x >= point2.x &&
          (point.y <= point1.y || point.y >= point2.y)
        ) {
          filteredPoints.push(point);
        }
        break;

      case "left":
        if (
          point.x <= point1.x &&
          point.x <= point2.x &&
          (point.y <= point1.y || point.y >= point2.y)
        ) {
          filteredPoints.push(point);
        }
        break;
    }
  }

  return filteredPoints;
}
export function findCommonPoints(
  array1: Point[],
  array2: Point[]
): { firstCircleCommonPoints: Point[]; secondCircleCommonPoints: Point[] } {
  const result: {
    firstCircleCommonPoints: Point[];
    secondCircleCommonPoints: Point[];
  } = {
    firstCircleCommonPoints: [],
    secondCircleCommonPoints: [],
  };
  let minDistance1 = Number.MAX_VALUE;
  let minDistance2 = Number.MAX_VALUE;

  for (const point1 of array1) {
    for (const point2 of array2) {
      const distance = Math.sqrt(
        Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
      );

      if (distance < minDistance1) {
        minDistance2 = minDistance1;
        minDistance1 = distance;
        result.firstCircleCommonPoints[1] = result.firstCircleCommonPoints[0];
        result.secondCircleCommonPoints[1] = result.secondCircleCommonPoints[0];
        result.firstCircleCommonPoints[0] = { ...point1 };
        result.secondCircleCommonPoints[0] = { ...point2 };
      } else if (distance < minDistance2) {
        minDistance2 = distance;
        result.firstCircleCommonPoints[1] = { ...point1 };
        result.secondCircleCommonPoints[1] = { ...point2 };
      }
    }
  }

  return result;
}

export function calculateCirclePoints(
  x_c: number,
  y_c: number,
  radius: number,
  numPoints: number = 150
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

/**
 * Non exported helper function
 */
function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  context: CanvasRenderingContext2D | null | undefined,
  color: string = "black"
) {
  if (!context) return null;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.stroke();
}

/**
 * FOR DEBUGGING PURPOSES
 */
const drawPoints = (
  ctx: CanvasRenderingContext2D,
  points: Point[],
  radius: number,
  color: string
) => {
  if (!ctx) return;
  for (let i = 0; i < points.length; i++) {
    const x = points[i].x;
    const y = points[i].y;
    if (!x || !y) return;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
};
