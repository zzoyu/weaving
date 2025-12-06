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
      <DialogTrigger asChild>
        <div className="absolute bottom-0">
          <button className="button-add-action">
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </DialogTrigger>

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
