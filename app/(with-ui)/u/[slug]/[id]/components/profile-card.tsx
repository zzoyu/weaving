"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Character, Property } from "@/types/character";
import { Relationship } from "@/types/relationship";
import Image from "next/image";
import { useState } from "react";
import RelationshipGraph from "./relationship-graph";

function PopupRelationshipGraph({
  character,
  relationships,
  onClose,
  isMine = false,
}: {
  character: Character;
  relationships: Relationship[];
  onClose: () => void;
  isMine?: boolean;
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
            isMine={isMine}
          />
        </div>
      </div>
    </div>
  );
}

export function ProfileCard({
  character,
  relationships,
  isMine,
}: {
  character: Character;
  relationships: Relationship[];
  isMine?: boolean;
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
          isMine={isMine}
        />
      )}
      <Carousel className="w-full">
        <CarouselContent>
          {character?.image?.map?.((image: string, index: number) => {
            if (!image) return null;
            return (
              <CarouselItem
                key={`image-${index}`}
                className="relative flex justify-center items-center w-full"
              >
                <Image
                  src={image}
                  alt={character.name}
                  width={200}
                  height={200}
                  className="rounded-lg object-contain w-full h-full max-h-96"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      <div className="flex flex-col justify-center items-center gap-2 w-full mt-10">
        <h2 className="text-2xl font-bold">{character.name}</h2>
        <p className="text-sm text-primary-200">
          {'"' + character.description + '"'}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <button
          className="bg-green-500 text-background-default rounded-l-full rounded-r-full px-4 py-2 text-sm rounded-lg w-1/3 md:max-w-40 mb-12"
          onClick={() => setIsOpenRelationshipGraph(true)}
        >
          관계도 보기
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <div className="text-gray-700 w-full px-10">
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
      <span className="w-1/3 font-bold">{property?.key}</span>
      <span className="w-full">{property?.value}</span>
    </div>
  );
};
