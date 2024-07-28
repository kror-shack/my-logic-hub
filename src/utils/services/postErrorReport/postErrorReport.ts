import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../../../lib/firebase";

interface ErrorReport {
  url: string;
  description?: string;
  email?: string;
  timestamp: Date;
}

export const postErrorReport = async (report: ErrorReport) => {
  const firestore = getFirestore(app);

  const dbRef = collection(firestore, "argument-errors");
  await addDoc(dbRef, report);
};
