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

// function calculateCircleOnePoints(
//   x_c: number,
//   y_c: number,
//   radius: number,
//   numPoints: number = 40
// ): { x: number; y: number }[] {
//   const points: { x: number; y: number }[] = [];
//   const angleIncrement: number = (2 * Math.PI) / numPoints;

//   for (let i = 0; i < numPoints; i++) {
//     const angle: number = i * angleIncrement;
//     let x: number = x_c + radius * Math.cos(angle);
//     let y: number = y_c + radius * Math.sin(angle);
//     points.push({ x, y });
//   }
//   return points;
// }

// function pointOnCircle(
//   point: Point,
//   circleX: number,
//   circleY: number,
//   radius: number,
//   context: CanvasRenderingContext2D
// ): Point {
//   // // console.logloglog(`this is the previous point: ${point.x} ${point.y}`);
//   // Calculate the angle between the point and the center of the circle
//   // const angle = Math.atan2(point.y - circleY, point.x - circleX);

//   // Calculate the new y value on the circumference of the circle
//   // const newY = circleY + radius * Math.sin(angle);

//   // Create a new point object with the same x value and the calculated y value
//   // const newPoint: Point = { x: point.x, y: newY };
//   const circleTwoPoints = calculateCircleOnePoints(
//     circleX,
//     circleY,
//     radius,
//     1000
//   );

//   const closestPoint = findClosestPoint(context, point, circleTwoPoints);
//   if (closestPoint) return closestPoint;
//   else return point;
// }

// function checkPointInCircle(
//   context: CanvasRenderingContext2D | undefined,
//   circleCenter: Point,
//   circleRadius: number,
//   point: Point
// ): Point | null {
//   // Calculate the distance between the circle center and the given point
//   const distance = Math.sqrt(
//     Math.pow(point.x - circleCenter.x, 2) +
//       Math.pow(point.y - circleCenter.y, 2)
//   );

//   // Check if the distance is less than the circle radius
//   if (distance < circleRadius && context) {
//     return pointOnCircle(
//       point,
//       circleCenter.x,
//       circleCenter.y,
//       circleRadius,
//       context
//     );
//   }
//   return null;
// }

// function calculateCirclePoints(
//   context: CanvasRenderingContext2D | undefined,
//   x_c: number,
//   y_c: number,
//   radius: number,
//   numPoints: number = 60
// ): { x: number; y: number }[] {
//   const points: Point[] = [];
//   const angleIncrement: number = (2 * Math.PI) / numPoints;

//   for (let i = 0; i < numPoints; i++) {
//     const angle: number = 90 + i * angleIncrement;
//     let x: number = x_c + radius * Math.cos(angle);
//     let y: number = y_c + radius * Math.sin(angle);
//     let symPoints = checkPointInCircle(context, { x: 270, y: 100 }, 80, {
//       x,
//       y,
//     });
//     if (!symPoints) points.push({ x, y });
//     //  (symPoints.x && symPoints.y) ? points.push(symPoints) : points.push({x1, y1})
//     else points.push(symPoints);
//   }
//   return points;
// }

function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  context: CanvasRenderingContext2D | null | undefined,
  color: string = "black"
) {
  if (!context) return null;
  // // console.logloglog("in the draw line funtion");
  // // console.logloglog(context);
  // // console.logloglog(x1, y1, x2, y2);
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
  context.translate(x, y + 10);
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

const fillThirdCircle = (
  context: CanvasRenderingContext2D | null | undefined,
  circles: Circle[],
  fillType: DrawOrderProperties
) => {
  if (!context) return;
  if (!fillType.thirdCircle) return;

  // // console.logloglog("in the fill third circle function");

  switch (fillType.thirdCircle) {
    case "shade wrt first":
      const pointsWRTFirst = calculateCirclePoints(context, circles, 2, 0);

      drawLinesFromArray(context, pointsWRTFirst);
      console.log("done with the third circle");

      break;

    case "shade wrt second":
      if (!context) return;
      const pointsWRTSecond = calculateCirclePoints(context, circles, 2, 1);

      drawLinesFromArray(context, pointsWRTSecond);
      break;

    case "cross":
      if (!context) return;
      // // console.logloglog("drawing cross for the thrid circle");
      drawCrossOnCanvas(context, circles[2].center.x, circles[2].center.y);
      break;
  }
};

export default fillThirdCircle;
