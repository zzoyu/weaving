"use client";

import { SupabaseError } from "@/types/error-code";

export default function Error({
  error,
}: {
  error: SupabaseError & { digest?: string };
}) {
  return (
    <main className="h-full grid place-items-center">
      <div>
        <h1>404</h1>
        <p>페이지를 찾을 수 없습니다.</p>
      </div>
    </main>
  );
}
