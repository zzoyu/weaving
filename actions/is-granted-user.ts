"use server";

import { fetchProfileById } from "@/app/profile/actions";
import { createClient } from "@/utils/supabase/server";

export async function isGrantedUserByProfileSlug(slug: string | null) {
  if (!slug) return false;
  const supabase = createClient();

  const currentUser = await supabase.auth.getUser();

  if (!currentUser?.data?.user?.id) return false;

  const myProfile: Profile = await fetchProfileById(
    currentUser?.data?.user?.id as string
  );

  console.log(slug, myProfile);
  if (myProfile?.slug === slug) return true;
  return false;
}
