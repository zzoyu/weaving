"use server";

import { uploadImage } from "@/actions/upload-image";
import { Property } from "@/types/character";
import { ImagePath } from "@/types/image";
import { createClient } from "@/utils/supabase/server";
import * as Sentry from "@sentry/nextjs";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export async function updateUniverse(
  formData: FormData,
  universeId: number,
  profileId: number,
  slug: string
) {
  try {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const hashtags = formData.get("hashtags") as string;
    const image = formData.get("universe-image") as File | null;
    const thumbnail = formData.get("universe-thumbnail") as File | null;
    const imageIsEdited = formData.get("universe-image-is-edited") === "true";
    const existingImage = JSON.parse(
      (formData.get("existing-image") as string) || "[]"
    ) as string[];
    const existingThumbnail = formData.get("existing-thumbnail") as string;
    const listProperties = JSON.parse(
      formData.get("list_properties") as string
    ) as Property[];
    const characterUniverses = JSON.parse(
      formData.get("universes_characters") as string
    ) as { character_id: number }[];

    if (!name) {
      const err = new Error("이름은 필수입니다.");
      Sentry.captureException(err);
      throw err;
    }

    let imageUrl = existingImage;
    let thumbnailUrl = existingThumbnail;

    // Only upload new image if it was edited
    if (imageIsEdited && image && image.size > 0) {
      const newImageUrl = await uploadImage(
        image,
        `${profileId}_${Math.floor(Math.random() * 10000).toString()}`,
        ImagePath.UNIVERSE,
        true
      );
      imageUrl = [newImageUrl];

      if (thumbnail && thumbnail.size > 0) {
        thumbnailUrl = await uploadImage(
          thumbnail,
          `${profileId}_${Math.floor(Math.random() * 10000).toString()}`,
          ImagePath.UNIVERSE_THUMBNAIL,
          true,
          false
        );
      }
    }

    const { error } = await supabase
      .from("universes")
      .update({
        name,
        description,
        hashtags,
        properties: listProperties,
        image: imageUrl,
        thumbnail: thumbnailUrl,
      })
      .eq("id", universeId);

    if (error) {
      Sentry.captureException(error);
      throw new Error("세계관 수정 중 오류가 발생했습니다.");
    }

    // 기존 캐릭터-세계관 관계 삭제
    await supabase
      .from("universes_characters")
      .delete()
      .eq("universe_id", universeId);

    // 새로운 캐릭터-세계관 관계 생성
    if (characterUniverses.length > 0) {
      const { error: relationError } = await supabase
        .from("universes_characters")
        .insert(
          characterUniverses.map((cu) => ({
            character_id: cu.character_id,
            universe_id: universeId,
          }))
        );

      if (relationError) {
        Sentry.captureException(relationError);
        throw new Error("캐릭터-세계관 관계 생성에 실패했습니다.");
      }
    }

    redirect(`/u/${slug}/v/${universeId}`);
  } catch (err) {
    // redirect throws a special error that should be re-thrown
    if (isRedirectError(err)) {
      throw err;
    }
    Sentry.captureException(err);
    throw err;
  }
}
