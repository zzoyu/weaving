import ListCharacterItem from "./list-character-item";

interface ListCharacterProps {
  characters: Character[];
}

export default function ListCharacter({ characters }: ListCharacterProps) {
  return (
    <div className="grid">
      {characters.map((character) => (
        <ListCharacterItem
          key={`character-${character.id}`}
          character={character}
        />
      ))}
    </div>
  );
}
