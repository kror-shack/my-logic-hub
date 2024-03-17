import React from "react";
import emailjs from "@emailjs/browser";
import { SnackBarStatus } from "../../types/sharedTypes";

type SetSnackBarStatus = React.Dispatch<
  React.SetStateAction<SnackBarStatus | undefined>
>;

const useEmailSender = (setSnackBarStatus: SetSnackBarStatus) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const sendEmail = async (formRef: React.RefObject<HTMLFormElement>) => {
    if (formRef.current && serviceId && templateId && publicKey) {
      setSnackBarStatus("loading");
      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).then(
        (result) => {
          formRef?.current?.reset();
          setSnackBarStatus("success");
        },
        (error) => {
          setSnackBarStatus("error");
        }
      );
    }
  };

  return { sendEmail };
};

export default useEmailSender;
