"use client";

import { useEffect } from "react";

export default function HeaderAd() {
  let isPushed = false;
  useEffect(() => {
    try {
      isPushed || ((window.adsbygoogle = window.adsbygoogle || []).push({}), isPushed = true);
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
