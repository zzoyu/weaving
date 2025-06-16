"use server";

import { uploadImage } from "@/actions/upload-image";
import { Property } from "@/types/character";
import { ImagePath } from "@/types/image";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createUniverse(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

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

  if (!name) throw new Error("이름은 필수입니다.");
  if (!image || !(image instanceof File)) throw new Error("이미지는 필수입니다.");
  if (!thumbnail || !(thumbnail instanceof File)) throw new Error("썸네일은 필수입니다.");

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

  // 유니버스 생성
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
    throw universeError || new Error("유니버스 생성에 실패했습니다.");
  }

  

  // 캐릭터-유니버스 관계 생성
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
      throw relationError;
    }
  }

  revalidatePath(`/u/[slug]/v`, "page");
  return true;
}
