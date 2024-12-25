"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchProfileById(
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
