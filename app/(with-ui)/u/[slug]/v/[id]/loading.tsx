import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 pb-20">
      {/* UniverseCard 스켈레톤 */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Carousel 스켈레톤 */}
        <div className="w-full max-w-md relative">
          <Skeleton className="w-full h-64 rounded-lg" />
          {/* Carousel 버튼들 */}
          <Skeleton className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full" />
          <Skeleton className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full" />
        </div>

        {/* 제목과 설명 스켈레톤 */}
        <div className="flex flex-col justify-center items-center gap-2 w-full mt-10">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* 속성 스켈레톤 */}
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div className="text-gray-700 w-full px-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2 w-full"
              >
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 소속 캐릭터 섹션 스켈레톤 */}
      <div className="w-full mt-6 px-4">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1 overflow-hidden rounded-md relative"
            >
              <Skeleton className="w-24 h-24 rounded-full m-2" />
              <Skeleton className="w-full h-8 rounded-none" />
            </div>
          ))}
        </div>
      </div>

      {/* 해시태그 스켈레톤 */}
      <div className="inline-flex flex-wrap gap-2 px-10 place-self-start">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>
    </div>
  );
}
