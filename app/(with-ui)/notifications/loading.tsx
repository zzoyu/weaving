import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col justify-start pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto h-full items-center">
      <section className="w-full h-fit flex flex-col gap-8">
        <Skeleton className="h-20 w-full mb-20" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </section>
    </main>
  );
}
