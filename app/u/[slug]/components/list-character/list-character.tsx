import { Character } from "@/types/character";
import ListCharacterItem from "./list-character-item";

interface ListCharacterProps {
  characters: Character[];
}

export default function ListCharacter({ characters }: ListCharacterProps) {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      {characters.map((character) => (
        <ListCharacterItem
          key={`character-${character.id}`}
          character={character}
        />
      ))}
    </div>
  );
}
