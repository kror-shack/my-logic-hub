import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import app from "../../../lib/firebase";
import { WhatsNewDoc } from "../../../types/sharedTypes";

const getWhatsNew = async (): Promise<WhatsNewDoc[] | null> => {
  try {
    const firestore = getFirestore(app);
    const dbRef = collection(firestore, "whatsnew");

    const q = query(dbRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);

    const whatsNew: WhatsNewDoc[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("🚀 ~ querySnapshot.forEach ~ data:", data);

      if (
        typeof data.title === "string" &&
        data.createdAt &&
        typeof data.createdAt.seconds === "number" &&
        typeof data.createdAt.nanoseconds === "number" &&
        typeof data.body === "string"
      ) {
        whatsNew.push({
          title: data.title,
          createdAt: convertTimestampToDate(data.createdAt),
          body: data.body,
        });
      }
    });
    return whatsNew;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getWhatsNew;

type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
};

/**
 * Converts Firestore timestamp to readable date format
 * @param {FirestoreTimestamp} timestamp - Firestore timestamp object with seconds and nanoseconds
 * @returns {string} - Formatted date string including day and time
 */
function convertTimestampToDate(timestamp: FirestoreTimestamp): string {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  // Format options for date and time
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleString("en-US", options);
}
