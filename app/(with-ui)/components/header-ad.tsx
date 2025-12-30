"use client";

import { useEffect, useState } from "react";

export default function HeaderAd() {
  const [isPushed, setIsPushed] = useState(false);
  useEffect(() => {
    try {
      isPushed || ((window.adsbygoogle = window.adsbygoogle || []).push({}), setIsPushed(true));
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <div
      className="mx-auto w-full flex justify-center items-center overflow-hidden"
      style={{ height: "50px" }}
    >
      <ins
        className="adsbygoogle block"
        data-ad-client="ca-pub-8566989289200896"
        data-ad-slot="3734400914"
        style={{ display: "block", width: "320px", height: "50px" }}
      ></ins>
    </div>
  );
}
