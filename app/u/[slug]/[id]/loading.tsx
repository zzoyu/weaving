import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-full">
      <Skeleton className="w-96 h-96 mb-4" />
      <Skeleton className="h-10 w-32 mb-4" />
      <Skeleton className="h-80 w-full mb-4" />
      <Skeleton className="h-40 w-full mb-4" />
    </section>
  );
}
