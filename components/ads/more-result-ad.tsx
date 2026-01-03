"use client";

import { useAdSense } from "@/hooks/use-adsense";
import { useRef } from "react";
import { AdContainer, AdSkeleton } from "./ad-components";

type Props = {
  adClient?: string;
  adSlot?: string;
};

export default function MorePageResultAd({
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  adSlot = "8926557427",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useAdSense(
    {
      adClient,
      adSlot,
      adFormat: "auto",
      fullWidthResponsive: true,
    },
    containerRef
  );

  // 광고가 뷰포트에 들어오지 않았을 때 placeholder
  if (!isLoading) {
    return (
      <div
        ref={containerRef}
        className="w-full max-w-md mx-auto mb-6 min-h-[160px]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full max-w-md mx-auto mb-6 min-h-[160px]"
      key={"more-page-result-ad"}
    >
      <AdContainer className="w-full" label="결과 페이지 광고">
        <AdSkeleton height="h-40" className="rounded-lg" />
        <div className="w-full h-full">
          <ins
            className="adsbygoogle block w-full min-h-[160px] rounded-lg"
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
