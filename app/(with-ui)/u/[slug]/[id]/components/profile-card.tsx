"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Character, Property } from "@/types/character";
import { Relationship, RelationshipNode } from "@/types/relationship";
import { getPublicUrl } from "@/utils/image";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchRelationshipsWithDepthExtended } from "../actions";
import RelationshipGraphVariants from "./relationship-graph-variants";

function PopupRelationshipGraph({
  character,
  relationships,
  onClose,
}: {
  character: Character;
  relationships: Relationship[];
  onClose: () => void;
}) {
  const [deepRelationships, setDeepRelationships] = useState<
    RelationshipNode[] | null
  >(null);
  const [deepRelationshipsExtended, setDeepRelationshipsExtended] = useState<
    RelationshipNode[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDeepRelationships = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const dataExtended = await fetchRelationshipsWithDepthExtended(
          character.id
        );
        setDeepRelationshipsExtended(dataExtended);
      } catch (error) {
        console.error("Failed to fetch deep relationships");
        setError("관계 데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDeepRelationships();
  }, [character.id]);

  return (
    <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full h-full md:w-5/6 md:h-5/6 p-4 rounded-none md:rounded-lg relative">
        <button
          className="absolute top-2 right-2 z-20"
          onClick={() => onClose()}
        >
          <XIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" />
        </button>
        <h2 className="text-2xl font-bold">관계도</h2>
        <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
          {isLoading ? (
            <div>로딩 중...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : !deepRelationshipsExtended ||
            deepRelationshipsExtended.length === 0 ? (
            <div>관계 데이터가 없습니다.</div>
          ) : (
            <RelationshipGraphVariants
              character={character}
              relationships={[]}
              relationshipsExtended={deepRelationshipsExtended || []}
            />
          )}
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
                  unoptimized
                  src={getPublicUrl(image)}
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
        {relationships.length > 0 && (
          <button
            className="bg-green-500 text-background-default rounded-l-full rounded-r-full px-4 py-2 text-sm rounded-lg w-1/3 md:max-w-40 mb-12"
            onClick={() => setIsOpenRelationshipGraph(true)}
          >
            관계도 보기
          </button>
        )}
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

export const CharacterProfileField = ({ property }: { property: Property }) => {
  return (
    <div className="flex justify-between border-b py-2 w-full text-text-black dark:text-background-default">
      <span className="w-1/3 font-bold">{property?.key}</span>
      <span className="w-full">{property?.value}</span>
    </div>
  );
};
