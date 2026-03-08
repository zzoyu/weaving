"use client";

import { useAdSense } from "@/hooks/use-adsense";
import { useEffect, useRef, useState } from "react";
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
  const [shouldRender, setShouldRender] = useState(false);

  // 뷰포트가 충분히 큰 경우에만 광고를 렌더링
  useEffect(() => {
    const checkViewport = () => {
      // lg 브레이크포인트는 1024px
      setShouldRender(window.innerWidth >= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const { isLoading, hasError } = useAdSense(
    {
      adClient,
      adSlot,
      adFormat: "auto",
      fullWidthResponsive: true,
    },
    shouldRender ? adRef : undefined, // 렌더링하지 않을 경우 ref 전달하지 않음
  );

  if (hasError || !shouldRender) {
    return null;
  }

  return (
    <div
      ref={adRef}
      key={"sidebar-ad-" + position}
      className={`
        fixed top-14 z-10 hidden lg:block
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
            style={{ display: "block" }}
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
