"use server";

import { createClient } from "@/utils/supabase/server";

export async function handleUpdateNickname(formData: FormData) {
  "use server";
  const newNickname = formData.get("nickname") as string;
  if (!newNickname) {
    // Handle error (e.g., throw an error or return a message)
    console.error("Invalid nickname");
    return { success: false };
  }
  return await updateMyProfileNickname(newNickname);
}

export async function updateMyProfileNickname(
  nickname: string
): Promise<{ success: boolean; nickname?: string; lastChangedAt?: Date }> {
  const supabase = createClient();
  const id = (await supabase.auth.getUser()).data.user?.id;
  if (!id) {
    throw new Error("User not found");
  }

  const now = new Date();

  const { data: original_data } = await supabase
    .from("profile")
    .select("last_nickname_changed_at")
    .eq("user_id", id)
    .single();

  if (original_data?.last_nickname_changed_at) {
    // 변경한 적 없으면 통과
    const lastChangedAt = new Date(original_data.last_nickname_changed_at);
    const nextChangeDate = new Date(
      lastChangedAt.setDate(lastChangedAt.getDate() + 30)
    );
    if (now < nextChangeDate) {
      // 30일이 지나지 않음
      return { success: false };
    }
  }

  const { error } = await supabase
    .from("profile")
    .update({ nickname, last_nickname_changed_at: now })
    .eq("user_id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
    nickname,
    lastChangedAt: now,
  };
}
