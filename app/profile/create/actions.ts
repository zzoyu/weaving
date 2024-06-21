"use server";

import { uploadImage } from "@/actions/upload-image";
import { ImagePath } from "@/types/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

  try {
    const newProfileImage = await uploadImage(
      image,
      newProfile.user_id,
      ImagePath.PROFILE
    );
    newProfile.profile_image = newProfileImage;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
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
