"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";

import XIcon from "@/public/assets/images/x.svg";
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
          <div className="flex flex-row w-full gap-2 mt-2 justify-center">
            <Button
              type="button"
              size="icon"
              className="w-16 h-16 rounded-2xl"
              asChild
              variant="default"
            >
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon
                  className="text-white !w-6 !h-6"
                  viewBox="0 0 300 271"
                  fill="white"
                />
              </a>
            </Button>
            <Button
              type="button"
              size="lg"
              className="w-16 h-16 relative"
              variant="ghost"
              onClick={shareKakaotalk}
            >
              <Image
                src="/assets/images/kakaotalk_sharing_btn_medium.png"
                alt="카카오톡 공유 버튼"
                unoptimized
                width={0}
                height={0}
                fill
                className="h-12 w-12"
              />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
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
      </DialogContent>
    </Dialog>
  );
}
