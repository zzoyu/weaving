"use client";
import React, { ReactNode } from "react";

interface ButtonShareProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shareData?: ShareData;
  children?: ReactNode;
}
export default function ButtonShare({
  shareData,
  children,
  ...props
}: ButtonShareProps) {
  function handleShare() {
    if (!navigator.userAgent.includes("Mobile")) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } else {
      try {
        navigator.share({ ...shareData, url: window.location.href });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  }
  return <button {...props}>{children}</button>;
}
