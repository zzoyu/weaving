"use server";

import { Character } from "@/types/character";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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

export async function applyFriend(from_id: number, to_id: number) {
  const supabase = createClient();
  const { data, error } = await supabase.from("profile_friend").insert([
    {
      from_id,
      to_id,
    },
  ]);

  revalidatePath("/u/[slug]", "page");

  return { data, error };
}

export async function removeFriend(from_id: number, to_id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile_friend")
    .delete()
    .eq("from_id", from_id)
    .eq("to_id", to_id);

  revalidatePath("/u/[slug]", "page");

  return { data, error };
}

export async function fetchFriendById(fromId: number, toId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile_friend")
    .select()
    .eq("from_id", fromId)
    .eq("to_id", toId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
