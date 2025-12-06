import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full lg:max-w-xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center space-y-6">
        <Skeleton className="h-10 w-64 mb-4" />

        {/* 설명 텍스트 */}
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        {/* 생성 버튼 */}
        <Skeleton className="h-14 w-full max-w-md rounded-lg" />

        {/* 결과 영역 */}
        <div className="w-full max-w-md mt-8 space-y-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
