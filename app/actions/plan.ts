import { Plan } from "@/types/plan";
import { createClient } from "@/utils/supabase/server";
import { fetchProfileById } from "../(with-ui)/u/[slug]/actions";

export async function fetchPlanById(id: number): Promise<Plan | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("plan")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching plan:", error);
    return null;
  }

  return data as Plan;
}

export async function fetchPlanByProfileId(
  profileId: number
): Promise<Plan | null> {
  const supabase = createClient();

  const profile = await fetchProfileById(profileId);
  return await fetchPlanById(profile?.data?.plan_id as number);
}

export async function fetchCurrentPlanUsage(
  profileId: number,
  tables: string[] = ["character", "universe"]
): Promise<{ characterCount?: number; universeCount?: number } | null> {
  const supabase = createClient();

  for (const table of tables) {
    if (table === "character") {
      const { data: characters, error: charError } = await supabase
        .from("character")
        .select("id")
        .eq("profile_id", profileId);

      if (charError) {
        console.error("Error fetching characters:", charError);
        return null;
      }

      return {
        characterCount: characters ? characters.length : 0,
      };
    } else if (table === "universe") {
      const { data: universes, error: uniError } = await supabase
        .from("universe")
        .select("id")
        .eq("profile_id", profileId);

      if (uniError) {
        console.error("Error fetching universes:", uniError);
        return null;
      }

      return {
        universeCount: universes ? universes.length : 0,
      };
    }
  }

  const { data: characters, error: charError } = await supabase
    .from("character")
    .select("id")
    .eq("profile_id", profileId);

  if (charError) {
    console.error("Error fetching characters:", charError);
    return null;
  }

  const { data: universes, error: uniError } = await supabase
    .from("universe")
    .select("id")
    .eq("profile_id", profileId);

  if (uniError) {
    console.error("Error fetching universes:", uniError);
    return null;
  }
  return {
    characterCount: characters ? characters.length : 0,
    universeCount: universes ? universes.length : 0,
  };
}
