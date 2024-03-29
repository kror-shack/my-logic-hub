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
  if (!fillType.firstCircle) return;
  switch (fillType.firstCircle) {
    case "shade wrt third":
      if (!context) return;
      const points = calculateCirclePoints(context, circles, 0, 2);
      drawLinesFromArray(context, points);
      break;

    case "cross":
      if (!context) return;
      drawCrossOnCanvas(
        context,
        circles[0].center.x - 20,
        circles[0].center.y - 10
      );
      break;
  }
};

export default fillFirstCircle;
