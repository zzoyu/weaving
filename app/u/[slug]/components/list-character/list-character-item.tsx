"use client";

import { Character } from "@/types/character";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ListCharacterItem({
  character,
  slug,
}: {
  character: Character;
  slug: string;
}) {
  return (
    <Link href={`/u/${slug}/${character.id}`}>
      <div
        className="flex flex-col items-center justify-center gap-1 overflow-hidden rounded-md"
        style={{
          backgroundColor:
            character?.properties?.find?.((i) => i.key === "themeColor")
              ?.value || "white",
        }}
      >
        <div className="rounded-full overflow-hidden">
          <Image
            src={character.thumbnail || character?.image?.[0] || ""}
            alt={character.name}
            width={100}
            height={100}
          />
        </div>
        <p className="">{character.name}</p>
      </div>
    </Link>
  );
}
