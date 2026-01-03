"use client";

import { useEffect, useState } from "react";

export const useIsMobileDevice = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = /Mobi|Android|iPhone/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  return isMobile;
};
