import { Circle, DrawOrder, Relations } from "../../../../../../types/VennDiagramTypes/types";
import fillFirstCircle from "./fillCirclesFunctions/fillFirstCircle/fillFirstCircle";
import fillThirdCircle from "./fillCirclesFunctions/fillThirdCircle/fillThirdCircle";
import fillIntersection from "./fillCirclesFunctions/fillIntersection/fillIntersection";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  circles: Circle[];
  drawOrder: DrawOrder;
};

// const fillThirdCircle = (
//   context: CanvasRenderingContext2D | null | undefined,
//   x: number,
//   y: number,
//   radius: number,
//   relations: Relations
// ) => {
//   switch (relations.thirdCircle) {
//     case "shade wrt second":
//       const points = calculateCirclePoints(x, y, radius);
//       drawLinesFromArray(context, points);
//       break;

//     case "cross":
//   }
// };

//paras: circle, fill type
const fillCirlces = ({ canvasRef, circles, drawOrder }: Props) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  if (!drawOrder.firstFill || !drawOrder.secondFill) return;
  console.log("in fill circle");

  if (drawOrder.firstFill) {
    if (drawOrder.firstFill.firstCircle) {
      console.log("in fill first circle");
      fillFirstCircle(context, circles, drawOrder.firstFill);
      // relations.thirdCircle = "shade wrt first";
    } else if (drawOrder.firstFill.thirdCircle) {
      console.log("in fill third circle");
      fillThirdCircle(context, circles, drawOrder.firstFill);
    } else {
      fillIntersection(context, circles, drawOrder.firstFill);
    }
  }
  if (drawOrder.secondFill) {
    if (drawOrder.secondFill.firstCircle)
      fillFirstCircle(context, circles, drawOrder.secondFill);
    // relations.thirdCircle = "shade wrt first";
    else if (drawOrder.secondFill.thirdCircle) {
      fillThirdCircle(context, circles, drawOrder.secondFill);
    } else {
      fillIntersection(context, circles, drawOrder.secondFill);
    }
  }
  // else fillLeftIntersection(d)
};

export default fillCirlces;
