import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col justify-start pt-2 w-full lg:max-w-[40rem] mx-auto">
      <div className="fixed top-0 w-full flex p-4 z-10 bg-white dark:bg-gray-900">
        <Skeleton className="h-7 w-24" />
      </div>

      <div className="p-4 pt-16">
        <div className="pt-6 lg:pt-10 px-2 lg:px-4">
          <div className="space-y-8">
            {[...Array(5)].map((_, i) => (
              <article key={i} className="border-b pb-6 last:border-b-0">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
