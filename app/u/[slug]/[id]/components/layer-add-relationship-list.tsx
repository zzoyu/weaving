"use client";

import Image from "next/image";
import { fetchCharactersByProfileId } from "../../actions";
import { Character } from "@/types/character";
import { Suspense, useEffect, useState } from "react";
import { ERelationshipType, Relationship } from "@/types/relationship";
import { LayerAddRelationshipItem } from "./layer-add-relationship-item";
import { on } from "events";

export function LayerAddRelationshipList({
  character,
  onAddRelationship,
  onRemoveRelationship,
  relationships,
}: {
  character: Character;
  onAddRelationship: (
    toId: number,
    relationshipType: ERelationshipType
  ) => void;
  onRemoveRelationship: (toId: number) => void;
  relationships?: Relationship[];
}) {
  const [characters, setCharacters] = useState<Character[]>([]);
  useEffect(() => {
    if (character.profile_id === undefined) return;
    fetchCharactersByProfileId(character.profile_id).then(({ data, error }) => {
      if (error) {
        console.error(error);
      }
      setCharacters(data);
    });
  }, [character.profile_id]);
  return (
    <div className="flex flex-col gap-2">
      {characters.length === 0 && (
        <div className="flex flex-col gap-2 w-full">
          {[1, 2, 3, 4, 5].map((index) => {
            return (
              <div
                className="flex justify-start items-center gap-4 w-full"
                key={index}
              >
                <div className="rounded-full w-[100px] h-[100px] bg-gray-300"></div>
                <div className="h-4 w-40 bg-gray-300 rounded"> </div>
              </div>
            );
          })}
        </div>
      )}
      {characters.map((item) => {
        if (item.id === character.id) return;
        return (
          <LayerAddRelationshipItem
            key={`character-relationsip-${item.id}`}
            relationship={relationships?.find(
              (relationship) => relationship.to_id === item.id
            )}
            character={item}
            onAddRelationship={(relationshipType) =>
              onAddRelationship(item.id, relationshipType)
            }
            onRemoveRelationship={() => {
              onRemoveRelationship(item.id);
            }}
          />
        );
      })}
    </div>
  );
}
