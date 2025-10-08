"use server";

import { Character } from "@/types/character";
import { Notification } from "@/types/notification";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function fetchProfileBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = (await supabase
    .from("profile")
    .select()
    .eq("slug", slug)
    .maybeSingle()) as { data: Profile; error: any };

  return { data, error };
}

export async function fetchProfileById(id?: number) {
  if (!id) return null;
  const supabase = createClient();
  const { data, error } = (await supabase
    .from("profile")
    .select()
    .eq("id", id)
    .maybeSingle()) as { data: Profile; error: any };

  return { data, error };
}

export async function fetchProfilesByIds(ids: number[]): Promise<{
  requestedProfiles: Pick<
    Profile,
    "nickname" | "profile_image" | "id" | "slug"
  >[];
  error: any;
}> {
  if (!ids || ids.length === 0) {
    return { requestedProfiles: [], error: null };
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("nickname, profile_image, id, slug")
    .in("id", ids);

  if (error) {
    throw error;
  }

  return { requestedProfiles: data, error };
}

export async function fetchCharactersByProfileId(profileId: number) {
  const supabase = createClient();
  const { data, error } = (await supabase
    .from("character")
    .select()
    .eq("profile_id", profileId)
    .order("created_at", { ascending: true })) as {
    data: Character[];
    error: any;
  };

  return { data: data ?? [], error };
}

export async function fetchCharactersFromFriendsByProfileId(
  profileId: number
): Promise<Character[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile_friend")
    .select("to_profile_id,from_profile_id")
    .eq("is_approved", true)
    .or(`from_profile_id.eq.${profileId},to_profile_id.eq.${profileId}`);
  if (error) {
    throw error;
  }
  const friendIds = data.map((friend) =>
    friend.to_profile_id === profileId
      ? friend.from_profile_id
      : friend.to_profile_id
  );
  if (friendIds.length === 0) {
    return [];
  }
  const { data: characters, error: error2 } = (await supabase
    .from("character")
    .select()
    .in("profile_id", friendIds)
    .order("created_at", { ascending: true })) as {
    data: Character[];
    error: any;
  };
  if (error2) {
    throw error2;
  }
  return characters;
}

export async function requestFriendByProfileId(
  from: number,
  to: number,
  payload: {
    landing_url: string;
    content: string;
  }
) {
  const { landing_url, content } = payload;
  const supabase = createClient();

  const { data, error } = await supabase.from("profile_friend").upsert(
    [
      {
        from_profile_id: from,
        to_profile_id: to,
      },
    ],
    { onConflict: "from_profile_id,to_profile_id", ignoreDuplicates: true }
  );
  if (error) {
    throw error;
  }

  const { data: data2, error: error2 } = await supabase
    .from("notification")
    .insert([
      {
        from_profile_id: from,
        to_profile_id: to,
        content,
        landing_url,
      } as Notification,
    ]);

  if (error2) {
    throw error2;
  }

  revalidatePath("/u/[slug]", "page");

  return { data, error };
}

export async function removeFriendByProfileId(from: number, to: number) {
  const supabase = createClient();

  const orFilter = `and(from_profile_id.eq.${from},to_profile_id.eq.${to}),and(from_profile_id.eq.${to},to_profile_id.eq.${from})`;
  const { data, error } = await supabase
    .from("profile_friend")
    .delete()
    .or(orFilter);

  revalidatePath("/u/[slug]", "page");

  if (error) {
    console.error("removeFriendByProfileId error:", error);
  }

  return { data, error };
}

export async function fetchExactFriendById(from: number, to: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile_friend")
    .select("*")
    .eq("from_profile_id", from)
    .eq("to_profile_id", to)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchIsFriendByIds(id1?: number, id2?: number) {
  if (!id1 || !id2) return false;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile_friend")
    .select()
    .or(
      `and(from_profile_id.eq.${id1},to_profile_id.eq.${id2}),and(from_profile_id.eq.${id2},to_profile_id.eq.${id1})`
    );

  if (error || (Array.isArray(data) && data.length === 0) || !data) {
    return false;
  }
  return true;
}

export async function updateFriendAccepted(from: number, to: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile_friend")
    .update({ is_approved: true })
    .eq("from_profile_id", from)
    .eq("to_profile_id", to);

  revalidatePath("/u/[slug]", "page");

  return { data, error };
}

export async function deleteFriend(from: number, to: number) {
  const supabase = createClient();

  const orFilter = `and(from_profile_id.eq.${from},to_profile_id.eq.${to}),and(from_profile_id.eq.${to},to_profile_id.eq.${from})`;
  const { data, error } = await supabase
    .from("profile_friend")
    .delete()
    .or(orFilter);

  revalidatePath("/u/[slug]", "page");

  if (error) {
    console.error("deleteFriend error:", error);
  }

  return { data, error };
}

export async function fetchFavoriteCharactersByProfileId(
  profileId?: number
): Promise<number[]> {
  if (!profileId) {
    return [];
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("character_favorite")
    .select("character_id")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data?.map((item) => item.character_id) ?? [];
}

export async function addFavoriteCharacter(
  profile_id: number,
  character_id: number
) {
  const supabase = createClient();
  const { data, error } = await supabase.from("character_favorite").insert([
    {
      profile_id,
      character_id,
    },
  ]);

  revalidatePath("/u/[slug]", "page");

  return { data, error };
}

export async function removeFavoriteCharacter(
  profile_id: number,
  character_id: number
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("character_favorite")
    .delete()
    .eq("profile_id", profile_id)
    .eq("character_id", character_id);

  revalidatePath("/u/[slug]", "page");

  return { data, error };
}
