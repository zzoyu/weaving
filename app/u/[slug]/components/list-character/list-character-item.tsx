import { Character } from "@/types/character";
import Image from "next/image";

export default function ListCharacterItem({
  character,
}: {
  character: Character;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
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
  );
}
