import { notFound } from "next/navigation";
import { fetchCharacter, fetchRelationships } from "./actions";
import Image from "next/image";
import { ListRelationship } from "./components/list-relationship";
import ButtonAddRelationship from "./components/button-add-relationship";
import RelationshipGraph from "./components/relationship-graph";

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
      <p>{characterData.name}</p>
      <Image
        src={characterData?.image?.[0] || ""}
        alt={characterData.name}
        width={300}
        height={300}
      />
      <div className="flex flex-col gap-2">
        {characterData.properties.map((property) => (
          <div key={`property-${property.key}`} className="flex">
            <span>{property.key}</span>
            <span>{property.value}</span>
          </div>
        ))}
      </div>
      {relationships && <ListRelationship relationships={relationships} />}
      <ButtonAddRelationship
        character={characterData}
        relationships={relationships || []}
        currentPath={`/u/${slug}/${id}`}
      />

      {relationships && (
        <RelationshipGraph
          character={characterData}
          relationships={relationships}
        />
      )}
    </div>
  );
}
