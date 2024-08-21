import React from "react";
import "./ErrorReportStatus.scss";

type Props = {
  status: "pending" | "fixed";
};

const ErrorReportStatus = ({ status }: Props) => {
  return (
    <div className="badge">
      <div className={`badge-container ${status}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>
  );
};

export default ErrorReportStatus;
