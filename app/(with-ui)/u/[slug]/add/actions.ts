"use server";

import { uploadImage } from "@/actions/upload-image";
import { fetchPlanByProfileId } from "@/app/actions/plan";
import { Property } from "@/types/character";
import { ImagePath } from "@/types/image";
import { createClient } from "@/utils/supabase/server";
import * as Sentry from "@sentry/nextjs";
import { revalidatePath } from "next/cache";
import {
  createBulkRelationships,
  updateBulkRelationships,
} from "../[id]/actions";

export async function createCharacter(
  formData: FormData,
  properties: Property[]
) {
  try {
    const supabase = createClient();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const profile_id = Number(formData.get("profile_id") as string);
    const relationship_to = formData.getAll("relationship_to") as string[];
    const relationship_name = formData.getAll("relationship_name") as string[];

    // Get user's plan and check character limit
    const userPlan = await fetchPlanByProfileId(profile_id);
    if (!userPlan) {
      const err = new Error("Plan not found");
      Sentry.captureException(err);
      return { success: false, message: "플랜 정보를 찾을 수 없습니다." };
    }

    // Check current character count
    const { count, error: countError } = await supabase
      .from("character")
      .select("*", { count: "exact", head: true })
      .eq("profile_id", profile_id);

    if (countError) {
      Sentry.captureException(countError);
      return {
        success: false,
        message: "캐릭터 수 조회 중 오류가 발생했습니다.",
      };
    }
    if ((count || 0) >= userPlan.limit.maxCharacterSlots) {
      const err = new Error(
        `캐릭터 생성 한도(${userPlan.limit.maxCharacterSlots}개)를 초과했습니다.`
      );
      Sentry.captureException(err);
      return {
        success: false,
        message: `캐릭터 생성 한도(${userPlan.limit.maxCharacterSlots}개)를 초과했습니다.`,
      };
    }

    // Check relationship count
    if (relationship_to.length > userPlan.limit.maxRelationshipsPerCharacter) {
      const err = new Error(
        `캐릭터당 관계 한도(${userPlan.limit.maxRelationshipsPerCharacter}개)를 초과했습니다.`
      );
      Sentry.captureException(err);
      return {
        success: false,
        message: `캐릭터당 관계 한도(${userPlan.limit.maxRelationshipsPerCharacter}개)를 초과했습니다.`,
      };
    }

    if (!name) {
      const err = new Error("Name is required");
      Sentry.captureException(err);
      return { success: false, message: "이름은 필수입니다." };
    }

    // get hashtag
    const hashtags = formData.get("hashtags") as string;

    // Check image count
    const halfImage = formData.get("half-image") as File | null;
    const fullImage = formData.get("full-image") as File | null;
    const thumbnail = formData.get("half-thumbnail") as File | null;

    const imageFiles = [halfImage, fullImage].filter(
      (file): file is File => file !== null && file.size > 0
    );

    if (imageFiles.length > userPlan.limit.maxImagesPerCharacter) {
      const err = new Error(
        `캐릭터당 이미지 한도(${userPlan.limit.maxImagesPerCharacter}개)를 초과했습니다.`
      );
      Sentry.captureException(err);
      return {
        success: false,
        message: `캐릭터당 이미지 한도(${userPlan.limit.maxImagesPerCharacter}개)를 초과했습니다.`,
      };
    }

    if (!halfImage) {
      const err = new Error("상반신 이미지는 필수입니다");
      Sentry.captureException(err);
      return { success: false, message: "상반신 이미지는 필수입니다." };
    }
    if (!thumbnail) {
      const err = new Error("썸네일은 필수입니다");
      Sentry.captureException(err);
      return { success: false, message: "썸네일은 필수입니다." };
    }

    const thumbnailUrl = await uploadImage(
      thumbnail,
      `${profile_id}_${Math.floor(Math.random() * 10000).toString()}`,
      ImagePath.CHARACTER_THUMBNAIL,
      true,
      false
    );
    const imageUrls = await Promise.all(
      imageFiles.map(async (image) => {
        return uploadImage(
          image,
          `${profile_id}_${Math.floor(Math.random() * 10000).toString()}`,
          ImagePath.CHARACTER,
          true,
          true
        );
      })
    );

    const { data, error } = await supabase
      .from("character")
      .insert([
        {
          profile_id,
          name,
          description,
          image: imageUrls,
          thumbnail: thumbnailUrl,
          properties,
          hashtags,
        },
      ])
      .select()
      .single();

    if (error || !data) {
      Sentry.captureException(error || new Error("캐릭터 생성 실패"));
      return { success: false, message: "캐릭터 생성에 실패했습니다." };
    }

    const relationships = relationship_to.map((to, index) => {
      const name = relationship_name[index];
      const to_id = Number(to);
      if (!to_id) {
        const err = new Error("To ID is required");
        Sentry.captureException(err);
        throw err;
      }
      return {
        to_id,
        name,
      };
    });

    if ((relationships?.length || 0) > 0)
      await createBulkRelationships(data.id, relationships);

    revalidatePath("/u/[slug]", "page");

    return { success: true };
  } catch (err) {
    Sentry.captureException(err);
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

export async function updateCharacter(
  formData: FormData,
  properties: Property[]
) {
  try {
    const supabase = createClient();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const profile_id = Number(formData.get("profile_id") as string);

    const characterId = Number(formData.get("character_id") as string);
    if (!characterId) {
      const err = new Error("Character ID is required");
      Sentry.captureException(err);
      return { success: false, message: "캐릭터 ID가 필요합니다." };
    }

    if (!profile_id) {
      const err = new Error("Profile not found");
      Sentry.captureException(err);
      return { success: false, message: "프로필을 찾을 수 없습니다." };
    }

    const isHalfEdited = formData.get("half-image-is-edited") === "true";
    const isFullEdited = formData.get("full-image-is-edited") === "true";

    if (!name) {
      const err = new Error("Name is required");
      Sentry.captureException(err);
      return { success: false, message: "이름은 필수입니다." };
    }

    const thumbnail = formData.get("half-thumbnail") as File;
    const originalThumbnail = formData.get("original_thumbnail") as string;

    const imageFiles = [
      formData.get("half-image") as File,
      formData.get("full-image") as File,
    ];

    if (!imageFiles[0] && !isHalfEdited) {
      const err = new Error("Image is required");
      Sentry.captureException(err);
      return { success: false, message: "이미지가 필요합니다." };
    }
    if (!thumbnail && !originalThumbnail) {
      const err = new Error("Thumbnail is required");
      Sentry.captureException(err);
      return { success: false, message: "썸네일이 필요합니다." };
    }
    if (imageFiles.length === 0) {
      const err = new Error("Image is required");
      Sentry.captureException(err);
      return { success: false, message: "이미지가 필요합니다." };
    }
    if (imageFiles.length > 3) {
      const err = new Error("Image is too many");
      Sentry.captureException(err);
      return { success: false, message: "이미지 개수가 너무 많습니다." };
    }

    const thumbnailUrl = isHalfEdited
      ? await uploadImage(
          thumbnail,
          `${profile_id}_${Math.floor(Math.random() * 10000).toString()}`,
          ImagePath.CHARACTER_THUMBNAIL,
          true
        )
      : originalThumbnail;

    const imageFlag = [isHalfEdited, isFullEdited];
    const originalImages = formData.getAll("original_image[]") as string[];

    const imageUrls = await Promise.all(
      imageFiles.map(async (image, index) => {
        // 이미지가 변경되지 않았으면 원본 이미지 URL 사용
        if (!imageFlag[index]) {
          return originalImages[index];
        }
        // 이미지가 변경되었지만 파일이 없으면 원본 이미지 URL 사용
        if (!image) {
          return originalImages[index];
        }

        try {
          return await uploadImage(
            image,
            `${profile_id}_${Math.floor(Math.random() * 10000).toString()}`,
            ImagePath.CHARACTER,
            true,
            true
          );
        } catch (error) {
          Sentry.captureException(error);
          return originalImages[index]; // 실패시 기존 이미지 URL 유지
        }
      })
    );

    const { data, error } = await supabase
      .from("character")
      .update({
        name,
        description,
        image: imageUrls || [],
        thumbnail: thumbnailUrl,
        properties,
        hashtags: formData.get("hashtags") as string,
      })
      .eq("id", characterId);

    if (error) {
      Sentry.captureException(error);
      return { success: false, message: "캐릭터 수정에 실패했습니다." };
    }

    const relationship_to = formData.getAll("relationship_to") as string[];
    const relationship_name = formData.getAll("relationship_name") as string[];

    const relationships = relationship_to.map((to, index) => {
      const name = relationship_name[index];
      const to_id = Number(to);
      if (!to_id) {
        const err = new Error("To ID is required");
        Sentry.captureException(err);
        throw err;
      }
      return {
        to_id,
        name,
      };
    });

    if ((relationships?.length || 0) > 0)
      await updateBulkRelationships(characterId, relationships);

    revalidatePath("/u/[slug]", "page");
    return { success: true };
  } catch (err) {
    Sentry.captureException(err);
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}
