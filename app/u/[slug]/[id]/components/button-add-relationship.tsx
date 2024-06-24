"use client";

import { Character } from "@/types/character";
import { LayerAddRelationship } from "./layer-add-relationship";
import { Suspense, useState } from "react";
import { createRelationship, updateRelationship } from "../actions";
import { revalidatePath } from "next/cache";
import { on } from "events";
import { Relationship } from "@/types/relationship";

export default function ButtonAddRelationship({
  character,
  relationships,
}: {
  character: Character;
  relationships?: Relationship[];
}) {
  const [isRelationshipLayerOpen, setIsRelationshipLayerOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsRelationshipLayerOpen(true)}
        type="button"
      >
        Add Relationship
      </button>
      {isRelationshipLayerOpen && (
        <LayerAddRelationship
          profileId={character.profile_id}
          characterId={character.id}
          relationships={relationships}
          onAddRelationship={(toId, type) => {
            if (!toId || !type) return;
            const exsisitingRelationship = relationships?.find(
              (relationship) => relationship.to_id === toId
            );
            if (exsisitingRelationship) {
              console.log("update", exsisitingRelationship);
              updateRelationship(exsisitingRelationship.id, type);
            } else {
              createRelationship(character.id, toId, type);
            }
            setIsRelationshipLayerOpen(false);
          }}
        />
      )}
    </div>
  );
}
