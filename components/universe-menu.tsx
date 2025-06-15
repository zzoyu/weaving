"use client";

import { DialogShareButton } from "@/app/(with-ui)/@header/(profile)/u/[slug]/[id]/components/dialog-share-button";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Copy, Edit, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface UniverseMenuProps {
  universeId: number;
  onDelete?: () => void;
}

export default function UniverseMenu({ universeId, onDelete }: UniverseMenuProps) {
  const router = useRouter();
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40 p-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => router.push(`/u/${universeId}/v/${universeId}/edit`)}
        >
          <Edit className="w-4 h-4" />세계관 수정
        </Button>
        <DialogShareButton>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
            <Copy className="w-4 h-4" />세계관 공유
          </Button>
        </DialogShareButton>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />세계관 삭제
        </Button>
      </PopoverContent>
    </Popover>
  );
} 