"use client";

import React from "react";

interface AdSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  loadingText?: string;
}

export function AdSkeleton({
  width = "w-full",
  height = "h-40",
  className = "",
  loadingText = "광고 로딩 중...",
}: AdSkeletonProps) {
  return (
    <div className={`${width} ${height} ${className}`}>
      <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg h-full flex items-center justify-center dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
        <div className="text-gray-400 dark:text-gray-500 text-sm font-medium">
          {loadingText}
        </div>
      </div>
    </div>
  );
}

interface AdErrorFallbackProps {
  onRetry?: () => void;
  className?: string;
}

interface AdContainerProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function AdContainer({
  children,
  className = "",
  label = "광고",
}: AdContainerProps) {
  return (
    <div
      className={`relative ${className}`}
      aria-label={label}
      role="complementary"
    >
      {/* 광고임을 나타내는 라벨 */}
      <div className="absolute -top-6 left-0 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-medium">
        AD
      </div>
      {children}
    </div>
  );
}
