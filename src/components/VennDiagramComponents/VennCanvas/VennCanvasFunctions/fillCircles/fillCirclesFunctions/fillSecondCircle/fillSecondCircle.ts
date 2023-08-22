import {
  Circle,
  DrawOrder,
  DrawOrderProperties,
  Relations,
} from "../../../../../../../types/VennDiagramTypes/types";
import { calculateCirclePoints } from "../../../../../../../utils/VennDiagramUtils/calculateCirclePoints/calculateCirclePoints";
import {
  drawCrossOnCanvas,
  drawLinesFromArray,
} from "../../../../../../../utils/VennDiagramUtils/fillCircleHelpers/fillCircleHelperFunctions";

// shade, cross, border-cross
const fillSecondCircle = (
  context: CanvasRenderingContext2D | null | undefined,
  circles: Circle[],
  fillType: DrawOrderProperties
) => {
  if (!fillType.secondCircle) return;

  switch (fillType.secondCircle) {
    case "shade wrt third":
      if (!context) return;
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
