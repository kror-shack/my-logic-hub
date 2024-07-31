import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../../../lib/firebase";

type Pages =
  | "truth-table"
  | "venn-diagram"
  | "propositional-logic"
  | "quantificational-logic"
  | "indirect-proof"
  | "tree-proof";

export const logArgs = async (page: Pages) => {
  try {
    setTimeout(() => {
      const currentUrl = window.location.href;
      if (!currentUrl) return;

      const firestore = getFirestore(app);
      const arg = { url: currentUrl, date: new Date() };

      const dbRef = collection(firestore, page);
      addDoc(dbRef, arg);
    }, 500); //TODO: remove timeout and pass the arg as props
  } catch (error) {
    console.log(error);
  }
};
