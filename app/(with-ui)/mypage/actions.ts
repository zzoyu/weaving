"use server";

import { createClient as createServerClient } from "@/utils/supabase/server";
import * as Sentry from "@sentry/nextjs";
import { createClient } from "@supabase/supabase-js";

export async function deleteAccount(id: string) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    if (!id) {
      const err = new Error("User ID is required");
      Sentry.captureException(err);
      return { success: false, message: "User ID is required" };
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const err = new Error("key is not defined");
      Sentry.captureException(err);
      return { success: false, message: "key is not defined" };
    }
    const { data, error } = await supabase.auth.admin.deleteUser(id);
    if (error) {
      Sentry.captureException(error);
      return { success: false, message: error.message };
    }
    return { success: true, data };
  } catch (err) {
    Sentry.captureException(err);
    return { success: false, message: err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다." };
  }
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
