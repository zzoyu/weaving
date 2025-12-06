import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function ButtonAddSomething({ href }: { href: string }) {
  return (
    <div className="absolute bottom-0">
      <Link href={href} className="button-add-action">
        <PlusIcon className="w-6 h-6" />
      </Link>
    </div>
  );
}
