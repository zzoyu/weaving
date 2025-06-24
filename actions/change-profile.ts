"use server";

import { ImagePath } from "@/types/image";
import { createClient } from "@/utils/supabase/server";
import * as Sentry from "@sentry/nextjs";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./upload-image";

export async function changeProfileImage(slug: string, payload: FormData) {
  try {
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
        if (!newProfileImage) {
          const err = new Error("Failed to upload image");
          Sentry.captureException(err);
          return { success: false, message: "이미지 업로드에 실패했습니다." };
        }
        const { data, error } = await supabase
          .from("profile")
          .update({ profile_image: newProfileImage })
          .eq("slug", slug);
        if (error) {
          Sentry.captureException(error);
          return { success: false, message: error.message };
        }
      } catch (error) {
        Sentry.captureException(error);
        return { success: false, message: "이미지 업로드에 실패했습니다." };
      }
    } else {
      const err = new Error("Profile not found");
      Sentry.captureException(err);
      return { success: false, message: "프로필을 찾을 수 없습니다." };
    }
    revalidatePath(`/u/${slug}`, "page");
    return { success: true };
  } catch (err) {
    Sentry.captureException(err);
    return { success: false, message: err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다." };
  }
}
