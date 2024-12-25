"use client";

import { Character } from "@/types/character";
import { colorList } from "@/types/color";
import {
  ERelationshipType,
  Relationship,
  relationshipTypeData,
} from "@/types/relationship";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export function ListRelationship({
  relationships,
}: {
  relationships: Relationship[];
}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="flex flex-col">
      <h2 className="mb-6 font-bold">관계 인물</h2>
      <div className="grid grid-cols-3 gap-4">
        {(isOpened ? relationships.slice(0, 3) : relationships).map(
          (relationship) => {
            const character = relationship.character as Character;
            const relationshipType =
              relationshipTypeData[relationship.name as ERelationshipType];

            console.log("relationshipType", relationshipType);

            return (
              <div
                key={`relationship-${relationship.id}`}
                className={clsx(
                  "flex flex-col items-center justify-center gap-1 overflow-hidden rounded-md relative group focus-within:ring-2",
                  colorList?.[
                    character?.properties?.find?.((i) => i.key === "themeColor")
                      ?.value || "white"
                  ] + " bg-opacity-50"
                )}
              >
                {relationshipType?.symbol && (
                  <div
                    className={clsx(
                      "absolute left-2 top-2 rounded-full text-white p-1",
                      relationshipType?.color
                    )}
                  >
                    <relationshipType.symbol width={24} height={24} />
                  </div>
                )}
                <div className="rounded-full overflow-hidden m-2">
                  <Image
                    src={character.thumbnail || character?.image?.[0] || ""}
                    alt={character.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div
                  className={clsx(
                    character.password && "text-opacity-50",
                    character.isFavorite
                      ? "bg-primary-100"
                      : "bg-background-200",
                    "w-full h-fit flex justify-center items-center p-2"
                  )}
                >
                  <p>{character.name}</p>
                </div>
              </div>
            );
          }
        )}
      </div>
      {relationships.length > 3 && (
        <button
          className="w-full text-right p-2 mt-2 text-gray-600"
          onClick={() => setIsOpened(!isOpened)}
        >
          {isOpened ? "▲ 접기" : "▼ 더보기"}
        </button>
      )}
    </div>
  );
}
