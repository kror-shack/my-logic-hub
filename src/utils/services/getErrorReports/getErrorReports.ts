import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import app from "../../../lib/firebase";
import { ErrorReportsDoc } from "../../../types/sharedTypes";

const getErrorReports = async (): Promise<ErrorReportsDoc[] | null> => {
  try {
    const firestore = getFirestore(app);
    const dbRef = collection(firestore, "error-reports");

    const q = query(dbRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);

    const errorReports: ErrorReportsDoc[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (
        (typeof data.by === "string" || data.by === null) &&
        data.createdAt &&
        typeof data.body === "string"
      ) {
        errorReports.push({
          by: data.by,
          body: data.body,
        });
      }
    });
    return errorReports;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getErrorReports;
