import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-start w-full h-full lg:pt-10 pt-0">
      <section className="w-full h-full max-w-md p-4 rounded">
        <div className="mb-4">
          <Skeleton className="h-8 w-32 mb-6" />

          <div className="space-y-6">
            {/* 프로필 정보 섹션 */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
