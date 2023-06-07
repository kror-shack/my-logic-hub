import {
  Circle,
  DrawOrderProperties,
  Point,
} from "../../../../../../../../types/types";

// calculate the points once
// and store them in a state
function calculateCirclePoints(
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

function findCommonPoints(
  array1: Point[],
  array2: Point[]
): { circleOneCommonPoints: Point[]; circleThreeCommonPoints: Point[] } {
  const result: {
    circleOneCommonPoints: Point[];
    circleThreeCommonPoints: Point[];
  } = {
    circleOneCommonPoints: [],
    circleThreeCommonPoints: [],
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
        result.circleOneCommonPoints[1] = result.circleOneCommonPoints[0];
        result.circleThreeCommonPoints[1] = result.circleThreeCommonPoints[0];
        result.circleOneCommonPoints[0] = { ...point1 };
        result.circleThreeCommonPoints[0] = { ...point2 };
      } else if (distance < minDistance2) {
        minDistance2 = distance;
        result.circleOneCommonPoints[1] = { ...point1 };
        result.circleThreeCommonPoints[1] = { ...point2 };
      }
    }
  }

  return result;
}

function findCommonPoints2(
  array1: Point[],
  array2: Point[]
): {
  circleTwoCommonPoints2: Point[];
  circleThreeCommonPoints2: Point[];
} {
  const result: {
    circleTwoCommonPoints2: Point[];
    circleThreeCommonPoints2: Point[];
  } = {
    circleTwoCommonPoints2: [],
    circleThreeCommonPoints2: [],
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
        result.circleTwoCommonPoints2[1] = result.circleTwoCommonPoints2[0];
        result.circleThreeCommonPoints2[1] = result.circleThreeCommonPoints2[0];
        result.circleTwoCommonPoints2[0] = { ...point1 };
        result.circleThreeCommonPoints2[0] = { ...point2 };
      } else if (distance < minDistance2) {
        minDistance2 = distance;
        result.circleTwoCommonPoints2[1] = { ...point1 };
        result.circleThreeCommonPoints2[1] = { ...point2 };
      }
    }
  }

  return result;
}

