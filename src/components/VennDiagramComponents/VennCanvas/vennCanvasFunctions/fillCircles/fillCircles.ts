import {
  Circle,
  DrawOrder,
  Relations,
  VennRelations,
} from "../../../../../types/vennDiagramTypes/types";
import fillFirstCircle from "./fillCirclesFunctions/fillFirstCircle/fillFirstCircle";
import fillThirdCircle from "./fillCirclesFunctions/fillThirdCircle/fillThirdCircle";
import fillIntersection from "./fillCirclesFunctions/fillIntersection/fillIntersection";
import fillSecondCircle from "./fillCirclesFunctions/fillSecondCircle/fillSecondCircle";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  circles: Circle[];
  drawOrder: Partial<VennRelations>[];
};

const fillCirlces = ({ canvasRef, circles, drawOrder }: Props) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  if (!drawOrder[0]) return;

  if (drawOrder[0]) {
    fillCirclesByOrder(context, circles, drawOrder[0]);
  }
  if (drawOrder[1]) {
    fillCirclesByOrder(context, circles, drawOrder[1]);
  }
};

export default fillCirlces;

const fillCirclesByOrder = (
  context: CanvasRenderingContext2D | null | undefined,
  circles: Circle[],
  order: Partial<VennRelations>
) => {
  if (order.firstCircle) {
    fillFirstCircle(context, circles, order);
  }
  if (order.secondCircle) {
    fillSecondCircle(context, circles, order);
  }
  if (order.thirdCircle) {
    fillThirdCircle(context, circles, order);
  } else {
    fillIntersection(context, circles, order);
  }
};
