import { FirestoreTimestamp } from "../../../types/sharedTypes";

/**
 * Converts Firestore timestamp to relative time description
 * @param {FirestoreTimestamp} timestamp - Firestore timestamp object with seconds and nanoseconds
 * @returns {string} - Relative time description
 */
export function getTimeDescription(timestamp: FirestoreTimestamp): string {
  const currentDate = new Date();
  const timestampDate = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  const differenceInMilliseconds =
    currentDate.getTime() - timestampDate.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  // Check if the difference is more than one month (approximately 30 days)
  if (differenceInDays > 30) {
    return "some time ago";
  } else {
    return "a little while ago";
  }
}
