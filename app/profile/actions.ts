"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function fetchProfileByUserId(
  user_id: string
): Promise<Profile | null> {
  if (!user_id) {
    return null;
  }
  const supabase = createClient();

  const { data } = await supabase
    .from("profile")
    .select()
    .eq("user_id", user_id)
    .maybeSingle();

  return data;
}

export async function fetchProfileBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfileById(
  id: number,
  updates: Partial<Pick<Profile, "nickname" | "profile_image" | "slug">>
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  revalidatePath(`/mypage`);
  return data;
}
