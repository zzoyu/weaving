"use server";

import { ImagePath } from "@/types/image";
import { uploadImage } from "./upload-image";
import { createClient } from "@/utils/supabase/server";

export async function changeProfileImage(slug: string, payload: FormData) {
  const supabase = createClient();
  const newImage = payload.get("profile_image") as File;

  if (slug && newImage?.size > 0) {
    try {
      const newProfileImage = await uploadImage(
        newImage,
        slug,
        ImagePath.PROFILE
      );
      if (!newProfileImage) throw new Error("Failed to upload image");
      const { data, error } = await supabase
        .from("profile")
        .update({ profile_image: newProfileImage })
        .eq("slug", slug);
      console.log(data, error);
      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  } else {
    throw new Error("Profile not found");
  }
}
