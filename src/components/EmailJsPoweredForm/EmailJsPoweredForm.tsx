"use client";

import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import useEmailSender from "../../hooks/useEmailSender/useEmailSender";
import Toast from "../Toast/Toast";
import { SnackBarStatus } from "../../types/sharedTypes";

type Props = {
  pageType: "Request Feature" | "Report Issue";
};

const EmailJsPoweredForm = ({ pageType }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [snackBarStatus, setSnackBarStatus] = useState<
    SnackBarStatus | undefined
  >();
  const { sendEmail } = useEmailSender(setSnackBarStatus);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    sendEmail(formRef);
  };

  return (
    <>
      {snackBarStatus && (
        <Toast status={snackBarStatus} setSnackBarStatus={setSnackBarStatus} />
      )}
      <form
        aria-label={`${pageType} form`}
        ref={formRef}
        onSubmit={handleFormSubmit}
      >
        <div className="email-container">
          <label aria-label="form email" htmlFor="user_email" className="label">
            Email:
          </label>
          <input
            name="user_email"
            id="user_email"
            type="email"
            placeholder="If you'd like to be updated."
          />
        </div>
        {pageType === "Report Issue" && (
          <>
            <label className="label">
              Q) Which page did the issue occur on?
            </label>
            <div className="radio-container">
              <label>
                <input type="radio" name="page" value="PLCalc" required />
                PL Calculator
              </label>
              <label>
                <input type="radio" name="page" value="QLCalc" />
                QL Calculator
              </label>
              <label>
                <input type="radio" name="page" value="ST" />
                Semantic Tableaux
              </label>
              {/* <label>
                <input type="radio" name="page" value="QLIndirectProof" />
                QL Indirect Proof
              </label> */}
              <label>
                <input type="radio" name="page" value="PLIndirectProof" />
                PL Indirect Proof
              </label>
              <label>
                <input type="radio" name="page" value="VennWizard" />
                Logic Venn
              </label>
              <label>
                <input type="radio" name="page" value="TruthTableGenerator" />
                Truth Table Generator
              </label>
              <label>
                <input type="radio" name="page" value="Other" />
                Other
              </label>
            </div>
            <label className="label">
              Q) Was the issue technical or logical?
            </label>
            <div className="radio-container">
              <label>
                <input
                  type="radio"
                  name="issueType"
                  value="technical"
                  required
                />
                Technical
              </label>
              <label>
                <input type="radio" name="issueType" value="logical" />
                Logical
              </label>
            </div>
          </>
        )}
        <label className="label textarea-label">
          Describe the {pageType === "Report Issue" ? "issue" : "feature"}:
        </label>
        <textarea
          name="message"
          aria-label="form message"
          rows={4}
          placeholder={
            pageType === "Report Issue"
              ? "Please describe the issue that you are facing in detail."
              : "Please describe the feature that you want."
          }
          required
        />
        <button type="submit">
          {pageType === "Report Issue" ? "Report" : "Request"}
        </button>
      </form>
    </>
  );
};

export default EmailJsPoweredForm;
