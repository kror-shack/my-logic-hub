"use client";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import "./ErrorPage.scss";
import Header from "../components/Header/Header";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Header heading="404" />
      <main className="Error-page">
        <h1>404 - Page Not Found</h1>
        <p>
          Sorry, the page you are looking for does not exist. This error
          indicates a wrong url.
        </p>
      </main>
    </>
  );
}
