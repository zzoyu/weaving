import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col justify-start items-center pt-2 lg:pt-10 mx-auto h-full pb-10 min-h-fit relative">
      <Skeleton className="h-10 w-80 mb-4" />
      <Skeleton className="h-10 w-80 mb-32" />
      <div className="gap-4 grid grid-cols-3">
        <Skeleton className="h-32 w-32 mb-4" />
        <Skeleton className="h-32 w-32 mb-4" />
        <Skeleton className="h-32 w-32 mb-4" />
        <Skeleton className="h-32 w-32 mb-4" />
        <Skeleton className="h-32 w-32 mb-4" />
        <Skeleton className="h-32 w-32 mb-4" />
        <Skeleton className="h-32 w-32 mb-4" />
        <Skeleton className="h-32 w-32 mb-4" />
      </div>
    </section>
  );
}
