"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CharacterWithProfile } from "@/types/character";
import { Property, Universe } from "@/types/universe";
import Image from "next/image";

export function UniverseCard({
  universe,
  characters,
  isMine,
}: {
  universe: Universe;
  characters: CharacterWithProfile[];
  isMine?: boolean;
}) {
  const ColorProperties = universe.properties?.filter((property) =>
    ["themeColor", "eyeColor", "hairColor"].includes(property.key)
  );
  const otherProperties = universe.properties?.filter(
    (property) =>
      !["themeColor", "eyeColor", "hairColor"].includes(property.key)
  );

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {universe?.image?.map?.((image: string, index: number) => {
            if (!image) return null;
            return (
              <CarouselItem
                key={`image-${index}`}
                className="relative flex justify-center items-center w-full"
              >
                <Image
                  unoptimized
                  src={image}
                  alt={universe.name}
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
        <h2 className="text-2xl font-bold">{universe.name}</h2>
        <p className="text-sm text-primary-200">
          {'"' + universe.description + '"'}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <div className="text-gray-700 w-full px-10">
          {otherProperties?.map?.((property: Property, index) => (
            <UniverseProfileField
              key={`property-${index}`}
              property={property}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const UniverseProfileField = ({ property }: { property: Property }) => {
  return (
    <div className="flex justify-between border-b py-2 w-full">
      <span className="w-1/3 font-bold">{property?.key}</span>
      <span className="w-full">{property?.value}</span>
    </div>
  );
};
