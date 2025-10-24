// AdSense 관련 타입 정의
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export interface AdSenseConfig {
  adClient: string;
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  adLayout?: "in-article" | "";
  fullWidthResponsive?: boolean;
}

export interface AdComponentProps {
  adClient?: string;
  adSlot?: string;
  className?: string;
  "aria-label"?: string;
}

export interface AdState {
  isLoading: boolean;
  hasError: boolean;
  isVisible: boolean;
  retryCount: number;
}

export interface AdDebugInfo {
  configValid: boolean;
  configError?: string;
  adSenseLoaded: boolean;
  containerSize: boolean | null;
}

export interface AdHookReturn {
  isLoading: boolean;
  hasError: boolean;
  isVisible: boolean;
  retryAd: () => void;
  debug?: AdDebugInfo;
}

export {};
