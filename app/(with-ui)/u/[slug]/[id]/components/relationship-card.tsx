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
  isMine = false,
}: {
  character: Character;
  relationships: Relationship[];
  isMine: boolean;
}) {
  return (
    relationships.length > 0 && (
      <div>
        <ListRelationship relationships={relationships} isMine={isMine} />
        <hr className="mt-10 p-10 w-full" />
      </div>
    )
  );
}
