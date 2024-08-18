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
const fillSecondCircle = (
  context: CanvasRenderingContext2D | null | undefined,
  circles: Circle[],
  fillType: DrawOrderProperties
) => {
  if (!fillType.secondCircle) return;
  if (!context) return;

  switch (fillType.secondCircle) {
    case "shade wrt first":
      const firstPoints = calculateCirclePoints(context, circles, 1, 0, true);
      drawLinesFromArray(context, firstPoints);
      break;

    case "shade wrt third":
      const points = calculateCirclePoints(context, circles, 1, 2, true);
      drawLinesFromArray(context, points);
      break;

    case "cross":
      if (!context) return;
      drawCrossOnCanvas(
        context,
        circles[1].center.x + 20,
        circles[1].center.y - 10
      );
      break;
  }
};

export default fillSecondCircle;
