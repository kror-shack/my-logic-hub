import { useEffect, useState } from "react";
import { SnackBarStatus } from "../../types/sharedTypes";
import "./Toast.scss";

const getToastMessage = (SnackBarStatus: SnackBarStatus): string => {
  switch (SnackBarStatus) {
    case "loading":
      return "Sending your email...";
    case "success":
      return "Your email was sent successfully!";
    case "error":
      return "Error sending your email";
    default:
      return "Error sending your email";
  }
};

type Props = {
  status: SnackBarStatus;
  setSnackBarStatus: React.Dispatch<
    React.SetStateAction<SnackBarStatus | undefined>
  >;
};

const Toast = ({ status, setSnackBarStatus }: Props) => {
  const snackBar = getToastMessage(status);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const delayedFunction = () => {
      setSnackBarStatus(null);
    };

    if (snackBar) {
      // Clear any previously set tmeouts
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(delayedFunction, 5000);
    }

    // Clean up the timeout when the component unmounts or when the value changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [snackBar]);

  return (
    <div className={`toast toast-${status} toast-${status ? "show" : ""}`}>
      <p className="toast-message">{snackBar}</p>
    </div>
  );
};

export default Toast;
