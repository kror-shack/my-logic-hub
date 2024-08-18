import {
  Circle,
  DrawOrderProperties,
  Point,
} from "../../../../../../../types/vennDiagramTypes/types";
import {
  calculateCirclePoints,
  drawCrossOnCanvas,
  drawLinesBetweenPoints,
  filterPointsBetween,
  findCommonPoints,
  findMidPoint,
} from "../../../../../../../utils/vennDiagramUtils/fillCircleHelpers/fillCircleHelperFunctions";

//calculate all the circles border;
// fill the intersection according to the border values
const fillIntersection = (
  context: CanvasRenderingContext2D | null | undefined,
  circles: Circle[],
  fillType: DrawOrderProperties
) => {
  if (!context) return;
  const radius = circles[0].radius; // all radii are equal

  const [circleOnePoints, circleTwoPoints, circleThreePoints] = getCirclePoints(
    circles,
    radius
  );

  const {
    firstCircleCommonPoints: leftIntersectionBottomPoints,
    secondCircleCommonPoints: leftIntersectionTopPoints,
  } = findCommonPoints(circleOnePoints, circleThreePoints);

  const {
    secondCircleCommonPoints: middleIntersectionLeftPoints,
    firstCircleCommonPoints: middleIntersectionRightPoints,
  } = findCommonPoints(circleOnePoints, circleTwoPoints);

  const {
    secondCircleCommonPoints: rightIntersectionTopPoints,
    firstCircleCommonPoints: rightIntersectionBottomPoints,
  } = findCommonPoints(circleTwoPoints, circleThreePoints);

  const leftIntersectionFilteredBottomPoints = filterPointsBetween(
    leftIntersectionBottomPoints[0],
    leftIntersectionBottomPoints[1],
    circleOnePoints,
    "bottom"
  );

  const leftIntersectionFilteredTopPoints = filterPointsBetween(
    leftIntersectionTopPoints[0],
    leftIntersectionTopPoints[1],
    circleThreePoints,
    "top"
  );

  const middleIntersectionLeftFilteredPoints = filterPointsBetween(
    middleIntersectionLeftPoints[0],
    middleIntersectionLeftPoints[1],
    circleTwoPoints,
    "left"
  );

  const middleIntersectionRightFilteredPoints = filterPointsBetween(
    middleIntersectionRightPoints[0],
    middleIntersectionRightPoints[1],
    circleOnePoints,
    "right"
  );

  const rightIntersectionFilteredTopPoints = filterPointsBetween(
    rightIntersectionTopPoints[0],
    rightIntersectionTopPoints[1],
    circleThreePoints,
    "top"
  );
  const rightIntersectionFilteredBottomPoints = filterPointsBetween(
    rightIntersectionBottomPoints[0],
    rightIntersectionBottomPoints[1],
    circleTwoPoints,
    "bottom"
  );

  const circleOneBorderPoint =
    middleIntersectionRightFilteredPoints[
      middleIntersectionRightFilteredPoints.length / 2 - 10
    ];

  const firstWrtThirdCircleBorderPoint =
    leftIntersectionFilteredBottomPoints[
      leftIntersectionFilteredBottomPoints.length - 15
    ];

  const secondWrtFirstCircleBorderPoint =
    middleIntersectionLeftFilteredPoints[
      middleIntersectionLeftFilteredPoints.length - 15
    ];

  const circleTwoBorderPoint =
    rightIntersectionFilteredBottomPoints[
      rightIntersectionFilteredBottomPoints.length - 10
    ];
  const circleTwoBottomBorderPoint =
    middleIntersectionLeftFilteredPoints[
      middleIntersectionLeftFilteredPoints.length - 20
    ];

  const circleThreeBorderPoint = getHighestPoint(circles[2], radius);
  const circleThreeBottomBorderPoint =
    leftIntersectionFilteredTopPoints[
      leftIntersectionFilteredTopPoints.length - 10
    ];

  //works
  if (fillType.leftIntersection) {
    drawLinesBetweenPoints(
      context,
      leftIntersectionFilteredTopPoints,
      leftIntersectionFilteredBottomPoints.reverse()
    );
  }

  //works
  if (fillType.rightIntersection) {
    drawLinesBetweenPoints(
      context,
      rightIntersectionFilteredTopPoints,
      rightIntersectionFilteredBottomPoints.reverse()
    );
  }
  //works but can be improved
  if (fillType.topIntersection) {
    drawLinesBetweenPoints(
      context,
      middleIntersectionLeftFilteredPoints,
      middleIntersectionRightFilteredPoints.reverse()
    );
  }

  //works
  if (fillType.firstCircleBorder === "cross") {
    drawCrossOnCanvas(context, circleOneBorderPoint.x, circleOneBorderPoint.y);
  }

  //works
  if (fillType.thirdCircleBorder === "cross") {
    drawCrossOnCanvas(
      context,
      circleThreeBorderPoint.x,
      circleThreeBorderPoint.y
    );
  }

  //works
  if (fillType.secondCircleBorder === "cross") {
    drawCrossOnCanvas(context, circleTwoBorderPoint.x, circleTwoBorderPoint.y);
  }

  //works
  if (fillType.firstWrtThirdBorder === "cross") {
    drawCrossOnCanvas(
      context,
      firstWrtThirdCircleBorderPoint.x,
      firstWrtThirdCircleBorderPoint.y
    );
  }

  //works
  if (fillType.secondWrtFirstBorder === "cross") {
    drawCrossOnCanvas(
      context,
      secondWrtFirstCircleBorderPoint.x,
      secondWrtFirstCircleBorderPoint.y
    );
  }

  // works
  if (fillType.leftCross) {
    const midPoint = findMidPoint(
      leftIntersectionBottomPoints[0],
      leftIntersectionBottomPoints[1]
    );
    drawCrossOnCanvas(
      context,
      midPoint.x - radius * 0.2,
      midPoint.y + radius * 0.1
    );
  }

  //works
  if (fillType.rightCross) {
    const midPoint = findMidPoint(
      rightIntersectionBottomPoints[0],
      rightIntersectionBottomPoints[1]
    );
    drawCrossOnCanvas(
      context,
      midPoint.x + radius * 0.2,
      midPoint.y + radius * 0.1
    );
  }
  //works
  if (fillType.middleCross) {
    const midPoint = findMidPoint(
      middleIntersectionLeftPoints[0],
      middleIntersectionLeftPoints[1]
    );

    drawCrossOnCanvas(context, midPoint.x, midPoint.y + radius * 0.4);
  }
};

export default fillIntersection;

const getCirclePoints = (circles: Circle[], radius: number) => {
  const circleOnePoints = calculateCirclePoints(
    circles[0].center.x,
    circles[0].center.y,
    radius
  );

  const circleTwoPoints = calculateCirclePoints(
    circles[1].center.x,
    circles[1].center.y,
    radius
  );

  const circleThreePoints = calculateCirclePoints(
    circles[2].center.x,
    circles[2].center.y,
    radius
  );
  return [circleOnePoints, circleTwoPoints, circleThreePoints];
};

function getHighestPoint(
  circle: Circle,
  radius: number
): { x: number; y: number } {
  const { x, y } = circle.center;
  return {
    x: x, // x-coordinate remains the same
    y: y - radius, // y-coordinate is decreased by the radius to get the highest point
  };
}
