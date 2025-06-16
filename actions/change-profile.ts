"use server";

import { ImagePath } from "@/types/image";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./upload-image";

export async function changeProfileImage(slug: string, payload: FormData) {
  const supabase = createClient();
  const newImage = payload.get("profile_image") as File;

  if (slug && newImage?.size > 0) {
    try {
      const newProfileImage = await uploadImage(
        newImage,
        slug,
        ImagePath.PROFILE,
        true,
        false
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

  revalidatePath(`/u/${slug}`, "page");
}
