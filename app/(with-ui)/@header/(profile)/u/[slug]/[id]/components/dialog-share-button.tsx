"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";

import XIcon from "@/public/assets/images/x.svg";

export function DialogShareButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { toast } = useToast();
  const currentUrl = process.env.NEXT_PUBLIC_BASE_URL + usePathname();
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    currentUrl
  )}`;
  console.log(twitterShareUrl);
  // 복사 버튼 클릭 핸들러
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "링크가 복사되었습니다!",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="context-menu-item">{children}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-lg">
        <DialogHeader>
          <DialogTitle>공유하기</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row w-full">
            <Button
              type="button"
              size="lg"
              className=" w-16 h-16"
              asChild
              variant="default"
            >
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon />
              </a>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={currentUrl} readOnly />
            </div>
            <Button
              type="button"
              size="sm"
              className="px-3"
              onClick={handleCopy}
            >
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
