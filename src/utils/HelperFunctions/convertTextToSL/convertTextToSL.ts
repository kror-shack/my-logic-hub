/**
 *
 * This function converts ocr text to symbolic logic premises.
 *
 * Tesseract does not correctly intrepret the different
 * logical symbols hence this function is meant to aid it
 * to convert to text that is more closer to symbolic
 * logic notation.
 *
 * @param text -The input string recerived from ocr
 * @returns -A string array containing symbolic notation premises.
 */
const convertTextToSL = (text: string) => {
  const textArray: string[] = text.split("\n");

  const replacedArr: string[] = [];
  for (let i = 0; i < textArray.length; i++) {
    const textPremise = textArray[i];
    if (textPremise.length < 1 || !textPremise) continue;

    let outputString: string = textPremise;
    if (outputString.startsWith("c")) {
      outputString = outputString.substring(1); // Remove conclusion dots
    }
    outputString = outputString.replace(/^\d+/, ""); //removes numbers at start
    outputString = outputString.replace(/!/g, "~"); // ! to ~

    outputString = outputString.replace(/\)D\(/g, ")->("); // for ⊃ to ->
    outputString = outputString.replace(/-(?!>)/g, "&"); // for - to &
    outputString = outputString.replace(/[+-](?![>])/g, "&"); // for + to &

    outputString = outputString.replace(/[@#!$%^*+;:'",./?0-9]/g, "");
    //to remove unallowed characters
    replacedArr.push(outputString);
  }
  return replacedArr;
};

export default convertTextToSL;
