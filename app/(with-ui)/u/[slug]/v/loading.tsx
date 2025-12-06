import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col justify-start items-center pt-2 lg:pt-10 w-full lg:max-w-[40rem] mx-auto h-full pb-[3.75rem] min-h-fit relative">
      <div className="flex flex-col items-center justify-start my-10">
        <Skeleton className="h-8 w-48 mb-2.5" />
        <Skeleton className="h-5 w-32" />
      </div>

      <div className="w-full mt-2 pb-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800"
            >
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
