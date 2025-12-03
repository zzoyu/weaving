import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function ButtonAddAction({ slug }: { slug: string }) {
  return (
    <Dialog>
      <div className="fixed bottom-6 z-30 w-full flex justify-center pointer-events-none">
        <DialogTrigger asChild>
          <button className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-accent rounded-full flex items-center justify-center dark:text-text-black hover:scale-105 transition-transform hover:rotate-90 hover:-translate-y-0.5 pointer-events-auto ring-1 ring-primary/50">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>추가하기</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Link
            href={`/u/${slug}/add`}
            className="w-full px-4 py-3 bg-gray-100 rounded-lg text-center hover:bg-gray-200"
          >
            캐릭터 추가하기
          </Link>
          <Link
            href={`/u/${slug}/v/add`}
            className="w-full px-4 py-3 bg-gray-100 rounded-lg text-center hover:bg-gray-200"
          >
            세계관 추가하기
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
