import { Circle } from "../../../../../types/VennDiagramTypes/types";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  circles: Circle[];
};

const drawCircles = ({ canvasRef, circles }: Props) => {
  console.log("in the draw circles function");
  console.log(circles);
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

    const label1X = circle.center.x + radius + circle.offset.x;
    const label1Y = circle.center.y + circle.offset.y;

    context.fillStyle = "black";

    context.font = "16px Arial";

    context.fillText(circle.label, label1X, label1Y);
  });
};

export default drawCircles;
