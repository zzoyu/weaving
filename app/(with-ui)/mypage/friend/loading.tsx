import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-start w-full h-full lg:pt-10 pt-0">
      <section className="w-full h-full max-w-md p-4 rounded">
        <div className="mb-4">
          <Skeleton className="h-7 w-32 mb-8" />

          <div className="flex flex-col gap-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 px-2"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
