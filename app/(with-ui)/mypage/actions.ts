"use server";

import { createClient as createServerClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";

export async function deleteAccount(id: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (!id) throw new Error("User ID is required");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("key is not defined");
  }

  const { data, error } = await supabase.auth.admin.deleteUser(id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function fetchFriendsByProfileId(id?: number) {
  if (!id) {
    throw new Error("Profile ID is required");
  }
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("profile_friend")
    .select("to_profile_id,from_profile_id")
    .eq("is_approved", true)
    .or(`from_profile_id.eq.${id},to_profile_id.eq.${id}`);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export async function fetchProfilesByIds(ids: number[]) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .in("id", ids);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
