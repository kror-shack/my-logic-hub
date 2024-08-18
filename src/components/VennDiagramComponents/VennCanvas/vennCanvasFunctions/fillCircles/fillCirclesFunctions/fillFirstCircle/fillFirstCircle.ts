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

// shade, cross, border-cross
const fillFirstCircle = (
  context: CanvasRenderingContext2D | null | undefined,
  circles: Circle[],
  fillType: DrawOrderProperties
) => {
  if (!context) return;
  if (!fillType.firstCircle) return;
  switch (fillType.firstCircle) {
    case "shade wrt second":
      const secondPoints = calculateCirclePoints(context, circles, 0, 1, true);
      drawLinesFromArray(context, secondPoints);
      break;

    case "shade wrt third":
      const points = calculateCirclePoints(context, circles, 0, 2);
      drawLinesFromArray(context, points);
      break;

    case "cross":
      drawCrossOnCanvas(
        context,
        circles[0].center.x - 20,
        circles[0].center.y - 10
      );
      break;
  }
};

export default fillFirstCircle;
