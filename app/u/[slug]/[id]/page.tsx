import { notFound } from "next/navigation";
import { fetchCharacter, fetchRelationships } from "./actions";
import Image from "next/image";
import { Character } from "@/types/character";

export default async function CharacterPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { slug, id } = params;

  const characterData = await fetchCharacter(Number(id));
  if (!characterData) notFound();

  const relationships = await fetchRelationships(Number(id));
  console.log(relationships);

  return (
    <div>
      <h1>캐릭터 페이지</h1>
      <p>slug: {slug}</p>
      <p>id: {id}</p>
      <p>{characterData.name}</p>
      <Image
        src={characterData?.image?.[0] || ""}
        alt={characterData.name}
        width={300}
        height={300}
      />
      {/* <div className="flex flex-col gap-2">
        {characterData.properties.map((property) => (
          <div key={`property-${property.key}`} className="flex">
            <span>{property.key}</span>
            <span>{property.value}</span>
          </div>
        ))}
      </div> */}
      {relationships && (
        <div className="flex flex-col gap-2">
          {relationships.map((relationship) => {
            const character = relationship.character as Character;
            return (
              <div
                key={`relationship-${relationship.id}`}
                className="flex flex-col"
              >
                <Image
                  src={character?.thumbnail || ""}
                  alt={character.name}
                  width={100}
                  height={100}
                />
                <p>{character.name}</p>

                <span>{relationship.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
