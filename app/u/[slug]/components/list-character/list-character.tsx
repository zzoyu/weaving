import { Character } from "@/types/character";
import ListCharacterItem from "./list-character-item";

interface ListCharacterProps {
  characters: Character[];
  slug: string;
}

export default function ListCharacter({
  characters,
  slug,
}: ListCharacterProps) {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      {characters.map((character) => (
        <ListCharacterItem
          key={`character-${character.id}`}
          character={character}
          slug={slug}
        />
      ))}
    </div>
  );
}
