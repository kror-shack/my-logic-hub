import {
  Circle,
  DrawOrder,
  DrawOrderProperties,
  Relations,
} from "../../../../../../../../types/VennDiagramTypes/types";
import { calculateCirclePoints } from "../../../../../../../../utils/VennDiagramUtils/calculateCirclePoints/calculateCirclePoints";
import {
  drawCrossOnCanvas,
  drawLinesFromArray,
} from "../fillCircleHelpers/fillCircleHelperFunctions";

const fillThirdCircle = (
  context: CanvasRenderingContext2D | null | undefined,
  circles: Circle[],
  fillType: DrawOrderProperties
) => {
  if (!context) return;
  if (!fillType.thirdCircle) return;

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
      drawCrossOnCanvas(context, circles[2].center.x, circles[2].center.y + 10);
      break;
  }
};

export default fillThirdCircle;
