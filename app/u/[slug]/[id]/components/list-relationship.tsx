import { Character } from "@/types/character";
import { Relationship } from "@/types/relationship";
import Image from "next/image";

export function ListRelationship({
  relationships,
}: {
  relationships: Relationship[];
}) {
  return (
    <div className="grid grid-cols-3">
      {relationships.map((relationship) => {
        const character = relationship.character as Character;
        return (
          <div
            key={`relationship-${relationship.id}`}
            className="flex flex-col items-center"
          >
            <Image
              src={character?.thumbnail || ""}
              alt={character.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <p>{character.name}</p>

            <span>[{relationship.name}]</span>
          </div>
        );
      })}
    </div>
  );
}
