"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ScrollContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 페이지 이동 시 스크롤을 최상단으로
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div
      ref={scrollRef}
      className="relative w-full h-full overflow-y-auto flex flex-col flex-1 min-h-0"
      style={{ scrollbarGutter: "stable" }}
    >
      {children}
    </div>
  );
}
