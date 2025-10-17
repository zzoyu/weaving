"use client";

import { useEffect } from "react";

type Props = {
  adClient?: string;
  adSlot?: string;
};

export default function MorePageItemAd({
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  adSlot = "2408029349",
}: Props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <div
      className="w-full p-0 border border-gray-200 dark:border-white/10 bg-white h-full block relative"
      key={"more-page-item-ad"}
      aria-hidden
    >
      <ins
        key={"more-page-item-ad"}
        className="adsbygoogle w-full h-full"
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
