"use client";

import { useAdSense, useIntersectionObserver } from "@/hooks/use-adsense";
import { useRef, useState } from "react";
import { AdContainer, AdSkeleton } from "./ad-components";

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
  const adRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const isVisible = useIntersectionObserver(adRef, { threshold: 0.1 });

  const { isLoading, hasError, retryAd } = useAdSense(
    {
      adClient,
      adSlot,
      adFormat: "auto",
      fullWidthResponsive: true,
    },
    adRef
  );

  // 광고가 뷰포트에 들어오지 않았을 때는 빈 공간으로 처리
  if (!isVisible && !isLoading) {
    return (
      <div
        ref={adRef}
        key={"sidebar-ad-" + position}
        className={`
          fixed top-14 z-10 hidden xl:block
          ${position === "left" ? "left-2" : "right-2"}
        `}
        style={{ width: "160px", height: "calc(100vh - 56px)" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={adRef}
      key={"sidebar-ad-" + position}
      className={`
        fixed top-14 z-10 hidden xl:block
        transition-all duration-300 ease-in-out
        ${position === "left" ? "left-2" : "right-2"}
        ${isSticky ? "opacity-90" : "opacity-100"}
      `}
      style={{
        width: "160px",
        height: "calc(100vh - 56px)",
      }}
    >
      <div className="sticky top-4 h-fit max-h-[600px] overflow-hidden">
        <AdContainer className="w-full" label={`사이드바 광고 (${position})`}>
          {isLoading && (
            <AdSkeleton
              width="w-full"
              height="h-[600px]"
              className="rounded-lg border border-gray-200"
            />
          )}
          <ins
            className="adsbygoogle block w-full h-[600px] rounded-lg border border-gray-100"
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </AdContainer>
      </div>
    </div>
  );
}
