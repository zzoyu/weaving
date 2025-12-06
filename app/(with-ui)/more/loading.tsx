import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col justify-start items-center pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto h-full pb-[3.75rem] min-h-fit relative px-4">
      <div className="flex flex-col items-center justify-start my-10 w-full">
        <Skeleton className="h-8 w-32 mb-8" />

        <div className="w-full space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-6 bg-white dark:bg-gray-800"
            >
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
