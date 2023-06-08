function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  context: CanvasRenderingContext2D | null | undefined,
  color: string = "black"
) {
  if (!context) return null;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.stroke();
}

function drawLinesFromArray(
  context: CanvasRenderingContext2D | undefined | null,
  points: { x: number; y: number }[]
) {
  if (points.length < 3) {
    return;
  }

  const firstArray = points.slice(0, points.length / 2);
  const secondArray = points.slice(points.length / 2);

  const firstArrayFirstPoint = firstArray[0];
  const firstArrayLastPoint = firstArray[firstArray.length - 1];

  const secondArrayFirstPoint = secondArray[0];
  const secondArrayLastPoint = secondArray[secondArray.length - 1];

  drawLine(
    firstArrayFirstPoint.x,
    firstArrayFirstPoint.y,
    firstArrayLastPoint.x,
    firstArrayLastPoint.y,
    context
  );
  drawLine(
    secondArrayFirstPoint.x,
    secondArrayFirstPoint.y,
    secondArrayLastPoint.x,
    secondArrayLastPoint.y,
    context
  );

  firstArray.shift();
  firstArray.pop();

  secondArray.shift();
  secondArray.pop();

  drawLinesFromArray(context, firstArray.concat(secondArray));
}

function drawCrossOnCanvas(
  context: CanvasRenderingContext2D,
  x: number,
  y: number
): void {
  const crossSize = 10; // Size of the cross
  const rotationAngle = Math.PI / 1.3; // 90 degrees in radians

  context.strokeStyle = "black"; // Set cross color (black in this example)

  context.save(); // Save the current context state

  // Apply rotation transformation
  context.translate(x, y);
  context.rotate(rotationAngle);

  // Draw vertical line of the rotated cross
  context.beginPath();
  context.moveTo(0, -crossSize);
  context.lineTo(0, crossSize);
  context.stroke();

  // Draw horizontal line of the rotated cross
  context.beginPath();
  context.moveTo(-crossSize, 0);
  context.lineTo(crossSize, 0);
  context.stroke();

  context.restore(); // Restore the saved context state
}

export { drawLinesFromArray, drawCrossOnCanvas };
