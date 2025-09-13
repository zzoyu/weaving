"use client";

import { useToast } from "@/hooks/use-toast";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function AlertToaster({}: {}) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const success = searchParams.get("success") === "true";

  useEffect(() => {
    if (message) {
      console.log(message);
      toast({
        title: message,
        variant: success ? "default" : "destructive",
      });
      const url = new URL(window.location.href);
      url.searchParams.delete("message");
      url.searchParams.delete("success");
      redirect(url.pathname + url.search);
    }
  }, [message, success]);
  return null;
}
