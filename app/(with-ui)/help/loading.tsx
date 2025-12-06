import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center h-full bg-white dark:bg-gray-900 px-4">
      <div className="max-w-md mx-auto w-full py-20">
        <Skeleton className="h-8 w-48 mb-8 mx-auto" />

        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-6 bg-white dark:bg-gray-800"
            >
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
