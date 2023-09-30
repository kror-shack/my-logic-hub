import { ChangeEvent, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { Buffer } from "buffer"; //
import convertTextToSL from "../../utils/HelperFunctions/convertTextToSL/convertTextToSL";
import { transformSymbolsForDisplay } from "../../utils/HelperFunctions/tranfromSymbols/transformSymbols";
import { ReactComponent as LoadingSvg } from "../../assets/svgs/loading.svg";
import { ReactComponent as Logo } from "../../assets/svgs/main-icon.svg";
import { ReactComponent as FileSvg } from "../../assets/svgs/file.svg";

import "./ImageTextExtractor.scss";

type Props = {
  /**
   * In componets that are for SL proofs, both premise and conclusion are
   */
  setInputValues?: React.Dispatch<React.SetStateAction<string[]>>;
  setConclusion: React.Dispatch<React.SetStateAction<string>>;
  vennDiagram?: boolean;
};

/**
 * Reders a button to upload Image
 *
 * This component renders a button to submit
 * the image using a popup, and then sets the ocr values to
 * the input feilds.
 *
 * @component
 * @param Props - the object Props
 * @param Props.setInputValues - a set state function to set the values of the SL premises
 * @param Props.setConclusion - a set state function to set the values of the SL conclusion
 * @param Props.vennDiagram - a boolean for whether the component needs to preform transformations for SL or natural language.
 * @returns - a button with popup onclick.
 */
const ImageTextExtractor = ({
  setInputValues,
  setConclusion,
  vennDiagram = false,
}: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageName, setImageName] = useState("");
  const allowedFormats = ["bmp", "jpg", "jpeg", "png", "pbm", "webp"];

  const convertImageToText = async () => {
    if (typeof imageData !== "string") {
      return;
    }
    setIsLoading(true);
    try {
      const worker = await createWorker();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const whitelistChars = vennDiagram
        ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789 "
        : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789&!().•∧∨¬&•→⊃~-";
      await worker.setParameters({
        tessedit_char_whitelist: whitelistChars,
      });
      const {
        data: { text },
      } = await worker.recognize(imageData);
      setOcr(text);
      await worker.terminate();
    } catch (err) {
      setIsLoading(false);
      alert(
        "Image processing failed. Please check your internet connection and image quality, then try again. If the issue persists, feel free report it."
      );
    }
  };

  function isImageFormatAllowed(fileName: string) {
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    if (!fileExtension) {
      return false;
    }
    if (!allowedFormats.includes(fileExtension)) {
      return false;
    }
    return true;
  }

  function handleImageSubmit() {
    convertImageToText();
    setOcr("");
    setShowPopup(false);
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      if (!isImageFormatAllowed(file.name)) {
        alert(
          `Image format is not allowed. Allowed formats are: ${allowedFormats.join(
            ", "
          )}`
        );
        return;
      }
      setImageName(file.name);
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }

  function setValues(premiseArr: string[]) {
    const lastPremise = premiseArr.pop();
    if (lastPremise) setConclusion(lastPremise);
    if (setInputValues) setInputValues(premiseArr);
  }

  useEffect(() => {
    if (!ocr) return;
    if (vennDiagram) {
      const premiseArr = ocr.split(" ");
      setValues(premiseArr);
    }
    const premiseArr: string[] = convertTextToSL(ocr);
    const transformedPremiseArr = premiseArr.map((premise) =>
      transformSymbolsForDisplay(premise)
    );
    setValues(transformedPremiseArr);
    setIsLoading(false);
  }, [ocr]);

  return (
    <div className="Image-text-extractor">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-icon">
            <Logo />
            <LoadingSvg />
          </div>
        </div>
      )}
      {showPopup && (
        <div className="loading-overlay">
          <div className="result-popup">
            {imageData ? (
              <div className="selected-image-container">
                <p>{imageName}</p>
                <button
                  id="cancel-button"
                  type="button"
                  onClick={() => setImageData(null)}
                >
                  x
                </button>
              </div>
            ) : (
              <input
                type="file"
                name=""
                id="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            )}
            <p>
              <strong>Disclaimer:</strong> Text recognition accuracy may vary;
              currently, support for handwritten text is weak .
            </p>
            <div>
              <button
                id="submit-button"
                onClick={handleImageSubmit}
                type="button"
                disabled={imageData ? false : true}
              >
                Submit
              </button>
              <button
                id="close-button"
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        id="upload-argument-button"
        type="button"
        onClick={() => setShowPopup(true)}
      >
        <FileSvg />
        Upload Argument
      </button>
    </div>
  );
};

export default ImageTextExtractor;
