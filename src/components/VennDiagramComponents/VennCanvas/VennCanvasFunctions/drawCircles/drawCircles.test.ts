import { render } from "@testing-library/react";

// test("drawCircles renders circles with labels", () => {
//   const canvasMock = document.createElement("canvas");
//   const canvasRef = { current: canvasMock };
//     const mockSyllogisticFigure = {
//       figure: "AAA-2",
//       majorPremise: "All mortal are men",
//       minorPremise: "Socrates is a man",
//       majorTerm: "mortal",
//       minorTerm: "socrates",
//       middleTerm: "men",
//       premise1: {
//         subject: "mortal",
//         predicate: "men",
//         type: "A",
//       },
//       premise2: {
//         subject: "socrates",
//         predicate: "man",
//         type: "A",
//       },
//       conc: {
//         subject: "socrates",
//         predicate: "mortal",
//         type: "A",
//       },
//     }

//     render(<VennCanvas syllogisticFigure={mockSyllogisticFigure}/>);

//   const circles = [
//     {
//       center: {
//         x: 150,
//         y: 100,
//       },
//       radius: 80,
//       label: "circle one",
//       color: "red",
//       offset: { x: -220, y: -50 },
//     },
//     {
//       center: {
//         x: 270,
//         y: 100,
//       },
//       radius: 80,
//       label: "circle two",
//       color: "red",
//       offset: { x: 10, y: -50 },
//     },
//     {
//       center: {
//         x: 210,
//         y: 180,
//       },
//       radius: 80,
//       label: "circle three",
//       color: "red",
//       offset: {
//         x: -110,
//         y: 120,
//       },
//     },
//   ];

//   drawCircles({ canvasRef, circles} );

//   const context = canvasRef.current.getContext("2d");
//   if(!context) return
//   circles.forEach((circle) => {
//     expect(context.beginPath).toHaveBeenCalledTimes(1);
//     expect(context.arc).toHaveBeenCalledWith(
//       circle.center.x,
//       circle.center.y,
//       circle.radius,
//       0,
//       2 * Math.PI
//     );
//     expect(context.fillStyle).toBe("rgba(255, 255, 255, 0)");
//     expect(context.fill).toHaveBeenCalledTimes(1);
//     expect(context.lineWidth).toBe(2);
//     expect(context.strokeStyle).toBe("black");
//     expect(context.stroke).toHaveBeenCalledTimes(1);

//     const label1X = circle.center.x + 80 + circle.offset.x;
//     const label1Y = circle.center.y + circle.offset.y;

//     expect(context.fillStyle).toBe("black");
//     expect(context.font).toBe("16px Arial");
//     expect(context.fillText).toHaveBeenCalledWith(
//       circle.label,
//       label1X,
//       label1Y
//     );
//   });
// });

export {};
