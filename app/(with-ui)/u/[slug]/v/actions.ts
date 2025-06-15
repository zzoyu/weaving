"use server";

import { Universe } from "@/types/universe";
import { createClient } from "@/utils/supabase/server";

export async function addFavoriteUniverse(profileId: number, universeId: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("favorite_universes")
    .insert({ profile_id: profileId, universe_id: universeId });
  if (error) throw error;
  return true;
}

export async function removeFavoriteUniverse(profileId: number, universeId: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("favorite_universes")
    .delete()
    .match({ profile_id: profileId, universe_id: universeId });
  if (error) throw error;
  return true;
}

export async function fetchFavoriteUniverses(profileId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("favorite_universes")
    .select("universe_id")
    .eq("profile_id", profileId);
  if (error) throw error;
  return data.map((item) => item.universe_id);
}

export async function fetchUniversesByProfileId(profileId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("universes")
    .select("*")
    .eq("profile_id", profileId);
  if (error) throw error;
  return data;
}

export async function fetchUniverseById(universeId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("universes")
    .select("*")
    .eq("id", universeId)
    .single();
  if (error) throw error;
  return data;
}

export async function deleteUniverseById(universeId: number) {
  const supabase = createClient();
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
  const supabase = createClient();
  const { error } = await supabase
    .from("universes")
    .update(data)
    .eq("id", universeId);
  if (error) throw error;
  return true;
}

export async function createUniverse(data: Omit<Universe, "id" | "created_at">) {
  const supabase = createClient();
  const { error } = await supabase.from("universes").insert(data);
  if (error) throw error;
  return true;
} 