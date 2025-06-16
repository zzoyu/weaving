"use client";

import { Character } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { useState } from "react";
import {
    createRelationship,
    deleteRelationship,
    updateRelationship,
} from "../actions";
import { LayerAddRelationship } from "./layer-add-relationship";

export default function ButtonAddRelationship({
  character,
  relationships,
  currentPath,
}: {
  character: Character;
  relationships?: Relationship[];
  currentPath: string;
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
            if (exsisitingRelationship?.id) {
              
              updateRelationship(exsisitingRelationship.id, type);
            } else {
              createRelationship(character.id, toId, type);
            }
            setIsRelationshipLayerOpen(false);
          }}
          onRemoveRelationship={(toId) => {
            const existingRelationship = relationships?.find(
              (relationship) => relationship.to_id === toId
            );
            if (!existingRelationship?.id) {
              return;
            }
            deleteRelationship(existingRelationship.id);
            setIsRelationshipLayerOpen(false);
          }}
        />
      )}
    </div>
  );
}
