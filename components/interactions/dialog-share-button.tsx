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

import XIcon from "@/public/assets/images/share/x.svg";
import Image from "next/image";
import Script from "next/script";
import { useMemo } from "react";

const KAKAO_CLIENT_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function DialogShareButton({
  children,
  title,
  description,
  thumbnailUrl,
  templateId,
  targetPath,
  extraVariables = {},
  twitterShareText,
}: {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  templateId?: number;
  targetPath?: string;
  extraVariables?: { [key: string]: string };
  twitterShareText?: string;
}) {
  const { toast } = useToast();
  const pathname = usePathname();
  const currentUrl = useMemo(() => BASE_URL + pathname, [pathname]);
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    targetPath || currentUrl
  )}&text=${encodeURIComponent(twitterShareText || title || "")}`;
  // 복사 버튼 클릭 핸들러
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetPath || currentUrl);
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

  const shareKakaotalk = () => {
    const Kakao = (window as any).Kakao;
    Kakao.Share.sendCustom({
      templateId,
      templateArgs: {
        TITLE: title,
        DESC: description,
        THUMBNAIL: thumbnailUrl,
        PATH: targetPath || pathname,
        ...extraVariables,
      },
    });
  };

  return (
    <Dialog>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js"
        integrity="sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p"
        crossOrigin="anonymous"
        onLoad={() => {
          if (!(window as any)?.Kakao?.isInitialized?.()) {
            (window as any)?.Kakao?.init?.(KAKAO_CLIENT_KEY);
          }
        }}
      ></Script>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md h-lg">
        <DialogHeader>
          <DialogTitle>공유하기</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row w-full gap-2 mt-2 justify-center">
            <Button
              type="button"
              size="icon"
              className="w-full justify-start sm:justify-center sm:w-16 h-16 px-2 sm:p-0 rounded-lg"
              asChild
              variant="default"
            >
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-16 h-16 m-0 p-0 flex items-center justify-center fill-white dark:fill-black">
                  <XIcon
                    className="text-white !w-6 !h-6"
                    viewBox="0 0 300 271"
                  />
                </div>
                <span className="sm:hidden ml-4 text-lg">X (twitter)</span>
              </a>
            </Button>
            <Button
              type="button"
              size="lg"
              className="w-full sm:w-16 h-16 relative !bg-[#FAE100] justify-start px-4 sm:p-0 sm:justify-center"
              onClick={shareKakaotalk}
            >
              <Image
                src="/assets/images/share/kakaotalk_sharing_btn_medium.png"
                alt="카카오톡 공유 버튼"
                unoptimized
                width={64}
                height={64}
                className="h-12 w-12"
              />
              <span className="sm:hidden ml-6 text-lg text-text-black">
                카카오톡
              </span>
            </Button>
            <Button
              type="button"
              size="lg"
              className="w-full sm:w-16 h-16 relative justify-start px-2 sm:p-0 sm:justify-center [&_svg]:size-6 sm:hidden"
              variant="darker-secondary"
              onClick={handleCopy}
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <Copy />
              </div>
              <span className="sm:hidden ml-4 text-lg">링크 복사</span>
            </Button>
          </div>

          <div className="items-center space-x-2 hidden sm:flex">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={targetPath || currentUrl}
                readOnly
              />
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
        <DialogFooter className="sm:hidden">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full h-16 text-lg font-bold text-opacity-70"
            >
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
