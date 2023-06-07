import {
  Circle,
  DrawOrder,
  DrawOrderProperties,
  Relations,
} from "../../../../../../../../types/types";
import { calculateCirclePoints } from "../fillCirclesHelperFunctions/fillCirclesHelperFunctions";

interface Point {
  x: number;
  y: number;
}

function isPointOnCircle(point: Point, circle: Circle): boolean {
  const distance = Math.sqrt(
    Math.pow(point.x - circle.center.x, 2) +
      Math.pow(point.y - circle.center.y, 2)
  );

  return Math.abs(distance - circle.radius) < Number.EPSILON;
}

function drawDotsOnCanvas(
  context: CanvasRenderingContext2D,
  points: Point[]
): void {
  context.fillStyle = "black"; // Set dot color (black in this example)

  for (const point of points) {
    context.beginPath();
    context.arc(point.x, point.y, 3, 0, Math.PI * 2); // Draw a dot at the point
    context.fill();
  }
}

function fillCircleWithLine(
  context: CanvasRenderingContext2D | null | undefined,
  x: number,
  y: number,
  radius: number
): void {
  if (!context) return;

  const numOfLines = 20;
  const angleIncrement = (2 * Math.PI) / numOfLines;

  for (let i = 0; i < numOfLines; i++) {
    const angle = i * angleIncrement;

    const startX = x - radius;
    const startY = y + radius * Math.sin(angle);

    const endX = x + radius;
    const endY = y + radius * Math.sin(angle);

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  }
}

function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  context: CanvasRenderingContext2D | null | undefined,
  color: string = "black"
) {
  if (!context) return null;
  // console.log("in the draw line funtion");
  // console.log(context);
  // console.log(x1, y1, x2, y2);
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.stroke();
}

function drawLinesFromArray(
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

function drawCrossOnCanvas(
  context: CanvasRenderingContext2D,
  x: number,
  y: number
): void {
  const crossSize = 10; // Size of the cross
  const rotationAngle = Math.PI / 1.3; // 90 degrees in radians

  context.strokeStyle = "black"; // Set cross color (black in this example)

  context.save(); // Save the current context state

  // Apply rotation transformation
  context.translate(x, y - 10);
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

// shade, cross, border-cross
const fillFirstCircle = (
  context: CanvasRenderingContext2D | null | undefined,
  circles: Circle[],
  fillType: DrawOrderProperties
) => {
  if (!fillType.firstCircle) return;
  switch (fillType.firstCircle) {
    case "shade wrt third":
      if (!context) return;
      const points = calculateCirclePoints(context, circles, 0, 2);
      // console.log(points);
      drawLinesFromArray(context, points);
      break;

    case "cross":
      if (!context) return;
      drawCrossOnCanvas(context, circles[0].center.x, circles[0].center.y);
      break;
  }
};

export default fillFirstCircle;
