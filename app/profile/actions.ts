"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function fetchProfile(user_id: string) {
  const supabase = createClient();

  const { data } = await supabase
    .from("profile")
    .select()
    .eq("user_id", user_id)
    .maybeSingle();

  return data;
}

export async function createProfile(payload: FormData) {
  const supabase = createClient();

  const newProfile: Profile = {
    user_id: payload.get("user_id") as string,
    nickname: payload.get("nickname") as string,
    slug: payload.get("slug") as string,
    profile_image: payload.get("profile_url") as string,
  };

  if (!newProfile.user_id) {
    throw new Error("User ID is required");
  }

  if (!newProfile.nickname) {
    throw new Error("Nickname is required");
  }

  if (!newProfile.slug) {
    throw new Error("Slug is required");
  }

  const image = payload.get("profile_image") as File;

  if (image.size > 0) {
    const { data: fileData, error: fileError } = await supabase.storage
      .from("assets")
      .upload(`profiles/${newProfile.user_id}_${new Date().getTime()}`, image);

    if (fileError) {
      throw new Error(fileError.message);
    }
    const { data } = await supabase.storage
      .from("assets")
      .getPublicUrl(fileData.path);
    newProfile.profile_image = data.publicUrl;
  }

  const { data, error } = await supabase
    .from("profile")
    .insert({ ...newProfile });

  console.log(data, error);
  if (error) {
    throw new Error(error.message);
  }

  redirect("/profile");
}
