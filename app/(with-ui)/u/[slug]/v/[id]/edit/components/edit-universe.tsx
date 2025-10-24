"use client";

import UniverseForm from "@/app/(with-ui)/components/universe-form";
import { CharacterWithProfile } from "@/types/character";
import { Plan } from "@/types/plan";
import { Universe } from "@/types/universe";

interface EditUniverseProps {
  universe: Universe;
  characters: CharacterWithProfile[];
  onSubmit: (data: Universe) => Promise<void>;
  plan: Plan;
}

export default function EditUniverse({
  universe,
  characters,
  onSubmit,
  plan,
}: EditUniverseProps) {
  return (
    <UniverseForm
      mode="edit"
      universe={universe}
      characters={characters}
      plan={plan}
      onSubmit={onSubmit}
    />
  );
}
