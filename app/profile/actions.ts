"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchProfileById(user_id: string): Promise<Profile> {
  if (!user_id) {
    throw new Error("user_id is required");
  }
  const supabase = createClient();

  const { data } = await supabase
    .from("profile")
    .select()
    .eq("user_id", user_id)
    .maybeSingle();

  return data;
}
