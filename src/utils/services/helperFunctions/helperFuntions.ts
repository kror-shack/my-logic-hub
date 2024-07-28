import { FirestoreTimestamp } from "../../../types/sharedTypes";

/**
 * Converts Firestore timestamp to readable date format
 * @param {FirestoreTimestamp} timestamp - Firestore timestamp object with seconds and nanoseconds
 * @returns {string} - Formatted date string including day and time
 */
export function convertTimestampToDate(timestamp: FirestoreTimestamp): string {
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
