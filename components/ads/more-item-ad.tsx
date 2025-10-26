"use client";

import { useAdSense } from "@/hooks/use-adsense";
import { useRef } from "react";
import { AdContainer, AdSkeleton } from "./ad-components";

type Props = {
  adClient?: string;
  adSlot?: string;
};

export default function MorePageItemAd({
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  adSlot = "2408029349",
}: Props) {
  const adRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useAdSense(
    {
      adClient,
      adSlot,
      adLayout: "in-article",
      adFormat: "auto",
      fullWidthResponsive: true,
    },
    adRef
  );

  return (
    <div
      ref={adRef}
      className="w-full mt-10 mb-20 px-4 min-h-[120px]"
      key={"more-page-item-ad"}
    >
      <AdContainer className="max-w-2xl mx-auto" label="아이템 광고">
        {isLoading && (
          <AdSkeleton height="h-32 sm:h-40" className="rounded-lg" />
        )}
        <div className="w-full">
          <ins
            className="adsbygoogle block w-full min-h-[120px] rounded-lg"
            data-ad-layout="in-article"
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </AdContainer>
    </div>
  );
}
