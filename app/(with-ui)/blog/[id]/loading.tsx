import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col justify-start pt-2 w-full lg:max-w-[40rem] mx-auto min-h-screen">
      <div className="fixed top-0 w-full flex p-4 z-10 bg-white dark:bg-gray-900">
        <Skeleton className="h-7 w-24" />
      </div>

      <div className="p-4 pt-16">
        <article className="pt-6 lg:pt-10 px-2 lg:px-4">
          {/* 제목 */}
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-3/4 mb-6" />

          {/* 메타 정보 */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* 썸네일 */}
          <Skeleton className="h-64 w-full mb-8 rounded-lg" />

          {/* 본문 내용 */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />

            <div className="py-4" />

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </article>
      </div>
    </main>
  );
}
