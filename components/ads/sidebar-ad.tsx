"use client";

import { useEffect } from "react";

type Props = {
  position?: "left" | "right";
  adClient?: string;
  adSlot?: string;
};

export default function SidebarAd({
  position = "left",
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  adSlot = "5446812182",
}: Props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <>
      <div
        key={"sidebar-ad-" + position}
        className={`fixed top-14 overflow-y-clip ${
          position === "left"
            ? "left-0 flex justify-start"
            : "right-0 flex justify-end"
        } z-10 lg:w-40 h-full hidden lg:block`}
        aria-hidden
      >
        <ins
          className="adsbygoogle justify-center my-2 w-full h-[600px] block"
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
}
