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
  const image = formData.get("image") as File;
  const thumbnail = formData.get("thumbnail") as File;
  const profile_slug = formData.get("profile_slug") as string;

  const responseProfile = await supabase
    .from("profile")
    .select("id")
    .eq("slug", profile_slug)
    .maybeSingle();
  const profile_id = responseProfile?.data?.id;
  if (!profile_id) throw new Error("Profile not found");

  const imageUrl = await uploadImage(
    image,
    Math.floor(Math.random() * 10000).toString(),
    ImagePath.CHARACTER
  );
  const thumbnailUrl = await uploadImage(
    thumbnail,
    Math.floor(Math.random() * 10000).toString(),
    ImagePath.CHARACTER_THUMBNAIL
  );

  const { data, error } = await supabase.from("character").insert([
    {
      profile_id,
      name,
      description,
      image: [imageUrl],
      thumbnail: thumbnailUrl,
      properties: [...properties],
    },
  ]);

  redirect(`/u/${profile_slug}`);
}
