"use client";

import { useAdSense, useIntersectionObserver } from "@/hooks/use-adsense";
import { useRef } from "react";
import { AdContainer, AdErrorFallback, AdSkeleton } from "./ad-components";

type Props = {
  adClient?: string;
  adSlot?: string;
};

export default function MorePageItemAd({
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  adSlot = "2408029349",
}: Props) {
  const adRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(adRef, { threshold: 0.1 });

  const { isLoading, hasError, retryAd } = useAdSense(
    {
      adClient,
      adSlot,
      adLayout: "in-article",
      adFormat: "auto",
      fullWidthResponsive: true,
    },
    adRef
  );

  // 광고가 뷰포트에 들어오지 않았을 때 placeholder
  if (!isVisible && !isLoading) {
    return (
      <div
        ref={adRef}
        className="w-full mt-10 mb-20 px-4 min-h-[120px]"
        aria-hidden="true"
      />
    );
  }

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

        {hasError && <AdErrorFallback onRetry={retryAd} className="h-32" />}

        {!isLoading && !hasError && isVisible && (
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
        )}
      </AdContainer>
    </div>
  );
}
