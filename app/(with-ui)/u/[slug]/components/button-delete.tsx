"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { ReactNode } from "react";

interface ButtonShareProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shareData?: ShareData;
  children?: ReactNode;
}
export default function ButtonDelete({
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
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button {...props}>{children}</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
