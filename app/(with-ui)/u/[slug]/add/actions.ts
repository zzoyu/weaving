"use server";

import { uploadImage } from "@/actions/upload-image";
import { Property } from "@/types/character";
import { ImagePath } from "@/types/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createCharacter(
  formData: FormData,
  properties: Property[]
) {
  const supabase = createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const profile_slug = formData.get("profile_slug") as string;

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

  const { data, error } = await supabase.from("character").insert([
    {
      profile_id,
      name,
      description,
      image: imageUrls,
      thumbnail: thumbnailUrl,
      properties,
      hashtags,
    },
  ]);

  if (error) {
    throw error;
  }

  return true;

  // redirect(`/u/${profile_slug}`);
}

export async function updateCharacter(
  formData: FormData,
  properties: Property[]
) {
  const supabase = createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const profile_slug = formData.get("profile_slug") as string;

  const characterId = formData.get("character_id") as string;
  if (!characterId) throw new Error("Character ID is required");

  const isHalfEdited = formData.get("half-image-is-edited") as string;
  const isFullEdited = formData.get("full-image-is-edited") as string;

  // print all of the formData
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  console.log(properties);
  if (!name) throw new Error("Name is required");

  const thumbnail = formData.get("half-thumbnail") as File;

  console.log(thumbnail);

  const imageFiles = [
    formData.get("half-image") as File,
    formData.get("full-image") as File,
  ];

  console.log(imageFiles);
  if (!imageFiles[0]) throw new Error("Image is required");
  if (!thumbnail) throw new Error("Thumbnail is required");
  if (imageFiles.length === 0) throw new Error("Image is required");
  if (imageFiles.length > 3) throw new Error("Image is too many");

  const thumbnailUrl = isHalfEdited
    ? await uploadImage(
        thumbnail,
        Math.floor(Math.random() * 10000).toString(),
        ImagePath.CHARACTER_THUMBNAIL
      )
    : (formData.get("original_thumbnail") as string);

  const imageFlag = [isHalfEdited, isFullEdited];
  const originalImages = formData.getAll("original_image") as string[];

  const imageUrls = await Promise.all(
    imageFiles.map(async (image, index) => {
      if (imageFlag[index]) return originalImages[index];
      // pass if the image has no file
      if (!image) return "";

      try {
        return await uploadImage(
          image,
          Math.floor(Math.random() * 10000).toString(),
          ImagePath.CHARACTER
        );
      } catch (error) {
        console.error(`Failed to upload image ${index}:`, error);
        return originalImages[index] || ""; // 실패시 기존 이미지 URL 유지
      }
    })
  );

  console.log("Uploaded image URLs:", imageUrls);
  console.log("Thumbnail URL:", thumbnailUrl);

  const { data, error } = await supabase
    .from("character")
    .update({
      name,
      description,
      image: imageUrls,
      thumbnail: thumbnailUrl,
      properties,
    })
    .eq("id", characterId);

  if (error) {
    throw error;
  }

  redirect(`/profile`);
}
