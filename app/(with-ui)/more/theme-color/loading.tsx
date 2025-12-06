import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col h-full justify-start pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto px-4 pb-20">
      <div className="flex flex-col items-center justify-start my-10">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-5 w-48 mb-8" />
      </div>

      <div className="w-full space-y-8">
        {/* 차트 영역 */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>

        {/* 범례/색상 정보 */}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>

        {/* 통계 정보 */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
