export function UniverseListSkeleton() {
  return (
    <article className="flex flex-col items-center justify-center gap-2 md:gap-4 mt-2 md:mt-5 w-full max-w-xl px-4 mx-auto">
      <div className="w-full flex flex-col items-center mb-4">
        <div className="h-8 w-48 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse mb-2.5" />
        <div className="h-5 w-32 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse" />
      </div>
      
      <div className="w-full flex flex-row gap-2 md:gap-4 justify-center items-center mb-10">
        <div className="flex items-center rounded-full relative w-full max-w-sm mx-auto h-fit">
          <div className="w-full h-10 bg-gray-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-24 bg-gray-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        ))}
      </div>
    </article>
  );
} 