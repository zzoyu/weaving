"use client";

import { useEffect, useState } from "react";
import { isAdSenseLoaded, validateAdSenseConfig } from "@/hooks/use-adsense";

interface AdSenseDebugInfo {
  scriptLoaded: boolean;
  windowAdsbygoogle: boolean;
  clientId: string | undefined;
  scriptElement: boolean;
  configValid: boolean;
  configError?: string;
}

export default function AdSenseDebugPanel() {
  const [debugInfo, setDebugInfo] = useState<AdSenseDebugInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 개발 모드에서만 표시
    if (process.env.NODE_ENV !== 'development') return;

    const updateDebugInfo = () => {
      const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
      const config = {
        adClient: clientId,
        adSlot: "test-slot"
      };
      const validation = validateAdSenseConfig(config);

      setDebugInfo({
        scriptLoaded: isAdSenseLoaded(),
        windowAdsbygoogle: !!(typeof window !== "undefined" && window.adsbygoogle),
        clientId,
        scriptElement: !!(typeof document !== "undefined" && document.querySelector('script[src*="adsbygoogle.js"]')),
        configValid: validation.isValid,
        configError: validation.error,
      });
    };

    // 초기 업데이트
    updateDebugInfo();

    // 5초마다 업데이트
    const interval = setInterval(updateDebugInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  // 개발 모드가 아니거나 디버그 정보가 없으면 렌더링하지 않음
  if (process.env.NODE_ENV !== 'development' || !debugInfo) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg hover:bg-blue-700"
      >
        AdSense Debug
      </button>
      
      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-xl min-w-[300px]">
          <h3 className="text-sm font-bold mb-3 text-gray-900 dark:text-white">
            AdSense Debug Info
          </h3>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Script Loaded:</span>
              <span className={debugInfo.scriptLoaded ? "text-green-600" : "text-red-600"}>
                {debugInfo.scriptLoaded ? "✓" : "✗"}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>window.adsbygoogle:</span>
              <span className={debugInfo.windowAdsbygoogle ? "text-green-600" : "text-red-600"}>
                {debugInfo.windowAdsbygoogle ? "✓" : "✗"}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Script Element:</span>
              <span className={debugInfo.scriptElement ? "text-green-600" : "text-red-600"}>
                {debugInfo.scriptElement ? "✓" : "✗"}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Config Valid:</span>
              <span className={debugInfo.configValid ? "text-green-600" : "text-red-600"}>
                {debugInfo.configValid ? "✓" : "✗"}
              </span>
            </div>
            
            <div className="border-t pt-2">
              <div className="mb-1">
                <span className="font-medium">Client ID:</span>
              </div>
              <div className="text-gray-600 dark:text-gray-300 break-all">
                {debugInfo.clientId || "Not set"}
              </div>
            </div>
            
            {debugInfo.configError && (
              <div className="border-t pt-2">
                <div className="mb-1">
                  <span className="font-medium text-red-600">Error:</span>
                </div>
                <div className="text-red-600 text-xs">
                  {debugInfo.configError}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}