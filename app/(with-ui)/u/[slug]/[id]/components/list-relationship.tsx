"use client";

import { Character } from "@/types/character";
import { colorList } from "@/types/color";
import {
  ERelationshipType,
  Relationship,
  relationshipTypeData,
} from "@/types/relationship";
import { getPublicUrl } from "@/utils/image";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ListRelationship({
  relationships,
}: {
  relationships: Relationship[];
}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="flex flex-col px-10 ">
      <h2 className="text-lg font-bold mb-4">관계 인물</h2>
      <div className="grid grid-cols-3 gap-4">
        {(!isOpened ? relationships.slice(0, 3) : relationships).map(
          (relationship) => {
            const character = relationship.character as Character;
            const relationshipType =
              relationshipTypeData[relationship.name as ERelationshipType];

            return (
              <Link
                href={`/character/${relationship.character?.id}`}
                key={`relationship-${relationship.id}`}
              >
                <div
                  className={clsx(
                    "flex flex-col items-center justify-center gap-1 overflow-hidden rounded-md relative group focus-within:ring-2",
                    colorList?.[
                      character?.properties?.find?.(
                        (i) => i.key === "themeColor"
                      )?.value || "white"
                    ] + " bg-opacity-50"
                  )}
                >
                  {relationshipType?.symbol && (
                    <div
                      className={clsx(
                        "absolute left-2 top-2 rounded-full text-white p-1.5",
                        relationshipType?.color || "bg-primary"
                      )}
                    >
                      <relationshipType.symbol width={20} height={20} />
                    </div>
                  )}
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
          }
        )}
      </div>
      {relationships.length > 3 && (
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
