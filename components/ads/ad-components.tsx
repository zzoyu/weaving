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

export function AdErrorFallback({
  onRetry,
  className = "",
}: AdErrorFallbackProps) {
  if (!onRetry) {
    // 에러 시 아무것도 렌더링하지 않음 (자연스럽게 사라짐)
    return null;
  }

  return (
    <div
      className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 ${className}`}
    >
      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          광고를 불러오는데 실패했습니다.
        </p>
        <button
          onClick={onRetry}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
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
