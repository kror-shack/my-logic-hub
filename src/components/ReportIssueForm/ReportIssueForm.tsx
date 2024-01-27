"use client";

import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ReportIssueForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const [snackbar, setSnackBar] = useState<string | undefined>();

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current && serviceId && templateId && publicKey) {
      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).then(
        (result) => {
          formRef?.current?.reset();
          setSnackBar("Your issue has been sucessfully reported!");
        },
        (error) => {
          setSnackBar(
            "There was a technical error while reporting your issue. Please try again in a while."
          );
        }
      );
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const delayedFunction = () => {
      setSnackBar(undefined);
    };

    if (snackbar) {
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
  }, [snackbar]);

  return (
    <>
      {snackbar !== undefined && (
        <div
          className={
            snackbar
              ? snackbar === "Your issue has been sucessfully reported!"
                ? "show-snack-bar snack-bar success"
                : "show-snack-bar snack-bar error"
              : "snack-bar"
          }
        >
          {snackbar}
        </div>
      )}
      <form aria-label="Report Issue Form" ref={formRef} onSubmit={sendEmail}>
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
        <label className="label">Q) Which page did the issue occur on?</label>
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
        <label className="label">Q) Was the issue technical or logical?</label>
        <div className="radio-container">
          <label>
            <input type="radio" name="issueType" value="technical" required />
            Technical
          </label>
          <label>
            <input type="radio" name="issueType" value="logical" />
            Logical
          </label>
        </div>
        <label className="label textarea-label">Describe the issue:</label>
        <textarea
          name="message"
          aria-label="form message"
          rows={4}
          placeholder="Please describe the issue that you are facing in detail."
          required
        />
        <button type="submit">Report</button>
      </form>
    </>
  );
};

export default ReportIssueForm;