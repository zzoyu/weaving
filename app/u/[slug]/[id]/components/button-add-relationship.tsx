"use client";

import { Character } from "@/types/character";
import { LayerAddRelationship } from "./layer-add-relationship";
import { Suspense, useState } from "react";
import { createRelationship } from "../actions";
import { revalidatePath } from "next/cache";
import { on } from "events";

export default function ButtonAddRelationship({
  character,
}: {
  character: Character;
}) {
  const [isRelationshipLayerOpen, setIsRelationshipLayerOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsRelationshipLayerOpen(true)}
      >
        Add Relationship
      </button>
      {isRelationshipLayerOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <LayerAddRelationship
            profileId={character.profile_id}
            characterId={character.id}
            onAddRelationship={async (toId) => {
              await createRelationship(character.id, toId, "friend");
              setIsRelationshipLayerOpen(false);
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
