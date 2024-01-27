import {
  Circle,
  DrawOrder,
  DrawOrderProperties,
  Relations,
} from "../../../../../../../types/vennDiagramTypes/types";
import { calculateCirclePoints } from "../../../../../../../utils/vennDiagramUtils/calculateCirclePoints/calculateCirclePoints";
import {
  drawCrossOnCanvas,
  drawLinesFromArray,
} from "../../../../../../../utils/vennDiagramUtils/fillCircleHelpers/fillCircleHelperFunctions";

const fillThirdCircle = (
  context: CanvasRenderingContext2D | null | undefined,
  circles: Circle[],
  fillType: DrawOrderProperties
) => {
  if (!context) return;
  if (!fillType.thirdCircle && !fillType.thirdCircleComplete) return;
  if (fillType.thirdCircleComplete === "shade") {
    const pointsWRTFirstCircle = calculateCirclePoints(context, circles, 2, 0);

    drawLinesFromArray(context, pointsWRTFirstCircle);
    const pointsWRTSecondCircle = calculateCirclePoints(context, circles, 2, 1);

    drawLinesFromArray(context, pointsWRTSecondCircle);
    return;
  }

  switch (fillType.thirdCircle) {
    case "shade wrt first":
      const pointsWRTFirst = calculateCirclePoints(context, circles, 2, 0);

      drawLinesFromArray(context, pointsWRTFirst);

      break;

    case "shade wrt second":
      const pointsWRTSecond = calculateCirclePoints(context, circles, 2, 1);

      drawLinesFromArray(context, pointsWRTSecond);
      break;

    case "cross":
      drawCrossOnCanvas(context, circles[2].center.x, circles[2].center.y + 10);
      break;
  }
};

export default fillThirdCircle;
