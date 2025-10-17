import { Character } from "@/types/character";
import { createClient } from "@/utils/supabase/server";

export async function fetchCharactersByProfileId(
  profileId: number
): Promise<Character[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("character")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });

  return data || [];
}
