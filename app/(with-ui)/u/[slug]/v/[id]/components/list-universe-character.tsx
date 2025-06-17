"use client";

import { Character } from "@/types/character";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export function ListUniverseCharacter({
  characters,
}: {
  characters: Character[];
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {characters.map((character) => {
        return (
          <Link href={`../${character.id}`} key={`character-${character.id}`}>
            <div
              className={clsx(
                "flex flex-col items-center justify-center gap-1 overflow-hidden rounded-md relative group focus-within:ring-2 bg-white bg-opacity-50"
              )}
            >
              <div className="rounded-full overflow-hidden m-2">
                <Image
                  unoptimized
                  src={character.thumbnail || character?.image?.[0] || ""}
                  alt={character.name}
                  width={100}
                  height={100}
                />
              </div>
              <div
                className={clsx(
                  character.password && "text-opacity-50",
                  character.isFavorite ? "bg-primary" : "bg-background-default",
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
  );
}
