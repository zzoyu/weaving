import Image from "next/image";

export default function ListCharacterItem({
  character,
}: {
  character: Character;
}) {
  return (
    <div>
      <h2>{character.name}</h2>
      {character.image && (
        <Image
          src={character.image}
          alt={character.name}
          width={200}
          height={200}
        />
      )}
    </div>
  );
}
