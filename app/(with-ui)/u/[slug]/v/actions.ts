"use server";

import { fetchPlanByProfileId } from "@/app/actions/plan";
import { CharacterWithProfile } from "@/types/character";
import { Universe } from "@/types/universe";
import { createClient } from "@/utils/supabase/server";

export async function addFavoriteUniverse(
  profileId: number,
  universeId: number
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("favorite_universes")
    .insert({ profile_id: profileId, universe_id: universeId });
  if (error) throw error;
  return true;
}

export async function removeFavoriteUniverse(
  profileId: number,
  universeId: number
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("favorite_universes")
    .delete()
    .match({ profile_id: profileId, universe_id: universeId });
  if (error) throw error;
  return true;
}

export async function fetchFavoriteUniverses(profileId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorite_universes")
    .select("universe_id")
    .eq("profile_id", profileId);
  if (error) throw error;
  return data.map((item) => item.universe_id);
}

export async function fetchUniversesByProfileId(profileId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("universes")
    .select("*")
    .eq("profile_id", profileId);
  if (error) throw error;
  return data;
}

export async function fetchUniverseById(id: number): Promise<Universe | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("universes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching universe:", error);
    return null;
  }

  return data;
}

export async function deleteUniverseById(universeId: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("universes")
    .delete()
    .eq("id", universeId);
  if (error) throw error;
  return true;
}

export async function updateUniverseById(
  universeId: number,
  data: Partial<Universe>
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("universes")
    .update(data)
    .eq("id", universeId);
  if (error) throw error;
  return true;
}

export async function createUniverse(
  data: Omit<Universe, "id" | "created_at">
) {
  const plan = await fetchPlanByProfileId(data.profile_id);
  const currentUniverses = await fetchUniversesByProfileId(data.profile_id);
  if (currentUniverses.length >= (plan?.limit.maxUniverseSlots || 0)) {
    return {
      success: false,
      message: "사용 가능한 세계관 생성 슬롯이 부족합니다.",
    };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("universes").insert(data);
  if (error) throw error;
  return { success: true, message: "세계관이 생성되었습니다." };
}

export async function fetchCharacterUniversesByUniverseId(universeId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("universes_characters")
    .select("*")
    .eq("universe_id", universeId);

  if (error) {
    console.error("Error fetching character universes:", error);
    return [];
  }

  return data || [];
}

export async function fetchCharactersByUniverseId(
  universeId: number
): Promise<{ characters: CharacterWithProfile[]; error: any }> {
  const supabase = await createClient();

  // 1. 먼저 universe_id로 universes_characters 테이블에서 character_id 목록을 가져옴
  const { data: characterUniverses, error: cuError } = await supabase
    .from("universes_characters")
    .select("character_id")
    .eq("universe_id", universeId);

  if (cuError) {
    console.error("Error fetching character universes:", cuError);
    return { characters: [], error: cuError };
  }

  if (!characterUniverses || characterUniverses.length === 0) {
    return { characters: [], error: null };
  }

  // 2. 가져온 character_id 목록으로 character 테이블에서 상세 정보를 조회
  const characterIds = characterUniverses.map((cu) => cu.character_id);
  const { data: characters, error: cError } = await supabase
    .from("character")
    .select(
      `
      *,
      profile:profile_id (
        id,
        slug,
        nickname
      )
    `
    )
    .in("id", characterIds)
    .order("created_at", { ascending: false });

  if (cError) {
    console.error("Error fetching characters:", cError);
    return { characters: [], error: cError };
  }

  return {
    characters: (characters || []) as CharacterWithProfile[],
    error: null,
  };
}
