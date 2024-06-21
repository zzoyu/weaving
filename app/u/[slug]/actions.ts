"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchProfileBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = (await supabase
    .from("profile")
    .select()
    .eq("slug", slug)
    .maybeSingle()) as { data: Profile; error: any };

  return { data, error };
}
