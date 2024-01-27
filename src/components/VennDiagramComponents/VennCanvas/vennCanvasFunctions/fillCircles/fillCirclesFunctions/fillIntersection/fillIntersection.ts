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

  let circleOnePoints = calculateCirclePoints(
    circles[0].center.x,
    circles[0].center.y,
    radius
  );
  let circleTwoPoints = calculateCirclePoints(
    circles[1].center.x,
    circles[1].center.y,
    radius
  );

  let circleThreePoints = calculateCirclePoints(
    circles[2].center.x,
    circles[2].center.y,
    radius
  );
  let leftIntersectioncommonPoints = findCommonPoints(
    circleOnePoints,
    circleThreePoints
  );
  let leftIntersectionBottomPoints =
    leftIntersectioncommonPoints.firstCircleCommonPoints;
  let leftIntersectionTopPoints =
    leftIntersectioncommonPoints.secondCircleCommonPoints;

  let result = findCommonPoints(circleOnePoints, circleTwoPoints);

  let middleIntersectionLeftPoints = result.secondCircleCommonPoints;
  let middleIntersectionRightPoints = result.firstCircleCommonPoints;

  let rightIntersectionPoints = findCommonPoints(
    circleTwoPoints,
    circleThreePoints
  );
  let rightIntersectionTopPoints =
    rightIntersectionPoints.secondCircleCommonPoints;
  let rightIntersectionBottomPoints =
    rightIntersectionPoints.firstCircleCommonPoints;

  let leftIntersectionFilteredBottomPoints = filterPointsBetween(
    leftIntersectionBottomPoints[0],
    leftIntersectionBottomPoints[1],
    circleOnePoints,
    "bottom"
  );

  let leftIntersectionFilteredTopPoints = filterPointsBetween(
    leftIntersectionTopPoints[0],
    leftIntersectionTopPoints[1],
    circleThreePoints,
    "top"
  );

  let middleIntersectionLeftFilteredPoints = filterPointsBetween(
    middleIntersectionLeftPoints[0],
    middleIntersectionLeftPoints[1],
    circleTwoPoints,
    "left"
  );

  let middleIntersectionRightFilteredPoints = filterPointsBetween(
    middleIntersectionRightPoints[0],
    middleIntersectionRightPoints[1],
    circleOnePoints,
    "right"
  );

  let rightIntersectionFilteredTopPoints = filterPointsBetween(
    rightIntersectionTopPoints[0],
    rightIntersectionTopPoints[1],
    circleThreePoints,
    "top"
  );
  let rightIntersectionFilteredBottomPoints = filterPointsBetween(
    rightIntersectionBottomPoints[0],
    rightIntersectionBottomPoints[1],
    circleTwoPoints,
    "bottom"
  );
  let circleOneBorderPoint =
    middleIntersectionRightFilteredPoints[
      middleIntersectionRightFilteredPoints.length / 2 - 10
    ];

  let circleTwoBorderPoint =
    middleIntersectionLeftFilteredPoints[
      middleIntersectionLeftFilteredPoints.length / 2 - 20
    ];

  switch (fillType.leftIntersection) {
    case "shade":
      drawLinesBetweenPoints(
        context,
        leftIntersectionFilteredTopPoints,
        leftIntersectionFilteredBottomPoints.reverse()
      );
      break;
  }

  switch (fillType.rightIntersection) {
    case "shade":
      drawLinesBetweenPoints(
        context,
        rightIntersectionFilteredTopPoints,
        rightIntersectionFilteredBottomPoints.reverse()
      );
      break;
  }

  if (fillType.firstCircleBorder === "cross") {
    drawCrossOnCanvas(context, circleOneBorderPoint.x, circleOneBorderPoint.y);
  }

  if (fillType.secondCircleBorder === "cross") {
    drawCrossOnCanvas(context, circleTwoBorderPoint.x, circleTwoBorderPoint.y);
  }

  if (fillType.leftCross) {
    let midPoint = findMidPoint(
      leftIntersectionBottomPoints[0],
      leftIntersectionBottomPoints[1]
    );
    drawCrossOnCanvas(
      context,
      midPoint.x - radius * 0.2,
      midPoint.y + radius * 0.1
    );
  }
  if (fillType.rightCross) {
    let midPoint = findMidPoint(
      rightIntersectionBottomPoints[0],
      rightIntersectionBottomPoints[1]
    );
    drawCrossOnCanvas(
      context,
      midPoint.x + radius * 0.2,
      midPoint.y + radius * 0.1
    );
  }
  if (fillType.middleCross) {
    let midPoint = findMidPoint(
      middleIntersectionLeftPoints[0],
      middleIntersectionLeftPoints[1]
    );

    drawCrossOnCanvas(context, midPoint.x, midPoint.y + radius * 0.4);
  }
};

export default fillIntersection;
