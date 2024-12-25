"use client";

import { Character, Property } from "@/types/character";
import Image from "next/image";
import { useState } from "react";
import RelationshipGraph from "./relationship-graph";
import { Relationship } from "@/types/relationship";

function PopupRelationshipGraph({
  character,
  relationships,
  onClose,
}: {
  character: Character;
  relationships: Relationship[];
  onClose: () => void;
}) {
  return (
    <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-5/6 h-5/6 p-4 rounded-lg relative">
        <button className="absolute top-2 right-2" onClick={() => onClose()}>
          닫기
        </button>
        <h2 className="text-2xl font-bold">관계도</h2>
        <div className="flex justify-center items-center w-full h-full overflow-auto">
          <RelationshipGraph
            character={character}
            relationships={relationships}
          />
        </div>
      </div>
    </div>
  );
}

export function ProfileCard({
  character,
  relationships,
}: {
  character: Character;
  relationships: Relationship[];
}) {
  const [isOpenRelationshipGraph, setIsOpenRelationshipGraph] = useState(false);
  const ColorProperties = character.properties?.filter((property) =>
    ["themeColor", "eyeColor", "hairColor"].includes(property.key)
  );
  const otherProperties = character.properties?.filter(
    (property) =>
      !["themeColor", "eyeColor", "hairColor"].includes(property.key)
  );
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {isOpenRelationshipGraph && (
        <PopupRelationshipGraph
          character={character}
          relationships={relationships}
          onClose={() => setIsOpenRelationshipGraph(false)}
        />
      )}
      <Image
        src={character?.image?.[0] || ""}
        alt={character.name}
        width={300}
        height={300}
      />
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <h2 className="text-2xl font-bold">{character.name}</h2>
        <p className="text-sm text-primary-200">
          {'"' + character.description + '"'}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <button
          className="w-full bg-green-200 text-green-700 px-4 py-2 rounded-lg hover:bg-green-300 md:max-w-40"
          onClick={() => setIsOpenRelationshipGraph(true)}
        >
          관계도 보기
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <div className="text-gray-700 w-full">
          {otherProperties?.map?.((property: Property, index) => (
            <CharacterProfileField
              key={`property-${index}`}
              property={property}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const CharacterProfileField = ({ property }: { property: Property }) => {
  return (
    <div className="flex justify-between border-b py-2 w-full">
      <span className="w-1/3 font-bold">{property.key}</span>
      <span className="w-full">{property.value}</span>
    </div>
  );
};
