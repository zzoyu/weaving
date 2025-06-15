import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function ButtonAddUniverse({ slug }: { slug: string }) {
  return (
    <Link
      className="w-14 h-14 bg-primary rounded-full flex items-center justify-center fixed bottom-20 right-4 z-30"
      href={`/u/${slug}/v/add`}
    >
      <PlusIcon className="w-6 h-6" />
    </Link>
  );
} 