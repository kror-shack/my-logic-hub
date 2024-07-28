import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import app from "../../../lib/firebase";
import { WhatsNewDoc } from "../../../types/sharedTypes";
import { getTimeDescription } from "../helperFunctions/helperFuntions";

const getWhatsNew = async (): Promise<WhatsNewDoc[] | null> => {
  try {
    const firestore = getFirestore(app);
    const dbRef = collection(firestore, "whatsnew");

    const q = query(dbRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);

    const whatsNew: WhatsNewDoc[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (
        typeof data.title === "string" &&
        data.createdAt &&
        typeof data.createdAt.seconds === "number" &&
        typeof data.createdAt.nanoseconds === "number" &&
        typeof data.body === "string"
      ) {
        whatsNew.push({
          title: data.title,
          createdAt: getTimeDescription(data.createdAt),
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
