"use client";

import ShareIcon from "@/public/assets/icons/share.svg";

interface ButtonShareProps {
  shareData?: ShareData;
}
export default function ButtonShare({ shareData }: ButtonShareProps) {
  function handleShare() {
    if (!navigator.userAgent.includes("Mobile")) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } else {
      try {
        navigator.share({ ...shareData, url: window.location.href });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  }
  return (
    <button className="p-1">
      <ShareIcon width={24} height={24} onClick={handleShare} />
    </button>
  );
}
