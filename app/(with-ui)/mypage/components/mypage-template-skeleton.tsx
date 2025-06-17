import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function MypageTemplateSkeleton() {
  return (
    <main className="flex flex-col items-center justify-start w-full h-full pt-10">
      <section className="w-full max-w-md p-4 bg-white dark:bg-neutral-900 rounded">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">접속 중인 계정</h2>
          <div className="space-y-4 mt-4">
            {/* Profile Edit Form Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        {/* List Friend Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        <div className="mb-4 flex flex-col">
          <Separator className="my-2" />
          <Skeleton className="h-10 w-full" />
          <Separator className="my-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </section>

      <div className="flex flex-row items-center justify-center w-full max-w-md p-4">
        <Skeleton className="h-4 w-16" />
        <Separator className="mx-2" orientation="vertical" />
        <Skeleton className="h-4 w-24" />
      </div>

      <Skeleton className="h-10 w-24" />
    </main>
  );
}
