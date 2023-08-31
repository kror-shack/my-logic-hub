// function makeConstants() {
//   return {
//     freeConstants: [
//       "b",
//       "c",
//       "d",
//       "e",
//       "f",
//       "h",
//       "i",
//       "j",
//       "k",
//       "l",
//       "m",
//       "n",
//       "o",
//       "p",
//       "q",
//       "r",
//       "s",
//       "t",
//       "u",
//       "v",
//       "w",
//       "x",
//       "y",
//       "z",
//     ],
//     usedConstants: ["a", "g"],
//   };
// }

// describe.skip("skolemizePremises", () => {
//   const freeConstants = [
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//   ];
//   const usedConstants = ["a", "g"];

//   it("test 1", () => {
//     const skolemConstants = makeConstants();
//     const freeConstants = skolemConstants.freeConstants;
//     const usedConstants = skolemConstants.usedConstants;

//     const premiseArr = [
//       ["\u2203y", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
//     ];
//     const skolemizedPremises = convertPremisesToSkolemStandardForm(
//       premiseArr,
//       freeConstants,
//       usedConstants
//     );
//     const expected = [["(", "Aag", "&", "Ag_b", ")", "->", "Aa_b"]];

//     expect(skolemizedPremises).toEqual(expected);
//   });
//   it("test 2", () => {
//     const skolemConstants = makeConstants();
//     const freeConstants = skolemConstants.freeConstants;
//     const usedConstants = skolemConstants.usedConstants;

//     const premiseArr = [
//       ["\u2200y", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
//     ];
//     const skolemizedPremises = convertPremisesToSkolemStandardForm(
//       premiseArr,
//       freeConstants,
//       usedConstants
//     );
//     const expected = [["(", "Aag", "&", "Agx1", ")", "->", "Aax1"]];

//     expect(skolemizedPremises).toEqual(expected);
//   });
//   it("test 3", () => {
//     const skolemConstants = makeConstants();
//     const freeConstants = skolemConstants.freeConstants;
//     const usedConstants = skolemConstants.usedConstants;

//     const premiseArr = [["(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"]];
//     const skolemizedPremises = convertPremisesToSkolemStandardForm(
//       premiseArr,
//       freeConstants,
//       usedConstants
//     );
//     const expected = [["(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"]];
//     expect(skolemizedPremises).toEqual(expected);
//   });
//   it("test 4", () => {
//     const skolemConstants = makeConstants();
//     const freeConstants = skolemConstants.freeConstants;
//     const usedConstants = skolemConstants.usedConstants;

//     const premiseArr = [
//       ["(", "(", "Aaf", "&", "Agf", ")", "->", "Aaf", ")"],
//       ["\u2200y", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
//       ["\u2203y", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
//     ];
//     const skolemizedPremises = convertPremisesToSkolemStandardForm(
//       premiseArr,
//       freeConstants,
//       usedConstants
//     );
//     const expected = [
//       ["(", "(", "Aaf", "&", "Agf", ")", "->", "Aaf", ")"],
//       ["(", "Aag", "&", "Ag_b", ")", "->", "Aa_b"],
//       ["(", "Aag", "&", "Agx1", ")", "->", "Aax1"],
//     ];

//     expect(skolemizedPremises).toEqual(expected);
//   });
// });

// describe.skip("extractElementsInBrackets", () => {
//   it("test 1", () => {
//     const premiseArr = [
//       "∀y",
//       "(",
//       "(",
//       "Aag",
//       "&",
//       "Agy",
//       ")",
//       "->",
//       "Aay",
//       ")",
//     ];
//     const scopedElements = extractElementsInBrackets(premiseArr);
//     const expected = ["(", "Aag", "&", "Agy", ")", "->", "Aay"];

//     expect(scopedElements).toEqual(expected);
//   });
// });

// describe.skip("makeConstantsArray", () => {
//   it("test 1", () => {
//     const premiseArr = [
//       ["∀y", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
//     ];
//     const updatedArray = makeConstantsArray(premiseArr);
//     const expected = {
//       freeConstants: [
//         "b",
//         "c",
//         "d",
//         "e",
//         "f",
//         "h",
//         "i",
//         "j",
//         "k",
//         "l",
//         "m",
//         "n",
//         "o",
//         "p",
//         "q",
//         "r",
//         "s",
//         "t",
//         "u",
//         "v",
//         "w",
//         "x",
//         "y",
//         "z",
//       ],
//       usedConstants: ["a", "g"],
//     };

//     expect(updatedArray).toEqual(expected);
//   });

//   it("test 2", () => {
//     const premiseArr = [
//       ["∀y", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
//       ["∀y", "(", "Py", "->", "Aay", ")", "&", "Wf"],
//     ];
//     const updatedArray = makeConstantsArray(premiseArr);
//     const expected = {
//       freeConstants: [
//         "b",
//         "c",
//         "d",
//         "e",
//         "h",
//         "i",
//         "j",
//         "k",
//         "l",
//         "m",
//         "n",
//         "o",
//         "p",
//         "q",
//         "r",
//         "s",
//         "t",
//         "u",
//         "v",
//         "w",
//         "x",
//         "y",
//         "z",
//       ],
//       usedConstants: ["a", "g", "f"],
//     };
//     expect(updatedArray).toEqual(expected);
//   });
// });

// describe.skip("getAllFreeConstants", () => {
//   it("test 1", () => {
//     const stringArray = ["\u2203k", "(", "Pk", ")", "Qr"];
//     const updatedArray = getAllFreeConstants(stringArray);

//     expect(updatedArray).toEqual(["r"]);
//   });

//   it("test 2", () => {
//     const stringArray = ["\u2203x", "(", "Px", "->", "Qx", ")", "&", "Wf"];
//     const updatedArray = getAllFreeConstants(stringArray);

//     expect(updatedArray).toEqual(["f"]);
//   });
// });

// describe.skip("subUnify", () => {
//   it("test 1", () => {
//     const firstPremise = ["Px_1"];
//     const secondPremise = ["Pa"];
//     const updatedArray = subUnify(firstPremise, secondPremise);

//     expect(updatedArray).toEqual(["Pa"]);
//   });
//   it("test 2", () => {
//     const firstPremise = ["Px_1"];
//     const secondPremise = ["P_a"];
//     const updatedArray = subUnify(firstPremise, secondPremise);

//     expect(updatedArray).toEqual(["Pa"]);
//   });
// });

// describe("inferThroughSkolemization", () => {
//   it.skip("test 1", () => {
//     const premiseArr = ["\u2200x (Px -> Qx)", "\u2203y(Py)"];
//     const conclusionArr = "\u2203x(Qx)";
//     const deductionSteps = inferThroughSkolemization(premiseArr, conclusionArr);

//     expect(deductionSteps).toEqual(null);
//   });
//   it.skip("test 2", () => {
//     const premiseArr = [
//       "\u2203x (Gx & Axf)",
//       "\u2200x(Wx->\u2200y(Gy -> Axy))",
//       "Wf",
//     ];
//     const conclusionArr = "\u2203x (Axf & Afx)";
//     const deductionSteps = inferThroughSkolemization(premiseArr, conclusionArr);

//     expect(deductionSteps).toEqual(null);
//   });
// });

export {};
