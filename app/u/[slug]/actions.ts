"use server";

import { Character } from "@/types/character";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Notification } from "@/types/notification";

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

export async function requestFriendByProfileId(
  from: number,
  to: number,
  payload: {
    landing_url: string;
    content: string;
  }
) {
  const { landing_url, content } = payload;
  const supabase = createClient();
  const { data, error } = await supabase.from("profile_friend").insert([
    {
      from_profile_id: from,
      to_profile_id: to,
    },
  ]);
  if (error) {
    throw error;
  }

  const { data: data2, error: error2 } = await supabase
    .from("notification")
    .insert([
      {
        from_profile_id: from,
        to_profile_id: to,
        content,
        landing_url,
      } as Notification,
    ]);

  if (error2) {
    throw error2;
  }

  revalidatePath("/u/[slug]", "page");

  return { data, error };
}

export async function removeFriendByProfileId(from: number, to: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile_friend")
    .delete()
    .eq("from_profile_id", from)
    .eq("to_profile_id", to);

  revalidatePath("/u/[slug]", "page");

  return { data, error };
}

export async function fetchFriendById(from: number, to: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile_friend")
    .select()
    .eq("from_profile_id", from)
    .eq("to_profile_id", to)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
