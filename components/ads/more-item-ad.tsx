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
      className="flex justify-center items-center w-full relative max-w-full mt-10 mb-20"
      key={"more-page-item-ad"}
      aria-hidden="true"
    >
      <ins
        key={"more-page-item-ad"}
        className="adsbygoogle absolute -translate-x-1/2 left-1/2"
        data-ad-layout="in-article"
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
