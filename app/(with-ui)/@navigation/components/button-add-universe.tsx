import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function ButtonAddUniverse({ slug }: { slug: string }) {
  const addHref = `/u/${slug}/v/add#top`;

  return (
    <div className="fixed bottom-6 z-30 w-full flex justify-center pointer-events-none">
      <Link
        href={addHref}
        className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-accent rounded-full flex items-center justify-center dark:text-text-black hover:scale-105 transition-transform hover:rotate-90 hover:-translate-y-0.5 pointer-events-auto ring-1 ring-primary/50"
      >
        <PlusIcon className="w-6 h-6" />
      </Link>
    </div>
  );
}
