"use client";

import ButtonDeleteUniverse from "@/components/button-delete-universe";
import ButtonShareUniverse from "@/components/button-share-universe";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MoreIcon from "@/public/assets/icons/more.svg";
import { useRouter } from "next/navigation";

interface UniverseMenuProps {
  universeId: number;
  onDelete?: () => void;
}

export default function UniverseMenu({ universeId, onDelete }: UniverseMenuProps) {
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="p-1 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center"
          aria-label="메뉴 열기"
        >
          <MoreIcon width={24} height={24} className="text-primary-300" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-4 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-base text-gray-700 hover:text-primary-500"
          onClick={() => router.push(`/u/${universeId}/v/${universeId}/edit`)}
        >
          세계관 수정
        </Button>
        <ButtonShareUniverse universeId={universeId} />
        <ButtonDeleteUniverse universeId={universeId}>세계관 삭제</ButtonDeleteUniverse>
      </PopoverContent>
    </Popover>
  );
} 