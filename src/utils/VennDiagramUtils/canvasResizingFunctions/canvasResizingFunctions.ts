export function calculateCircleRadius(
  canvasWidth: number,
  canvasHeight: number
): number {
  const widthProportion = canvasWidth / 400;
  const heightProportion = canvasHeight / 350;

  const smallestProportion = Math.min(widthProportion, heightProportion);

  const initialRadius = 80;

  const newRadius = initialRadius * smallestProportion;
  return newRadius;
}

interface Point {
  x: number;
  y: number;
}

interface MidPoints {
  leftMidPoint: Point;
  rightMidPoint: Point;
}

export function calculateTopCirclesMidPoints(
  radius: number,
  center: Point
): MidPoints {
  const overlapXDistance = radius * 0.5;

  const leftMidX = center.x - overlapXDistance;
  const rightMidX = center.x + overlapXDistance;

  const midY = center.y;

  const leftMidPoint: Point = { x: leftMidX, y: midY };
  const rightMidPoint: Point = { x: rightMidX, y: midY };

  return { leftMidPoint, rightMidPoint };
}

export function calculateBottomCircleMidpoints(radius: number, center: Point) {
  const overlapYDistance = radius * 1.2;
  const bottomMidY = center.y + overlapYDistance;
  const bottomMidPoint: Point = { x: center.x, y: bottomMidY };

  return bottomMidPoint;
}

export function calculateMidPointWithOffset(
  canvasWidth: number,
  canvasHeight: number
) {
  const midX = canvasWidth / 2;
  const midY = canvasHeight / 2;

  // Calculate the offset (20% upwards)
  const yOffset = (canvasHeight * 0.3) / 2;

  const midYWithOffset = midY - yOffset;

  return { x: midX, y: midYWithOffset };
}

export function calculateFirstCircleLabelOffset(
  midPoint: Point,
  radius: number
): Point {
  const offsetX = midPoint.x - radius * 0.8;
  const offsetY = midPoint.y - radius * 0.9;
  return {
    x: offsetX,
    y: offsetY,
  };
}

export function calculateSecondCircleLabelOffset(
  midPoint: Point,
  radius: number
): Point {
  const offsetX = midPoint.x + radius * 0.8;
  const offsetY = midPoint.y - radius * 0.9;
  return {
    x: offsetX,
    y: offsetY,
  };
}
export function calculateThirdCircleLabelOffset(
  midPoint: Point,
  radius: number
): Point {
  const offsetX = midPoint.x * 0.9;
  const offsetY = midPoint.y + radius * 1.2;
  return {
    x: offsetX,
    y: offsetY,
  };
}

export function getInitials(str: string): string {
  const words = str.trim().split(/\s+/);

  if (str.length > 10 || words.length >= 2) {
    const initials = words.map((word) => word[0].toUpperCase()).join(" ");
    return initials;
  } else {
    return str;
  }
}
