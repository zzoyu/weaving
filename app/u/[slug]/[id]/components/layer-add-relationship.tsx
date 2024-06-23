"use client";

import Image from "next/image";
import { fetchCharactersByProfileId } from "../../actions";
import { Character } from "@/types/character";

function LayerAddRelationshipItem({
  character,
  onAddRelationship,
}: {
  character: Character;
  onAddRelationship: () => void;
}) {
  return (
    <div className="flex justify-start items-center gap-2">
      <Image
        src={character.thumbnail || ""}
        alt={character.name}
        width={100}
        height={100}
        className="rounded-full w-[100px] h-[100px] object-cover"
      />
      <p className="shrink-0 w-20">{character.name}</p>
      <button className="shrink-0 w-10" onClick={onAddRelationship}>
        추가
      </button>
    </div>
  );
}

export async function LayerAddRelationship({
  profileId,
  characterId,
  onAddRelationship,
}: {
  profileId: number;
  characterId: number;
  onAddRelationship: (toId: number) => void;
}) {
  const { data, error } = await fetchCharactersByProfileId(profileId);
  console.log(data);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black p-10">
      <h1>LayerAddRelationship</h1>
      <div className="flex flex-col gap-2">
        {data.map((character) => {
          if (character.id === characterId) return;
          return (
            <LayerAddRelationshipItem
              key={`character-${character.id}`}
              character={character}
              onAddRelationship={() => onAddRelationship(character.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
