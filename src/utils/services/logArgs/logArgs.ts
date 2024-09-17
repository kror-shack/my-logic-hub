import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../../../lib/firebase";
import { useSearchParams } from "next/navigation";
import {
  argumentIsFromSamples,
  storeDataInLS,
} from "../helperFunctions/helperFunctions";

type Pages =
  | "truth-table"
  | "venn-diagram"
  | "propositional-logic"
  | "quantificational-logic"
  | "indirect-proof"
  | "tree-proof"
  | "counter-model";

export const logArgs = async (page: Pages) => {
  try {
    setTimeout(() => {
      const currentUrl = window.location.href;
      if (!currentUrl) return;
      const urlObj = new URL(currentUrl);
      const params = new URLSearchParams(urlObj.search);
      const encodedArgument = params.get("argument");
      if (!encodedArgument) return;

      const argument = JSON.parse(decodeURIComponent(encodedArgument));
      const isSample = argumentIsFromSamples(argument);
      if (isSample) return; // it does not log argument or store it in local storage if it is a sample argument

      storeDataInLS(currentUrl);

      const firestore = getFirestore(app);
      const arg = { url: currentUrl, date: new Date() };

      const dbRef = collection(firestore, page);
      addDoc(dbRef, arg);
    }, 500); //TODO: remove timeout and pass the arg as props
  } catch (error) {
    console.log(error);
  }
};
