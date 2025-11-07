"use server";

import { createClient } from "@/utils/supabase/server";
import * as Sentry from "@sentry/nextjs";

export async function createProfile(payload: Profile) {
  try {
    const supabase = await createClient();
    const newProfile: Profile = {
      user_id: payload.user_id,
      nickname: payload.nickname as string,
      slug: payload.slug as string,
      profile_image: payload.profile_image as string,
    };
    if (!newProfile.user_id) {
      const err = new Error("User ID is required");
      Sentry.captureException(err);
      return { success: false, message: "User ID is required" };
    }
    if (!newProfile.nickname) {
      const err = new Error("Nickname is required");
      Sentry.captureException(err);
      return { success: false, message: "Nickname is required" };
    }
    if (!newProfile.slug) {
      const err = new Error("Slug is required");
      Sentry.captureException(err);
      return { success: false, message: "Slug is required" };
    }
    const { data, error } = await supabase
      .from("profile")
      .insert({ ...newProfile });
    if (error) {
      Sentry.captureException(error);
      return { success: false, message: error.message };
    }
    return { success: true, profile: data?.[0] };
  } catch (err) {
    Sentry.captureException(err);
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}
