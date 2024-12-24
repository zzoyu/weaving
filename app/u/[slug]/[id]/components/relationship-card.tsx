"use client";
import { Character } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { ListRelationship } from "./list-relationship";
import clsx from "clsx";
import { colorList } from "@/types/color";
import Image from "next/image";

export function RelationshipCard({
  character,
  relationships,
}: {
  character: Character;
  relationships: Relationship[];
}) {
  return (
    relationships.length > 0 && (
      <div>
        <ListRelationship relationships={relationships} />
        <hr className="mt-10 p-10 w-full" />
      </div>
    )
  );
}
