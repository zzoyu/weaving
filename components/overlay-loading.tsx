"use client";

import IconThreeDots from "@/public/assets/icons/3-dots-scale.svg";

export default function OverlayLoading({ message }: { message?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-3 bg-white/90 dark:bg-black/80 p-4 rounded-md shadow">
        <IconThreeDots className="w-6 h-6" />
        {message ? (
          <div className="text-sm text-gray-700">{message}</div>
        ) : null}
      </div>
    </div>
  );
}
