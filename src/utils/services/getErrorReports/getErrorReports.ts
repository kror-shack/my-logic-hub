import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import app from "../../../lib/firebase";
import { ErrorReportsDoc } from "../../../types/sharedTypes";
import { formatDateTime } from "../helperFunctions/helperFunctions";

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
        data.createdAt &&
        typeof data.body === "string" &&
        typeof data.createdAt.seconds === "number" &&
        typeof data.createdAt.nanoseconds === "number"
      ) {
        errorReports.push({
          body: data.body,
          createdAt: formatDateTime(data.createdAt),
          status: data.status || "pending",
          reply: data.reply,
          link: data.link,
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
