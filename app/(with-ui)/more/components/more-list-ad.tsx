"use client";

import { AdContainer, AdSkeleton } from "@/components/ads/ad-components";
import { useAdSense } from "@/hooks/use-adsense";
import { useRef } from "react";

export default function MoreListAd() {
  const adRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useAdSense(
    {
      adClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
      adSlot: "7399964203",
      adFormat: "fluid",
      fullWidthResponsive: true,
    },
    adRef
  );

  return (
    <article
      key={`more-page-ad`}
      className="more-list-item min-h-[170px] h-full p-0 hidden lg:block"
    >
      <AdContainer className="w-full h-full" label="더보기 페이지 광고">
        {isLoading && (
          <AdSkeleton
            height="lg:w-full h-40 lg:h-48 w-full"
            className="rounded-lg"
          />
        )}
        <div className="h-full w-full relative" ref={adRef}>
          <ins
            className="adsbygoogle block w-full h-full rounded-lg"
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ""}
            data-ad-slot="7399964203"
            data-ad-format="fluid"
            data-full-width-responsive="true"
            data-ad-layout-key="+1w+rx+1+2-3"
          ></ins>
        </div>
      </AdContainer>
    </article>
  );
}
