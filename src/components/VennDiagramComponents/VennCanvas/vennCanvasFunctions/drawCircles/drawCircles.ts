import { Circle } from "../../../../../types/vennDiagramTypes/types";
import { getInitials } from "../../../../../utils/vennDiagramUtils/canvasResizingFunctions/canvasResizingFunctions";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  circles: Circle[];
};

const drawCircles = ({ canvasRef, circles }: Props) => {
  const canvas = canvasRef.current;

  const radius = circles[0].radius;

  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle, index) => {
    context.beginPath();
    context.arc(circle.center.x, circle.center.y, radius, 0, 2 * Math.PI);
    context.fillStyle = "rgba(255, 255, 255, 0)";
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();
    const textWidth = context.measureText(circle.label).width;

    const label1X = index === 0 ? circle.offset.x - textWidth : circle.offset.x;
    const label1Y = circle.offset.y;

    context.fillStyle = "black";

    context.font =
      window.innerWidth < 600 ? "18px Gochi Hand" : "20px Gochi Hand";

    const label = getInitials(circle.label);

    context.fillText(label, label1X, label1Y, 75);
  });
};

export default drawCircles;
