"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface ButtonShareUniverseProps {
  universeId: number;
  children?: React.ReactNode;
}

export default function ButtonShareUniverse({
  universeId,
  children,
}: ButtonShareUniverseProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/u${pathname}`
      : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-base text-gray-700 hover:text-primary-500"
        >
          {children || "세계관 공유"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>공유하기</DialogTitle>
          <DialogDescription>
            아래 링크를 복사하여 친구와 공유하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" value={shareUrl} readOnly />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        {copied && (
          <div className="text-green-500 text-xs mt-2">복사되었습니다!</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
