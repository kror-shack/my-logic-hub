import React, { useState } from "react";
import { postErrorReport } from "../../utils/services/postErrorReport/postErrorReport";
import "./ReportArgumentButton.scss";
import Cross from "../../../public/assets/svgs/cross.svg";
import "../../styles/popup-styles.scss";
import Toast from "../Toast/Toast";
import { SnackBarStatus } from "../../types/sharedTypes";

const ReportArgumentButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [snackBarStatus, setSnackBarStatus] = useState<
    SnackBarStatus | undefined
  >();
  const currentUrl = window.location.href;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSnackBarStatus("loading");
    setShowPopup(false);

    try {
      await postErrorReport({
        url: currentUrl,
        description,
        email,
        timestamp: new Date(),
      });
      setSnackBarStatus("success");
    } catch (err) {
      setSnackBarStatus("error");
    } finally {
    }
  };

  return (
    <>
      {snackBarStatus && (
        <Toast status={snackBarStatus} setSnackBarStatus={setSnackBarStatus} />
      )}
      <div className="report-arg-container">
        <button className="report-arg-btn" onClick={() => setShowPopup(true)}>
          Report Argument
        </button>

        {showPopup && (
          <div>
            <div className="loading-overlay">
              <div className="popup-content popup">
                <button className="close" onClick={() => setShowPopup(false)}>
                  <Cross />
                </button>

                <form className="form" onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Email (optional):
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Description (optional):
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                      />
                    </label>
                  </div>
                  <p>Your current argument will be be reported.</p>
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReportArgumentButton;
