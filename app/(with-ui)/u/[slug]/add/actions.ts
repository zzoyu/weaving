"use server";

import { uploadImage } from "@/actions/upload-image";
import { Property } from "@/types/character";
import { ImagePath } from "@/types/image";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { createBulkRelationships } from "../[id]/actions";

export async function createCharacter(
  formData: FormData,
  properties: Property[]
) {
  const supabase = createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const profile_slug = formData.get("profile_slug") as string;
  const relationship_to = formData.getAll("relationship_to") as string[];
  const relationship_name = formData.getAll("relationship_name") as string[];

  // print all of the formData
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const responseProfile = await supabase
    .from("profile")
    .select("id")
    .eq("slug", profile_slug)
    .maybeSingle();
  const profile_id = responseProfile?.data?.id;
  if (!profile_id) throw new Error("Profile not found");

  console.log(properties);
  if (!name) throw new Error("Name is required");

  // get hashtag
  const hashtags = formData.get("hashtags") as string;

  const imageFiles = [
    formData.get("half-image") as File,
    formData.get("full-image") as File,
  ];

  const thumbnail = formData.get("half-thumbnail") as File;
  console.log(imageFiles);
  if (!imageFiles[0]) throw new Error("Image is required");
  if (!thumbnail) throw new Error("Thumbnail is required");
  if (imageFiles.length === 0) throw new Error("Image is required");
  if (imageFiles.length > 2) throw new Error("Image is too many");

  const thumbnailUrl = await uploadImage(
    thumbnail,
    Math.floor(Math.random() * 10000).toString(),
    ImagePath.CHARACTER_THUMBNAIL
  );
  const imageUrls = await Promise.all(
    imageFiles.map(async (image, index) => {
      // pass if the image has no file
      if (!image) return "";
      // const optimizedImage = await optimizeImage(image, 0.8); // 화질 최적화
      return uploadImage(
        image,
        Math.floor(Math.random() * 10000).toString(),
        ImagePath.CHARACTER
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
    throw error;
  }

  console.log(data);

  const relationships = relationship_to.map((to, index) => {
    const name = relationship_name[index];
    const to_id = Number(to);
    if (!to_id) throw new Error("To ID is required");
    return {
      to_id,
      name,
    };
  });

  if ((relationships?.length || 0) > 0)
    await createBulkRelationships(data.id, relationships);

  revalidatePath("/u/[slug]", "page");

  return true;
}

export async function updateCharacter(
  formData: FormData,
  properties: Property[]
) {
  const supabase = createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const profile_slug = formData.get("profile_slug") as string;

  const characterId = Number(formData.get("character_id") as string);
  if (!characterId) throw new Error("Character ID is required");

  const isHalfEdited = formData.get("half-image-is-edited") === "true";
  const isFullEdited = formData.get("full-image-is-edited") === "true";

  // print all of the formData
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  console.log(properties);
  if (!name) throw new Error("Name is required");

  const thumbnail = formData.get("half-thumbnail") as File;
  const originalThumbnail = formData.get("original_thumbnail") as string;

  console.log(thumbnail);

  const imageFiles = [
    formData.get("half-image") as File,
    formData.get("full-image") as File,
  ];

  console.log(imageFiles);
  if (!imageFiles[0] && !isHalfEdited) throw new Error("Image is required");
  if (!thumbnail && !originalThumbnail)
    throw new Error("Thumbnail is required");
  if (imageFiles.length === 0) throw new Error("Image is required");
  if (imageFiles.length > 3) throw new Error("Image is too many");

  const thumbnailUrl = isHalfEdited
    ? await uploadImage(
        thumbnail,
        Math.floor(Math.random() * 10000).toString(),
        ImagePath.CHARACTER_THUMBNAIL
      )
    : originalThumbnail;

  const imageFlag = [isHalfEdited, isFullEdited];
  const originalImages = formData.getAll("original_image[]") as string[];

  console.log("Original images:", originalImages);
  console.log("Image flags:", imageFlag);

  const imageUrls = await Promise.all(
    imageFiles.map(async (image, index) => {
      console.log("Processing image", index);
      console.log("Image flag:", imageFlag[index]);
      console.log("Original image:", originalImages[index]);
      console.log("New image:", image);

      // 이미지가 변경되지 않았으면 원본 이미지 URL 사용
      if (!imageFlag[index]) {
        console.log("Using original image:", originalImages[index]);
        return originalImages[index];
      }
      // 이미지가 변경되었지만 파일이 없으면 원본 이미지 URL 사용
      if (!image) {
        console.log("No new image, using original:", originalImages[index]);
        return originalImages[index];
      }

      try {
        console.log("Uploading new image:", image);
        return await uploadImage(
          image,
          Math.floor(Math.random() * 10000).toString(),
          ImagePath.CHARACTER
        );
      } catch (error) {
        console.error(`Failed to upload image ${index}:`, error);
        return originalImages[index]; // 실패시 기존 이미지 URL 유지
      }
    })
  );

  console.log("Uploaded image URLs:", imageUrls);

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
    throw error;
  }

  const relationship_to = formData.getAll("relationship_to") as string[];
  const relationship_name = formData.getAll("relationship_name") as string[];

  const relationships = relationship_to.map((to, index) => {
    const name = relationship_name[index];
    const to_id = Number(to);
    if (!to_id) throw new Error("To ID is required");
    return {
      to_id,
      name,
    };
  });

  if ((relationships?.length || 0) > 0)
    await createBulkRelationships(characterId, relationships);

  revalidatePath("/u/" + profile_slug);
  return true;
}
