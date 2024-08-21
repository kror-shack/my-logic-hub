import {
  samplePropositionalLogicArg,
  samplePLIndirectProofArg,
  samplePLTreeArgument,
  sampleQuantificationalLogicArg,
  sampleTruthTableArgument,
  sampleVennDiagramArg,
} from "../../../data/sampleArguments/sampleArguments";
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

const PREFIX = "userInput";
const MAX_SIZE = 4 * 1024 * 1024; // 4MB in bytes

export const storeDataInLS = (userInput: string): void => {
  const newKeyNumber = getNextAvailableKeyNumber();
  const newKey = `${PREFIX}${newKeyNumber}`;

  while (getTotalSize() + getSizeInBytes(userInput) > MAX_SIZE) {
    const oldestKey = getOldestKey();
    if (oldestKey) {
      localStorage.removeItem(oldestKey);
    } else {
      break;
    }
  }

  localStorage.setItem(newKey, userInput);
};

export const getNextAvailableKeyNumber = (): number => {
  let maxNumber = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key.startsWith(PREFIX)) {
      const number = parseInt(key.substring(PREFIX.length), 10);
      if (!isNaN(number) && number > maxNumber) {
        maxNumber = number;
      }
    }
  }
  return maxNumber + 1;
};

export const getNumberOfStoredItems = (): number => {
  let count = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key.startsWith(PREFIX)) {
      count++;
    }
  }
  return count;
};

export const getOldestKey = (): string | null => {
  const keys = Object.keys(localStorage)
    .filter((key) => key.startsWith(PREFIX))
    .sort(
      (a, b) =>
        parseInt(a.substring(PREFIX.length)) -
        parseInt(b.substring(PREFIX.length))
    );

  return keys.length > 0 ? keys[0] : null;
};

export const getDataFromLS = (keyNumber: number): string | null => {
  const key = `${PREFIX}${keyNumber}`;
  return localStorage.getItem(key);
};

export const getSizeInBytes = (value: string): number => {
  return new Blob([value]).size;
};

export const getTotalSize = (): number => {
  let totalSize = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key.startsWith(PREFIX)) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        totalSize += getSizeInBytes(value);
      }
    }
  }
  return totalSize;
};

const sampleArguments = {
  samplePropositionalLogicArg,
  sampleQuantificationalLogicArg,
  samplePLIndirectProofArg,
  samplePLTreeArgument,
  sampleTruthTableArgument,
  sampleVennDiagramArg,
};

type Argument = string | string[];
export const argumentIsFromSamples = (arg: Argument): boolean => {
  if (Array.isArray(arg)) {
    return Object.values(sampleArguments).some(
      (sample) =>
        Array.isArray(sample) &&
        sample.length === arg.length &&
        sample.every((value, index) => value === arg[index])
    );
  } else {
    return sampleArguments.sampleTruthTableArgument === arg;
  }
};

export const formatDateTime = (timestamp: FirestoreTimestamp): string => {
  const { seconds, nanoseconds } = timestamp;
  const date = new Date(seconds * 1000 + nanoseconds / 1e6);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};
