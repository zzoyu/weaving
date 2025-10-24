"use client";
import UniverseForm from "@/app/(with-ui)/components/universe-form";
import { Character } from "@/types/character";
import { Plan } from "@/types/plan";
import { createUniverse } from "../actions";

interface UniverseAddTemplateProps {
  slug: string;
  profileId: number;
  characters: Character[];
  plan: Plan;
}

export default function UniverseAddTemplate({
  slug,
  profileId,
  characters,
  plan,
}: UniverseAddTemplateProps) {
  async function handleCreateUniverse(formData: FormData) {
    const res = await createUniverse(formData);
    if (!res || !res.success) {
      throw new Error(res?.message || "세계관 저장에 실패했습니다.");
    }
  }

  return (
    <UniverseForm
      mode="create"
      characters={characters}
      plan={plan}
      slug={slug}
      profileId={profileId}
      onSubmit={handleCreateUniverse}
    />
  );
}
