import { useEffect, useRef, useState } from "react";
import { Circle, Structure, SyllogisticDetails } from "../../../../types/types";
import checkValidity from "./VennCanvasFunctions/checkValidity/checkValidity";
import drawCircles from "./VennCanvasFunctions/drawCircles/drawCircles";
import fillCirlces from "./VennCanvasFunctions/fillCircles/fillCircles";
import getCircleDrawOrder from "./VennCanvasFunctions/getCircleDrawOrder/getCircleDrawOrder";
import getCirclesRelation from "./VennCanvasFunctions/getCirclesRelation/getCirclesRelation";

type Props = {
  syllogisticFigure: SyllogisticDetails;
};

const VennCanvas = ({ syllogisticFigure }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<Circle[]>([
    {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: syllogisticFigure.minorTerm,
      offset: { x: -220, y: -50 },
    },
    {
      center: {
        x: 270,
        y: 100,
      },
      radius: 80,
      color: "blue",
      label: syllogisticFigure.majorTerm,
      offset: { x: 10, y: -50 },
    },
    {
      center: {
        x: 210,
        y: 180,
      },
      radius: 80,
      color: "green",
      label: syllogisticFigure.middleTerm,
      offset: {
        x: -110,
        y: 120,
      },
    },
  ]);

  useEffect(() => {
    drawCircles({ canvasRef, circles });
    const relations = getCirclesRelation({ circles, syllogisticFigure });
    const drawOrder = getCircleDrawOrder({
      relations,
      syllogisticFigure,
    });
    console.log(drawOrder);
    if (!drawOrder) return;
    fillCirlces({ canvasRef, circles, drawOrder });
  }, []);

  return (
    <div>
      {" "}
      <canvas
        style={{ margin: "200px" }}
        ref={canvasRef}
        width={800}
        height={800}
      />
    </div>
  );
};

export default VennCanvas;
