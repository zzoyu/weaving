"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

// 컨테이너가 유효한 크기를 가지는지 확인
export function hasValidSize(element: HTMLElement | null): boolean {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

// AdSense 환경 설정 확인
export function validateAdSenseConfig(config: AdConfig): {
  isValid: boolean;
  error?: string;
} {
  if (!config.adClient) {
    return {
      isValid: false,
      error: "AdSense Client ID가 설정되지 않았습니다.",
    };
  }

  if (!config.adSlot) {
    return { isValid: false, error: "AdSense Slot ID가 설정되지 않았습니다." };
  }

  // Client ID 형식 검증 (ca-pub-로 시작해야 함)
  if (!config.adClient.startsWith("ca-pub-")) {
    return {
      isValid: false,
      error: "AdSense Client ID 형식이 올바르지 않습니다.",
    };
  }

  return { isValid: true };
}

export interface AdConfig {
  adClient?: string;
  adSlot?: string;
  adFormat?: string;
  adLayout?: string;
  adLayoutKey?: string;
  fullWidthResponsive?: boolean;
}

export function useAdSense(
  config: AdConfig,
  containerRef?: React.RefObject<HTMLElement>
) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 설정이 유효한지 메모이제이션으로 확인
  const configValidation = useMemo(() => {
    return validateAdSenseConfig(config);
  }, [config]);

  const pushAd = useCallback(() => {
    try {
      // 설정 유효성 확인
      if (!configValidation.isValid) {
        console.warn(
          "AdSense: Invalid configuration -",
          configValidation.error
        );
        setHasError(true);
        setIsLoading(false);
        return;
      }

      // 컨테이너 크기 확인 (있는 경우만)
      if (containerRef && !hasValidSize(containerRef.current)) {
        console.warn("AdSense: Container size is invalid, skipping ad load");
        return;
      }

      // AdSense 광고 푸시
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setIsLoading(false);
      setIsVisible(true);
    } catch (error) {
      console.error("AdSense error:", error);
      setHasError(true);
      setIsLoading(false);
    }
  }, [configValidation.isValid, configValidation.error, containerRef]);

  useEffect(() => {
    if (typeof window === "undefined") {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let scriptCheckCount = 0;
    let containerCheckCount = 0;
    const maxScriptRetries = 100; // 10초 (100ms * 100)
    const maxContainerRetries = 50; // 5초 (100ms * 50)

    // AdSense 스크립트 로드 대기 (더 긴 시간)
    const checkAdSenseScript = () => {
      // 스크립트가 로드되면 컨테이너 크기 확인
      if (containerRef) {
        const checkContainerSize = () => {
          if (hasValidSize(containerRef.current)) {
            pushAd();
          } else if (containerCheckCount < maxContainerRetries) {
            containerCheckCount++;
            timeoutId = setTimeout(checkContainerSize, 100);
          } else {
            console.warn("AdSense: Container size check timeout");
            setHasError(true);
            setIsLoading(false);
          }
        };
        timeoutId = setTimeout(checkContainerSize, 100);
      } else {
        // 컨테이너 참조가 없는 경우 바로 로드
        timeoutId = setTimeout(pushAd, 100);
      }
    };

    // 초기 지연 후 스크립트 확인 시작
    timeoutId = setTimeout(checkAdSenseScript, 500);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [pushAd, containerRef]);

  const retryAd = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(pushAd, 100);
  }, [pushAd]);

  return {
    isLoading,
    hasError,
    isVisible,
    retryAd,
    // 개발 환경에서만 노출되는 디버깅 정보
    ...(process.env.NODE_ENV === "development" && {
      debug: {
        configValid: configValidation.isValid,
        configError: configValidation.error,
        containerSize: containerRef?.current
          ? hasValidSize(containerRef.current)
          : null,
      },
    }),
  };
}
