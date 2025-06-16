"use client";

import { createClient } from "@/utils/supabase/client";

export async function signInWithTwitter() {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_BASE_URL + "/auth/callback",
      queryParams: {
        next: "/profile",
      },
    },
  });

  
  return { data, error };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
}