function drawCrossOnCanvas(
  context: CanvasRenderingContext2D,
  x: number,
  y: number
): void {
  // console.log("drawing cross on canvas");
  const crossSize = 8; // Size of the cross
  const rotationAngle = Math.PI / 1.3;

  context.strokeStyle = "black"; // Set cross color (black in this example)

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

function filterPointsBetween(
  point1: Point,
  point2: Point,
  pointsArray: Point[]
): Point[] {
  const filteredPoints: Point[] = [];

  for (const point of pointsArray) {
    if (
      (point.x >= point1.x && point.x <= point2.x) ||
      (point.x >= point2.x && point.x <= point1.x)
    ) {
      if (
        (point.y >= point1.y && point.y <= point2.y) ||
        (point.y >= point2.y && point.y <= point1.y)
      ) {
        filteredPoints.push(point);
      }
    }
  }

  return filteredPoints;
}

function drawLinesBetweenPoints(
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

function findMidPoint(point1: Point, point2: Point): Point {
  const midX = (point1.x + point2.x) / 2;
  const midY = (point1.y + point2.y) / 2;

  return { x: midX, y: midY };
}

//calculate all the circles border;
// fill the intersection according to the border values
const fillIntersection = (
  context: CanvasRenderingContext2D | null | undefined,
  circles: Circle[],
  fillType: DrawOrderProperties
) => {
  if (!context) return;
  // if (!fillType.thirdCircle) return;

  let circleOnePoints = calculateCirclePoints(
    circles[0].center.x,
    circles[0].center.y,
    circles[0].radius
  );
  let circleTwoPoints = calculateCirclePoints(
    circles[1].center.x,
    circles[1].center.y,
    circles[1].radius
  );
  let circleThreePoints = calculateCirclePoints(
    circles[2].center.x,
    circles[2].center.y,
    circles[2].radius
  );
  let { circleOneCommonPoints, circleThreeCommonPoints } = findCommonPoints(
    circleOnePoints,
    circleThreePoints
  );
  let result = findCommonPoints2(circleOnePoints, circleTwoPoints);
  let circleTwoCommonPoints = result.circleTwoCommonPoints2;
  let { circleTwoCommonPoints2, circleThreeCommonPoints2 } = findCommonPoints2(
    circleTwoPoints,
    circleThreePoints
  );

  let circleOneFilteredPoints = filterPointsBetween(
    circleOneCommonPoints[0],
    circleOneCommonPoints[1],
    circleOnePoints
  );
  let circleTwoFilteredPoints = filterPointsBetween(
    circleTwoCommonPoints[0],
    circleTwoCommonPoints[1],
    circleTwoPoints
  );
  let circleTwoFilteredPoints2 = filterPointsBetween(
    circleTwoCommonPoints2[0],
    circleTwoCommonPoints2[1],
    circleTwoPoints
  );
  let circleThreeFilteredPoints = filterPointsBetween(
    circleThreeCommonPoints[0],
    circleThreeCommonPoints[1],
    circleThreePoints
  );

  let circleThreeFilteredPoints2 = filterPointsBetween(
    circleThreeCommonPoints2[0],
    circleThreeCommonPoints2[1],
    circleThreePoints
  );
  let circleOneBorderPoint =
    circleOneFilteredPoints[Math.floor(circleOneFilteredPoints.length / 2) - 5];
  let circleThreeBorderPoint =
    circleThreeFilteredPoints[
      Math.floor(circleThreeFilteredPoints.length / 2) + 10
    ];
  // console.log(`these are the first circle point ${circleOneFilteredPoints}`);
  // console.log(
  //   `these are the circle two filtered points ${circleTwoFilteredPoints}`
  // );
  let circleTwoBorderPoint =
    circleTwoFilteredPoints2[
      Math.floor(circleTwoFilteredPoints2.length / 2) - 4
    ];

  switch (fillType.leftIntersection) {
    case "shade":
      drawLinesBetweenPoints(
        context,
        circleOneFilteredPoints,
        circleThreeFilteredPoints.reverse()
      );
      break;

    // case "cross":
    //   let midPoint = findMidPoint(
    //     circleOneCommonPoints[0],
    //     circleOneCommonPoints[1]
    //   );
    //   drawCrossOnCanvas(context, midPoint.x, midPoint.y);
    //   break;
  }

  switch (fillType.rightIntersection) {
    case "shade":
      drawLinesBetweenPoints(
        context,
        circleTwoFilteredPoints2,
        circleThreeFilteredPoints2.reverse()
      );
      break;

    // case "cross":
    //   let midPoint = findMidPoint(
    //     circleTwoCommonPoints2[0],
    //     circleTwoCommonPoints2[1]
    //   );
    //   fillType.thirdCircle === "shade wrt first"
    //     ? drawCrossOnCanvas(context, midPoint.x - 25, midPoint.y - 20)
    //     : drawCrossOnCanvas(context, midPoint.x, midPoint.y);
    //   break;
  }

  if (fillType.firstCircleBorder === "cross") {
    drawCrossOnCanvas(context, circleOneBorderPoint.x, circleOneBorderPoint.y);
  }

  // if (fillType.thirdCircleBorder === "cross")
  //   drawCrossOnCanvas(
  //     context,
  //     circleThreeBorderPoint.x,
  //     circleThreeBorderPoint.y
  //   );

  if (fillType.secondCircleBorder === "cross") {
    console.error("in the shade case");

    drawCrossOnCanvas(context, circleTwoBorderPoint.x, circleTwoBorderPoint.y);
  }

  if (fillType.leftCross) {
    let midPoint = findMidPoint(
      circleTwoCommonPoints2[0],
      circleTwoCommonPoints2[1]
    );
    drawCrossOnCanvas(context, midPoint.x - 65, midPoint.y - 0);
  }
  if (fillType.rightCross) {
    let midPoint = findMidPoint(
      circleThreeCommonPoints2[0],
      circleThreeCommonPoints2[1]
    );
    drawCrossOnCanvas(context, midPoint.x, midPoint.y);
  }
  if (fillType.middleCross) {
    let midPoint = findMidPoint(
      circleTwoCommonPoints[0],
      circleTwoCommonPoints[1]
    );
    drawCrossOnCanvas(context, midPoint.x, midPoint.y + 20);
  }
};

export default fillIntersection;
