import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon, UserPlusIcon, GlobeIcon } from "lucide-react";
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

      <DialogContent className="sm:max-w-md border-neutral-200 dark:border-neutral-800">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
            추가하기
          </DialogTitle>
          <DialogDescription className="text-neutral-600 dark:text-neutral-400">
            새로운 캐릭터나 세계관을 추가해보세요
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-2">
          <Button
            asChild
            variant="outline"
            className="w-full h-auto py-4 justify-start gap-4 border-2 hover:border-primary/50 dark:hover:border-primary-accent/50 transition-all group hover:shadow-lg hover:scale-[1.02]"
          >
            <Link href={`/u/${slug}/add`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                <UserPlusIcon className="w-5 h-5 text-primary dark:text-primary-accent" />
              </div>
              <div className="flex flex-col items-start flex-1">
                <span className="font-semibold text-base">캐릭터 추가하기</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  새로운 캐릭터 만들기
                </span>
              </div>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full h-auto py-4 justify-start gap-4 border-2 hover:border-primary/50 dark:hover:border-primary-accent/50 transition-all group hover:shadow-lg hover:scale-[1.02]"
          >
            <Link href={`/u/${slug}/v/add`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-accent/10 dark:bg-primary-accent/20 group-hover:bg-primary-accent/20 dark:group-hover:bg-primary-accent/30 transition-colors">
                <GlobeIcon className="w-5 h-5 text-primary-accent dark:text-primary-accent" />
              </div>
              <div className="flex flex-col items-start flex-1">
                <span className="font-semibold text-base">세계관 추가하기</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  새로운 세계관 만들기
                </span>
              </div>
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
