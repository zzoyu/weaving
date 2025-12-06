"use client";

import UniverseForm from "@/app/(with-ui)/components/universe-form";
import { Character, CharacterWithProfile } from "@/types/character";
import { Plan } from "@/types/plan";
import { Universe } from "@/types/universe";

interface EditUniverseProps {
  universe: Universe;
  characters: Character[];
  initialCharacters?: CharacterWithProfile[];
  onSubmit: (data: FormData) => Promise<void>;
  plan: Plan;
}

export default function EditUniverse({
  universe,
  initialCharacters,
  characters,
  onSubmit,
  plan,
}: EditUniverseProps) {
  return (
    <UniverseForm
      mode="edit"
      universe={universe}
      initialCharacters={initialCharacters}
      characters={characters}
      plan={plan}
      onSubmit={onSubmit}
    />
  );
}
