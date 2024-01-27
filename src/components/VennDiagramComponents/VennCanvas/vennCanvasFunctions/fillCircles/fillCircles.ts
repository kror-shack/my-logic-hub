import {
  Circle,
  DrawOrder,
  Relations,
} from "../../../../../types/vennDiagramTypes/types";
import fillFirstCircle from "./fillCirclesFunctions/fillFirstCircle/fillFirstCircle";
import fillThirdCircle from "./fillCirclesFunctions/fillThirdCircle/fillThirdCircle";
import fillIntersection from "./fillCirclesFunctions/fillIntersection/fillIntersection";
import fillSecondCircle from "./fillCirclesFunctions/fillSecondCircle/fillSecondCircle";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  circles: Circle[];
  drawOrder: DrawOrder;
};

const fillCirlces = ({ canvasRef, circles, drawOrder }: Props) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  if (!drawOrder.firstFill) return;

  if (drawOrder.firstFill) {
    if (drawOrder.firstFill.firstCircle) {
      fillFirstCircle(context, circles, drawOrder.firstFill);
    }
    if (drawOrder.firstFill.secondCircle) {
      fillSecondCircle(context, circles, drawOrder.firstFill);
    }
    if (drawOrder.firstFill.thirdCircle) {
      fillThirdCircle(context, circles, drawOrder.firstFill);
    }
    if (drawOrder.firstFill.thirdCircleComplete) {
      fillThirdCircle(context, circles, drawOrder.firstFill);
    } else {
      fillIntersection(context, circles, drawOrder.firstFill);
    }
  }
  if (drawOrder.secondFill) {
    if (drawOrder.secondFill.firstCircle)
      fillFirstCircle(context, circles, drawOrder.secondFill);
    if (drawOrder.secondFill.secondCircle) {
      fillSecondCircle(context, circles, drawOrder.secondFill);
    }
    if (drawOrder.secondFill.thirdCircle) {
      fillThirdCircle(context, circles, drawOrder.secondFill);
    } else {
      fillIntersection(context, circles, drawOrder.secondFill);
    }
  }
};

export default fillCirlces;
