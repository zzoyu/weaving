"use client";

import Image from "next/image";
import { fetchCharactersByProfileId } from "../../actions";
import { Character } from "@/types/character";
import { Suspense, useState } from "react";
import { ERelationshipType, Relationship } from "@/types/relationship";

export function LayerAddRelationshipItem({
  character,
  onAddRelationship,
  relationship,
}: {
  character: Character;
  onAddRelationship: (relationshipType: ERelationshipType) => void;
  relationship?: Relationship;
}) {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
    // onAddRelationship();
  }

  return (
    <div className="flex justify-between items-center gap-2 w-full">
      <div className="flex items-center gap-4 relative">
        <Image
          src={character.thumbnail || ""}
          alt={character.name}
          width={100}
          height={100}
          className="rounded-full w-[100px] h-[100px] object-cover"
        />
        <p className="shrink-0 w-20">
          {character.name}
          {relationship && (
            <span className=" text-gray-500">({relationship?.name})</span>
          )}
        </p>
      </div>
      {!isActive &&
        (!relationship ? (
          <button className="shrink-0 w-10" onClick={handleClick}>
            추가
          </button>
        ) : (
          <button className="shrink-0 w-10" onClick={handleClick}>
            수정
          </button>
        ))}
      {isActive && (
        <div className="flex gap-2">
          <div className="flex gap-2 border rounded-lg p-1">
            {[...Object.values(ERelationshipType)].map((type) => {
              return (
                <button
                  key={`${character.id}-relationship-${type}`}
                  type="button"
                  className="shrink-0 w-10"
                  onClick={() => onAddRelationship(type)}
                >
                  {type}
                </button>
              );
            })}
          </div>
          <button
            className="shrink-0 w-10"
            onClick={() => {
              setIsActive(false);
            }}
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
}
