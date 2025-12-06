import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col justify-start items-center pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto h-full pb-[3.75rem] min-h-fit relative">
      <div className="flex flex-col items-center justify-start my-6 w-full px-4">
        <Skeleton className="h-8 w-48 mb-4" />
      </div>

      <div className="w-full px-4 space-y-6">
        {/* 폼 필드들 */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-32 w-full" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-5 w-36" />
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-3 pt-6">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>
      </div>
    </main>
  );
}
