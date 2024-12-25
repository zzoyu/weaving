import { ERelationshipType, Relationship } from "@/types/relationship";
import { Suspense } from "react";
import { LayerAddRelationshipList } from "./layer-add-relationship-list";
import { Character } from "@/types/character";

export function LayerAddRelationship({
  profileId,
  characterId,
  onAddRelationship,
  onRemoveRelationship,
  relationships,
}: {
  profileId: number;
  characterId: number;
  onAddRelationship: (
    toId: number,
    relationshipType: ERelationshipType
  ) => void;
  onRemoveRelationship: (toId: number) => void;
  relationships?: Relationship[];
}) {
  return (
    <div className="fixed z-50 top-0 left-0 w-10/12 h-5/6  bg-white dark:bg-black p-10 overflow-y-scroll">
      <h1>LayerAddRelationship</h1>

      <LayerAddRelationshipList
        character={{ id: characterId, profile_id: profileId } as Character}
        onAddRelationship={onAddRelationship}
        onRemoveRelationship={onRemoveRelationship}
        relationships={relationships}
      />
    </div>
  );
}
