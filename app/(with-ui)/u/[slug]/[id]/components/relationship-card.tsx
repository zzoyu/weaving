"use client";
import { Character } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { ListRelationship } from "./list-relationship";

export function RelationshipCard({
  character,
  relationships,
}: {
  character: Character;
  relationships: Relationship[];
}) {
  return (
    relationships.length > 0 && (
      <ListRelationship relationships={relationships} />
    )
  );
}
