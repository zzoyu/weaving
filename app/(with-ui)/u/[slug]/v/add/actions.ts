"use server";

import { uploadImage } from "@/actions/upload-image";
import { Property } from "@/types/character";
import { ImagePath } from "@/types/image";
import { createClient } from "@/utils/supabase/server";
import * as Sentry from "@sentry/nextjs";
import { revalidatePath } from "next/cache";

export async function createUniverse(formData: FormData) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const err = new Error("로그인이 필요합니다.");
      Sentry.captureException(err);
      return { success: false, message: "로그인이 필요합니다." };
    }

    // 디버깅을 위한 로깅
    
    for (const [key, value] of formData.entries()) {
      
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const hashtags = formData.get("hashtags") as string;
    const profileId = Number(formData.get("profile_id"));
    const image = formData.get("universe-image") as File;
    const thumbnail = formData.get("universe-thumbnail") as File;
    const listProperties = JSON.parse(formData.get("list_properties") as string) as Property[];
    const characterUniverses = JSON.parse(formData.get("universes_characters") as string) as { character_id: number }[];

    if (!name) {
      const err = new Error("이름은 필수입니다.");
      Sentry.captureException(err);
      return { success: false, message: "이름은 필수입니다." };
    }
    if (!image || !(image instanceof File)) {
      const err = new Error("이미지는 필수입니다.");
      Sentry.captureException(err);
      return { success: false, message: "이미지는 필수입니다." };
    }
    if (!thumbnail || !(thumbnail instanceof File)) {
      const err = new Error("썸네일은 필수입니다.");
      Sentry.captureException(err);
      return { success: false, message: "썸네일은 필수입니다." };
    }

    // 이미지 업로드
    const imageUrl = await uploadImage(
      image,
      `${profileId}_${Math.floor(Math.random() * 10000).toString()}`,
      ImagePath.UNIVERSE,
      true
    );

    const thumbnailUrl = await uploadImage(
      thumbnail,
      `${profileId}_${Math.floor(Math.random() * 10000).toString()}`,
      ImagePath.UNIVERSE_THUMBNAIL,
      true,
      false
    );

    // 세계관 생성
    const { data: universe, error: universeError } = await supabase
      .from("universes")
      .insert([{
        profile_id: profileId,
        name,
        description,
        image: [imageUrl],
        thumbnail: thumbnailUrl,
        properties: listProperties,
        hashtags,
      }])
      .select()
      .single();

    if (universeError || !universe) {
      Sentry.captureException(universeError || new Error("세계관 생성에 실패했습니다."));
      return { success: false, message: "세계관 생성에 실패했습니다." };
    }

    

    // 캐릭터-세계관 관계 생성
    if (characterUniverses.length > 0) {
      const { error: relationError } = await supabase
        .from("universes_characters")
        .insert(
          characterUniverses.map((cu) => ({
            character_id: cu.character_id,
            universe_id: universe.id
          }))
        );

      if (relationError) {
        Sentry.captureException(relationError);
        return { success: false, message: "캐릭터-세계관 관계 생성에 실패했습니다." };
      }
    }

    revalidatePath(`/u/[slug]/v`, "page");
    return { success: true };
  } catch (err) {
    Sentry.captureException(err);
    return { success: false, message: err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다." };
  }
}
