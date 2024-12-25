"use server";

import { fetchProfileById } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";

export async function isGrantedUserByProfileSlug(slug: string | null) {
  if (!slug) return false;
  const supabase = createClient();

  const currentUser = await supabase.auth.getUser();

  if (!currentUser?.data?.user?.id) return false;

  const myProfile: Profile | null = await fetchProfileById(
    currentUser?.data?.user?.id as string
  );

  if (myProfile?.slug === slug) return true;
  return false;
}
