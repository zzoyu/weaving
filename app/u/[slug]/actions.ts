"use server";

import { Character } from "@/types/character";
import { createClient } from "@/utils/supabase/server";

export async function fetchProfileBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = (await supabase
    .from("profile")
    .select()
    .eq("slug", slug)
    .maybeSingle()) as { data: Profile; error: any };

  return { data, error };
}

export async function fetchCharactersByProfileId(profileId: number) {
  console.log("fetchCharactersByProfileId", profileId);
  const supabase = createClient();
  const { data, error } = (await supabase
    .from("character")
    .select()
    .eq("profile_id", profileId)) as { data: Character[]; error: any };

  return { data: data ?? [], error };
}
