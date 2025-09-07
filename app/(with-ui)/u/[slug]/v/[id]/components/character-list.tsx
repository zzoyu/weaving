"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CharacterWithProfile } from "@/types/character";
import { getPublicUrl } from "@/utils/image";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CharacterListProps {
  characters: CharacterWithProfile[];
  isMyProfile: boolean;
}

import { Character } from "@/types/character";
import { colorList } from "@/types/color";
import { ERelationshipType, relationshipTypeData } from "@/types/relationship";
import clsx from "clsx";

export function ListCharacter({
  characters,
  isMine = false,
}: {
  characters: Character[];
  isMine?: boolean;
}) {
  const [isOpened, setIsOpened] = useState(false);

  if (!characters.length) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Star className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg">아직 등록된 캐릭터가 없어요</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col px-10 ">
      <h2 className="text-lg font-bold mb-4">소속 인물</h2>
      <div className="grid grid-cols-3 gap-4">
        {(!isOpened ? characters.slice(0, 3) : characters).map((character) => {
          const relationshipType =
            relationshipTypeData[character.name as ERelationshipType];

          return (
            <Link
              href={`../${character.id}`}
              key={`relationship-${character.id}`}
            >
              <div
                className={clsx(
                  "flex flex-col items-center justify-center gap-1 overflow-hidden rounded-md relative group focus-within:ring-2",
                  colorList?.[
                    character?.properties?.find?.((i) => i.key === "themeColor")
                      ?.value || "white"
                  ] + " bg-opacity-50"
                )}
              >
                <div className="rounded-full overflow-hidden m-2">
                  <Image
                    unoptimized
                    src={
                      getPublicUrl(character.thumbnail) ||
                      getPublicUrl(character?.image?.[0]) ||
                      ""
                    }
                    alt={character.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div
                  className={clsx(
                    character.password && "text-opacity-50",
                    character.isFavorite
                      ? "bg-primary"
                      : "bg-background-default dark:bg-neutral-800",
                    "w-full h-fit flex justify-center items-center p-2"
                  )}
                >
                  <p>{character.name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {characters.length > 3 && (
        <button
          className="w-full text-right p-2 mt-2 text-gray-600 text-sm"
          onClick={() => setIsOpened(!isOpened)}
        >
          {isOpened ? "▲ 접기" : "▼ 더보기"}
        </button>
      )}
    </div>
  );
}
