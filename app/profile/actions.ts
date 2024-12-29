"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchProfileById(
  user_id: string
): Promise<Profile | null> {
  if (!user_id) {
    return null;
  }
  const supabase = createClient();

  const { data } = await supabase
    .from("profile")
    .select()
    .eq("user_id", user_id)
    .maybeSingle();

  return data;
}

export async function fetchProfileByIdAndCreateIfNotExists(
  user_id: string
): Promise<Profile | null> {
  if (!user_id) {
    return null;
  }
  const supabase = createClient();

  const { data } = await supabase
    .from("profile")
    .select()
    .eq("user_id", user_id)
    .maybeSingle();

  console.log(data);

  if (!data) {
    const userData = await supabase.auth.getUser();
    if (!userData?.data?.user?.user_metadata) {
      return null;
    }
    console.log(userData.data?.user?.user_metadata);

    const profileData: Profile = {
      user_id,
      nickname: userData.data.user?.user_metadata.full_name, // 트위터 계정 닉네임
      slug: userData.data.user?.user_metadata.user_name, // 트위터 계정 아이디
      profile_image: userData.data.user?.user_metadata.avatar_url, // 트위터 프로필 이미지
    };
    const profileCreationResponse = await supabase
      .from("profile")
      .insert({ ...profileData })
      .single();

    if (profileCreationResponse.error) {
      console.error(profileCreationResponse.error);
      return null;
    }

    return profileData;
  }

  return data;
}
