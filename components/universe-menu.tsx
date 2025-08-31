"use client";

import ButtonDeleteUniverse from "@/components/button-delete-universe";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MoreIcon from "@/public/assets/icons/more.svg";
import { Universe } from "@/types/universe";
import { getPublicUrl } from "@/utils/image";
import { useParams, useRouter } from "next/navigation";
import { DialogShareButton } from "./interactions/dialog-share-button";

interface UniverseMenuProps {
  universe: Universe;
  onDelete?: () => void;
}

export default function UniverseMenu({
  universe,
  onDelete,
}: UniverseMenuProps) {
  const router = useRouter();
  const params = useParams();

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
          onClick={() => router.push(`/u/${params.slug}/v/${params.id}/edit`)}
        >
          세계관 수정
        </Button>
        <DialogShareButton
          title={universe.name}
          description={universe.description}
          thumbnailUrl={getPublicUrl(universe.thumbnail)}
          templateId={Number(
            process.env.NEXT_PUBLIC_KAKAO_MESSAGE_TEMPLATE_ID_UNIVERSE
          )}
        >
          세계관 공유
        </DialogShareButton>
        <ButtonDeleteUniverse
          universeId={universe.id}
          className="w-full justify-start text-base text-gray-700 hover:text-destructive"
        >
          세계관 삭제
        </ButtonDeleteUniverse>
      </PopoverContent>
    </Popover>
  );
}
